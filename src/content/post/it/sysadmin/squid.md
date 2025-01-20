---
layout: post
title: SQUID
date:   2020-02-13 17:00:00 +0500
category: Разработка
tags: ['Linux']
---
# SQUID

Squid (англ. squid — «кальмар») — программный пакет, реализующий функцию кэширующего прокси-сервера для протоколов HTTP, FTP, Gopher и (в случае соответствующих настроек) HTTPS. Разработан сообществом как программа с открытым исходным кодом (распространяется в соответствии с GNU GPL). Все запросы выполняет как один неблокируемый процесс ввода-вывода.

## Алгоритм действий при установке

- Установка
  `sudo apt-get install squid`
- Просмотр файлов настроек по умолчанию, без пустых строк и комментариев
  `grep -v ^# /etc/squid3/squid.conf | grep -v ^$`
- Настройки для прокси

  ```conf
  # Для блокировки сторонних почтовиков, блокируем по доменному имени
  acl blockmail dstdomain "/etc/squid3/blockmail"

  # Для второго прокси и проверки трафика на вирусы
  # no-query - запрет TCP запросов соединения к прокси
  # no-digest - не запрашивать cache dihest
  # no-netdb-exchange - отключить запросы к ICNP RTT базе (NetDB) от havp прокси
  cache_peer 127.0.0.1 parent 8081 0 no-query no-digest no-netdb-exchange default
  cache_peer_access 127.0.0.1 allow all
  acl scan-http proto HTTP
  never_direct allow scan-http

  # Авторизация через freeradius
  auth_param basic program /usr/lib/squid3/basic_radius_auth -h server -w passwd
  auth_param basic children 100
  auth_param basic realm -=tel. X-XX-XX=-
  auth_param basic credentialsttl 2 hours
  #----------------------------

  # Аклы доступа на авторизацию
  acl local proxy_auth REQUIRED
  acl FarCry src 192.168.8.22/32
  #------------------------------

  # Правила на http трафик от аклов
  http_access allow FarCry
  http_access deny blockmail
  http_access allow local
  #-------------------------------

  # Для удобного отображения в логах самого прокси
  visible_hostname squid
  ```

- Обновить настройки
  `sudo squid3 -k reconfigure`
- Перезапуск squid
  `sudo services squid3 restart`

## Списки котроля доступа
Синтаксис " acl ИМЯ-СПИСКА ТИП ЭЛЕМЕНТ"

Типы спсисков (часть):
- src - ip адрес откуда исходит соединение, адрес клиента;
- dst - ip адрес назначения соединения, адрес сервера, к которому хочет получить доступ клиент;
- dstdomain - домен назначения соединения;
- srcdomain - домен клиента;
- arp - MAC адрес сетевой карты клиента;
- time - время, когда выполняется соединение;
- port - порт, к которому пытается получить доступ клиент;
- proto - протокол, по которому устанавливается соединение;
- method - метод передачи данных, например, GET - передача данных HTTP, POST - передача данных форм в HTTP, CONNECT - запрос соединения с сервером;
- http_status - ответ сервера;
- browser - браузер клиента;
- url_regex - url адрес, к которому пытаются получить доступ.

## Пример списка блокировок по доменному имени

`cat /etc/squid3/blockmail`

```
efax.com
drop.io
cvent.com
dnsstuff.com
digsby.com
```

## HAVP как второй прокси для сканирования трафика на вирусы

`sudo apt-get install havp`
По умолчанию прокси havp работатет с библиотекой libclamav для проверки на вирусы. При больших нагрузках лучше использовать демон clamd.

`cat /etc/havp/havp.config`

```conf
# Чтобы простые пользователи не могли подключаться к havp, а только squid, т.е. localhost
BIND_ADDRESS 127.0.0.1
# Чтобы страничка об обнаружении вируса была на русском
TEMPLATEPATH /etc/havp/templates/ru
# Смена порта на 8081
PORT 8081
```

`sudo servecis havp restart`
