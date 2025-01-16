---
layout: post
title: Заметка - HLS
date: 2024-08-20 17:00:00 +0500
category: Разработка
tags: ['Video']
---

## Не работает AV1 поток в HLS

У [FFmpeg](https://ffmpeg.org/ffmpeg-codecs) есть опция при формировании hls плейлиста `hls_segment_type` которая может быть
- "mpegts" - Output segment files in MPEG-2 Transport Stream format. This is compatible with all HLS versions.
- "fmp4" - Output segment files in fragmented MP4 format, similar to MPEG-DASH. fmp4 files may be used in HLS version 7 and above.

mpegts хоть и указан во всех туториалах что встречал с ним видео закодированные в av1 не работают корректно. Проигрывается только аудиодорожка.

### Решение
Выставить `-hls_segment_type fmp4`.
В плейлисте версия станет '#EXT-X-VERSION:==7=="' и видео будет проигрываться корректно.

## Разбиение HLS потока на множество чанков
Поток можно бить используя параметр `hls_time` и скажем если задать 1 то должно разбиваться на куски по 1 секунде. Но так не происходит, чтобы разбивалось нужно еще добавить опцию
- `-force_key_frames "expr:gte(t,n_forced*1)"` - которая добавляет опорный кадр каждую секунду или же 
- `-g 30` которая вставляет опорный кадр каждые 30 кадров.

Тогда количество файлов с чанками будет соответствовать заданному.