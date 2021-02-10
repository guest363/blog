---
layout: post
title: Общение между page-context, content и background скриптами.
date: 2021-02-10 13:45:33 +0500
categories: Разработка
tag: Web
---

## О чем речь ?

При разработке расширений для Chrome не очевиден способ взаимодействия page-context (скрипты находящиеcя в DOM) и расширением, его content и background скриптами.

Как общаются content и background скрипты описано в [документации](https://developer.chrome.com/docs/extensions/) по созданию расширений для хрома.

## Зачем такая коммуникация?

Контент скрипты имеют доступ к DOM, делят его с кодом на странице, но не могут взаимодействовать с js кодом посредством его прямого вызова и модификации.

Иногда все же нужно отправить данные из скрипта страницы в расширение. В частности у меня такая ситуация возникла при работе с VPAID скриптами.

## Способ 1. Более универсальный.

```js
// Content script
//Listen for the event
window.addEventListener("PassToBackground", function(evt) {
  chrome.runtime.sendMessage(evt.detail);
}, false);

// Page context
var message = {/* whatever */};
var event = new CustomEvent("PassToBackground", {detail: message});
window.dispatchEvent(event);
```

Схема взаимодействия получается такая 
```js
main.js
 |
 | window.postMessage(); // window.dispatchEvent()
 |
 V
content.js //window.addEventListener("message", callback, false);
 |
 | chrome.runtime.sendMessage();
 |
 V
background.js //chrome.runtime.onMessage.addListener(callback);
```

## Способ 2. Более безопасный.

Из документации google

- В манифесте расширения добавить список доменов откуда можно слать сообщения
    ```json
    "externally_connectable" : {
        matches: [ "http://example.com" ]
    },
    ```
- Узнать ID расширения, можно так ```console.log(chrome.runtime.id);``` в расширении
- На сайте
``` js
// Website code
// This will only be true if some extension allowed the page to connect
if(chrome && chrome.runtime && chrome.runtime.sendMessage) {
  chrome.runtime.sendMessage(
    "abcdefghijklmnoabcdefhijklmnoabc",
    {greeting: "yes"},
    onAccessApproved
  );
}
```
Если ни одно расширение не позволило этой страницы общаться с собой то ```chrome.runtime =  undefined```
- В бекграунд скрипте расширения
```js
// Extension's background code
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
    if(!validate(request.sender)) // Check the URL with a custom function
      return;
    /* do work */
  }
);
```


## Ссылки
- Большая часть информации взята с этого ответа на [stackoverflow](https://stackoverflow.com/questions/26140443/executing-code-at-page-level-from-background-js-and-returning-the-value/26141393#26141393)