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

- _Pre-roll_ - запускается перед началом видеоролика при нажатии на кнопку воспроизведения
- _Mid-roll_ - запускается автоматически спустя определенное время со старта видеоролика
- _Post-roll_ - запускается автоматически после окончания видеоролика
- _Pause-roll_ - запускается при снятии видеоролика с паузы
- _Over-roll_- запускается автоматически поверх видеоролика

### Out-stream (in-content)

Рекламный видеоролик размещен в середине текстовой статьи. При прокручивании страницы, как только видеоплеер попадает в зону видимости пользователя, начинается автоматический показ рекламного видеоролика.

Места размещения: информационные сайты, новостные порталы, развлекательные сайты.

## VAST

XML файл специальной разметки. В нем указывается:

- Ссылки на рекламные креативы
- Ссылки которые нужно трекать get запросом при наступлении различных событий. Например начало просмотро ролика, клик по рекламе.
- Ссылки которые нужно трекать в случае ошибки
- Ссылки на другие рекламные компании, т.е. другой VAST. VAST может вкладываться один в другой.
- Различные параметры рекламной компании, такие как кто ее создатель, цена и так далее.

```XML
<VAST version="3.0" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <Ad id="20001">
        <InLine>
            <AdSystem version="4.0">iabtechlab</AdSystem>
            <AdTitle>iabtechlab video ad</AdTitle>
            <Pricing model="cpm" currency="USD">
                <![CDATA[ 25.00 ]]>
            </Pricing>
            <Error>http://example.com/error</Error>
            <Impression id="Impression-ID">http://example.com/track/impression</Impression>
            <Creatives>
                <Creative id="5480" sequence="1">
                    <Linear>
                        <Duration>00:00:16</Duration>
                        <TrackingEvents>
                            <Tracking event="start">http://example.com/tracking/start</Tracking>
                            <Tracking event="firstQuartile">http://example.com/tracking/firstQuartile</Tracking>
                            <Tracking event="midpoint">http://example.com/tracking/midpoint</Tracking>
                            <Tracking event="thirdQuartile">http://example.com/tracking/thirdQuartile</Tracking>
                            <Tracking event="complete">http://example.com/tracking/complete</Tracking>
                            <Tracking event="progress" offset="00:00:10">http://example.com/tracking/progress-10</Tracking>
                        </TrackingEvents>
                        <VideoClicks>
                            <ClickThrough id="blog">
                                <![CDATA[https://iabtechlab.com]]>
                            </ClickThrough>
                        </VideoClicks>
                        <MediaFiles>
                            <MediaFile id="5241" delivery="progressive" type="video/mp4" bitrate="500" width="400" height="300" minBitrate="360" maxBitrate="1080" scalable="1" maintainAspectRatio="1" codec="0" apiFramework="VAST">
                                <![CDATA[https://iab-publicfiles.s3.amazonaws.com/vast/VAST-4.0-Short-Intro.mp4]]>
                            </MediaFile>
                        </MediaFiles>


                    </Linear>
                </Creative>
            </Creatives>
            <Extensions>
                <Extension type="iab-Count">
                    <total_available>
                        <![CDATA[ 2 ]]>
                    </total_available>
                </Extension>
            </Extensions>
        </InLine>
    </Ad>
</VAST>
```

[Примеры от aib](https://github.com/InteractiveAdvertisingBureau/VAST_Samples/tree/master/VAST%203.0%20Samples)

## VPAID

В VAST в качестве медиафайлов могут быть js и swf ролики. Так вот VPAID это стандарт описывющий методы и событий и которые должен поддерживать передаваемый код.

Типы VPAID контента:

- VPAID Flash
- VPAID JS - на момент 2020 актуальным остался только js формат.

### Как взаимодействовть

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
- Отличный парсер и треккер для VAST [github](https://github.com/dailymotion/vast-client-js)

## Почитать дополнительно

- Доступно про состав VAST, Хабр. [Видеореклама под капотом: что такое VAST?](https://habr.com/ru/post/499164/)
- Как написать простенький кастомный плеер, Хабр. [Как сделать собственный видео-плеер на HTML5 Video](https://habr.com/ru/company/microsoft/blog/127295/)
- Еще одна реализация плеера html5 от MDN, en. [Creating a cross-browser video player](https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player)
- Можно узнать про временные метки (timestamp). [10 Advanced Features In The HTML5 video Player](https://blog.addpipe.com/10-advanced-features-in-html5-video-player/amp/)
