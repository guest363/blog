---
layout: post
title: Меню гамбургер
date:   2020-01-23 17:45:33 +0500
categories: Разработка
tags: [dev, css, js]
---
# Делаем меню-гамбургер
Простое SVG меню с анимаией на CSS.

При открытии центральная линия становится прозрачной а 1 и 3 трансформируются. 

## HTML
``` html
<button class="hamburger" id="hamburger" aria-expanded="false"><span class="hamburger--screen-reader-text">Menu</span>
    <svg class="hamburger--icon" aria-hidden="true" version="1.1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100">
        <g class="hamburger--svg">
            <path class="hamburger--svg--line" d="M5 13h90v14H5z" />
            <path class="hamburger--svg--line" d="M5 43h90v14H5z" />
            <path class="hamburger--svg--line" d="M5 73h90v14H5z" />
        </g>
    </svg>
</button>
```
## JavaScript
``` js
    const hamburgerInit = () => {
        const button = document.getElementById('hamburger');
        const nav = document.getElementById('nav');
        button.onclick = () => {
            button.classList.toggle("opened");
            nav.classList.toggle("nav--hide");
        };
    }
    document.addEventListener("DOMContentLoaded", function (event) {
        hamburgerInit();
    });
```

## CSS
``` css
 .hamburger {
  position: fixed;
  bottom: 20px;
  left: 20px;
  font-size: 0.875em;
  padding: 0.75em;
  z-index: 10;
}

.hamburger--icon {
	display: inline-block;
	fill: currentColor;
	vertical-align: middle;
	position: relative;
  width: 2em;
  height: 2em;
  top: 0;
}


/* Анимация линий */
.hamburger--svg--line{
  opacity: 1;
  transform: rotate(0) translateY(0) translateX(0);
  transform-origin: 1em 1em;
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
}
.hamburger--svg--line:nth-child(1) {
  transform-origin: 1em 2.5em;
}
.hamburger--svg--line:nth-child(3) {
  transform-origin: 1em 5em;
}

.hamburger.opened .hamburger--svg--line:nth-child(1) {
  transform: rotate(45deg) translateY(0) translateX(0);
}
.hamburger.opened .hamburger--svg--line:nth-child(2) {
  opacity: 0;
}
.hamburger.opened .hamburger--svg--line:nth-child(3) {
  transform: rotate(-45deg) translateY(0) translateX(0);
}

/* Для скринридеров. */
.hamburger--screen-reader-text {
	clip: rect(1px, 1px, 1px, 1px);
	position: absolute !important;
	height: 1px;
	width: 1px;
	overflow: hidden;
}
```