---
layout: post
title: Видеореклама в интернете. VAST и VPAID.
date: 2020-12-25 13:45:33 +0500
category: Разработка
tags: ['Web']
---

## Стандарты

- [VAST](https://iabtechlab.com/standards/vast/)
- [VPAID 2](https://www.iab.com/guidelines/digital-video-player-ad-interface-definition-vpaid-2-0/)

Разработкой стандартов занимается компания IAB, [русскоязычная версия сайта](https://iabrus.ru/).

## Типы видео рекламы

### In-stream (in-video)

Реклама, которая транслируются в видеоролике.
Может находится в любом месте ролика. Может отыгрываться параллельно с роликом. Суть в том, что реклама отображается в целевом для пользователя ролике. Как правило такую рекламу можно пропускать, сразу или по прошествии определенного времени.
### Out-stream (in-content)

Рекламный видеоролик размещается, как правило, в текстовых статьях, но суть в том, что данная реклама не мешает просмотру целевого контента. При прокручивании страницы, как только видеоплеер попадает в зону видимости пользователя, начинается автоматический показ рекламного видеоролика. Ролик играет без звука.

## VAST

Это XML файл специальной разметки. Нужен чтобы рекламный плеер понимал откуда брать ролики, какие события отстукивать, чьи ролики и так далее.

На момент конца 2020 последним является стандарт VAST 4.2. 

Из интересного, сравнивая с VAST 3:
- В стандарт добавлено множество макросов;
- Деприкейтнуты jwf VPAID креативы.

Версии VAST практически полностью обратно совместимы. В новых версиях может деприкейтнуться какое-то свойство, но оно остается в стандарте, просто с пометкой.

В VAST xml файле в общем указывается:

- Ссылки на рекламные компании. Может содержать несколько рекламных компаний;
- Ссылки которые нужно трекать get запросом при наступлении различных событий. Например начало просмотра ролика, клик по рекламе;
- Ссылку которую нужно трекать в случае ошибки;
- Ссылки на другие рекламные компании, т.е. другой VAST. VAST может вкладываться один в другой;
- Различные параметры рекламной компании, такие как кто ее создатель, цена и так далее;
- Медиафайлы рекламной компании.

```XML
<VAST version="4.2" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns="http://www.iab.com/VAST">
  <Ad id="20001" >
    <InLine>
      <AdSystem version="1">iabtechlab</AdSystem>
      <Error><![CDATA[https://example.com/error]]></Error>
      <Impression id="Impression-ID"><![CDATA[https://example.com/track/impression]]></Impression>
      <Pricing model="cpm" currency="USD">
        <![CDATA[ 25.00 ]]>
      </Pricing>
      <AdServingId>a532d16d-4d7f-4440-bd29-2ec0e693fc80</AdServingId>
      <AdTitle>iabtechlab video ad</AdTitle>
      <Creatives>
        <Creative id="5480" sequence="1" adId="2447226">
          <Linear>
            <TrackingEvents>
              <Tracking event="start" ><![CDATA[https://example.com/tracking/start]]></Tracking>
              <Tracking event="progress" offset="00:00:10"><![CDATA[http://example.com/tracking/progress-10]]></Tracking>
              <Tracking event="firstQuartile"><![CDATA[https://example.com/tracking/firstQuartile]]></Tracking>
              <Tracking event="midpoint"><![CDATA[https://example.com/tracking/midpoint]]></Tracking>
              <Tracking event="thirdQuartile"><![CDATA[https://example.com/tracking/thirdQuartile]]></Tracking>
              <Tracking event="complete"><![CDATA[https://example.com/tracking/complete]]></Tracking>
            </TrackingEvents>
            <Duration>00:00:16</Duration>
            <MediaFiles>
              <MediaFile id="5241" delivery="progressive" type="video/mp4" bitrate="2000" width="1280" height="720" minBitrate="1500" maxBitrate="2500" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4]]>
              </MediaFile>
              <MediaFile id="5244" delivery="progressive" type="video/mp4" bitrate="1000" width="854" height="480" minBitrate="700" maxBitrate="1500" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro-mid-resolution.mp4]]>
              </MediaFile>
              <MediaFile id="5246" delivery="progressive" type="video/mp4" bitrate="600" width="640" height="360" minBitrate="500" maxBitrate="700" scalable="1" maintainAspectRatio="1" codec="H.264">
                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro-low-resolution.mp4]]>
              </MediaFile>
            </MediaFiles>
            <VideoClicks>
              <ClickThrough id="blog">
                <![CDATA[https://iabtechlab.com]]>
              </ClickThrough>
            </VideoClicks>
          </Linear>
          <UniversalAdId idRegistry="Ad-ID">8465</UniversalAdId>
          <UniversalAdId idRegistry="Ad-ID2">AA8465</UniversalAdId>
        </Creative>
      </Creatives>
    </InLine>
  </Ad>
</VAST>
```


## VPAID

В VAST в качестве медиафайлов могут быть js и swf(в VAST 4 деприкейтнуты) ролики. Так вот VPAID это стандарт описывающий методы и событий и которые должен поддерживать передаваемый код.

Типы VPAID контента:

- VPAID Flash
- VPAID JS - на момент 2020 актуальным остался только js формат.

### Как взаимодействовать

```js
// AIB рекомендует добавлять код через iframe
const iframe: HTMLIFrameElement = document.createElement("iframe");
iframe.setAttribute(
  "style",
  "border:0px;margin:0px;opacity:1;padding:0px;height:0;position:absolute;width:0;top:0;left:0;"
);
container.appendChild(iframe);
iframe.contentWindow?.document.write(
  `<head><style>body{margin:0}</style></head><body><script type="text/javascript" class="${randomizer}" src="${url}" async></script></body>`
);
const script = iframe.contentWindow?.document.querySelector(`.${randomizer}`);

/**
 * Проверяет в рантайме поддерживает ли принятый VPAID все требуемые методы.
 * Скрипт написан AIB
 */
const checkSpec = (VPAIDCreative: currectVPAID): Boolean => {
  if (
    VPAIDCreative.handshakeVersion &&
    typeof VPAIDCreative.handshakeVersion == "function" &&
    VPAIDCreative.initAd &&
    typeof VPAIDCreative.initAd == "function" &&
    VPAIDCreative.startAd &&
    typeof VPAIDCreative.startAd == "function" &&
    VPAIDCreative.stopAd &&
    typeof VPAIDCreative.stopAd == "function" &&
    VPAIDCreative.skipAd &&
    typeof VPAIDCreative.skipAd == "function" &&
    VPAIDCreative.resizeAd &&
    typeof VPAIDCreative.resizeAd == "function" &&
    VPAIDCreative.pauseAd &&
    typeof VPAIDCreative.pauseAd == "function" &&
    VPAIDCreative.resumeAd &&
    typeof VPAIDCreative.resumeAd == "function" &&
    VPAIDCreative.expandAd &&
    typeof VPAIDCreative.expandAd == "function" &&
    VPAIDCreative.collapseAd &&
    typeof VPAIDCreative.collapseAd == "function" &&
    VPAIDCreative.subscribe &&
    typeof VPAIDCreative.subscribe == "function" &&
    VPAIDCreative.unsubscribe &&
    typeof VPAIDCreative.unsubscribe == "function"
  ) {
    return true;
  }
  return false;
};

script.addEventListener("load", function () {
  // Доступ к VPAID коду
  const adUnit = iframe.contentWindow.getVPAIDAd();
  // Проверка корректности VPAID
  if (!checkSpec(adUnit)) {
    return;
  }
  // Обмен версиями
  adUnit.handshakeVersion("2.0");
  // Инициализировать
  adUnit.initAd(
    width,
    height,
    "normal", //  “normal” “thumbnail” or “fullscreen”
    -1,
    // Для отправки креативу информации необходимой для старта, передается в VAST
    { AdParameters: adParameters }, 
    {
      slot: wrapper, // над каким блоком vpaid получит контроль
      videoSlot: video, // video html elem
      videoSlotCanAutoPlay: true,
    }
  );
});
```

### Методы VPAID:

- getVPAIDAd: () => Object;
  handshakeVersion: (playerVPAIDVersion: String) => String;
  initAd: (
  width: Number,
  height: Number,
  viewMode: String,
  desiredBitrate: Number,
  creativeData?: Object,
  environmentVars?: environmentVars
  ) => void;
- resizeAd: (width: Number, height: Number, viewMode: String) => void;
- startAd: () => void;
- stopAd: () => void;
- pauseAd: () => void;
- resumeAd: () => void;
- expandAd: () => void;
- collapseAd: () => void;
- skipAd: () => void;
- subscribe: (fn: Function, event: String, listenerScope?: Object) => void;
- unsubscribe: (fn: Function, event: String) => void;

#### Пример контента VPAID
![Пример контента VPAID](/assets/images/vastAndVpaid/vpaid-types.jpg)

## Полезные ссылки

- Детектор Ad Block от iabtechlab [github](https://github.com/InteractiveAdvertisingBureau/AdBlockDetection)
- Тестирование VAST и VPAID компаний от [bluebillywig](https://support.bluebillywig.com/vast-inspector)
- Отличный парсер и треккер для VAST [github](https://github.com/dailymotion/
vast-client-js)
- Множество примеров VAST от IAB [github](https://github.com/InteractiveAdvertisingBureau/VAST_Samples)

## Почитать дополнительно

- Доступно про состав VAST, Хабр. [Видеореклама под капотом: что такое VAST?](https://habr.com/ru/post/499164/)
- Как написать простенький кастомный плеер, Хабр. [Как сделать собственный видео-плеер на HTML5 Video](https://habr.com/ru/company/microsoft/blog/127295/)
- Еще одна реализация плеера html5 от MDN, en. [Creating a cross-browser video player](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player)
- Можно узнать про временные метки (timestamp). [10 Advanced Features In The HTML5 video Player](https://blog.addpipe.com/10-advanced-features-in-html5-video-player/amp/)
