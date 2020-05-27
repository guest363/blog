---
layout: post
title: Видеореклама в интернете. VAST и VPAID.
date: 2020-05-24 13:45:33 +0500
categories: Разработка
tag: Web
---
## Стандарты
- [VAST 3](https://www.iab.com/guidelines/digital-video-ad-serving-template-vast-3-0/)
- [VPAID 2](https://www.iab.com/guidelines/digital-video-player-ad-interface-definition-vpaid-2-0/)

## Типы видео рекламы

### In-stream (in-video)
Реклама, которая транслируются в видеоролике. 
Может находится в следующих позициях:
- *Pre-roll* - запускается перед началом видеоролика при нажатии на кнопку воспроизведения
- *Mid-roll* - запускается автоматически спустя определенное время со старта видеоролика
- *Post-roll* - запускается автоматически после окончания видеоролика
- *Pause-roll* - запускается при снятии видеоролика с паузы
- *Over-roll*- запускается автоматически поверх видеоролика

### Out-stream (in-content)
Рекламный видеоролик размещен в середине текстовой статьи. При прокручивании страницы, как только видеоплеер попадает в зону видимости пользователя, начинается автоматический показ рекламного видеоролика.

Места размещения: информационные сайты, новостные порталы, развлекательные сайты.
## Библиотеки для js

[Отличный парсер и треккер для VAST](https://github.com/dailymotion/vast-client-js)

## VAST

[Примеры от aib](https://github.com/InteractiveAdvertisingBureau/VAST_Samples/tree/master/VAST%203.0%20Samples)

## VPAID
By enabling and allowing tracking of a certain set of events, VPAID lets users to:

Click on different tabs of the ad to view info
Expand the overall view of the video ad
Fill out a form embedded in the ad
Take a survey embedded in the ad
Interact with ad elements or even play a game


When the video player calls the initAd() method, the ad unit can begin loading assets.
Once loaded and ready for display, the ad dispatches the AdLoaded event. No UI elements
should be visible before AdLoaded is sent, but sending AdLoaded indicates that the ad
unit has verified that all files are ready to execute. Also, if initAd() was called, and the ad
unit is unable to display and/or send AdLoaded, then AdError should be dispatched.


Типы VPAID контента: 

- VPAID Flash 
- VPAID JS

![Пример контента VPAID](/assets/images/vastAndVpaid/vpaid-types.jpg)
## Тестирование VAST и VPAID компаний
[От bluebillywig](https://support.bluebillywig.com/vast-inspector)

## Почитать дополнительно

- Доступно про состав VAST, Хабр. [Видеореклама под капотом: что такое VAST?](https://habr.com/ru/post/499164/)
- Как написать простенький кастомный плеер, Хабр. [Как сделать собственный видео-плеер на HTML5 Video](https://habr.com/ru/company/microsoft/blog/127295/)
- Еще одна реализация плеера html5 от MDN, en. [Creating a cross-browser video player](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player)
- Можно узнать про временные метки (timestamp). [10 Advanced Features In The HTML5 <video> Player](https://blog.addpipe.com/10-advanced-features-in-html5-video-player/amp/)