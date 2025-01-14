---
layout: post
title: Виджет COVID-19
date: 2020-04-11 17:45:33 +0500
category: Разработка
tags: ['Web']
---

{% include covid-widget.html %}

# Виджет COVID-19

Отображает статистические данные по распространению коронавируса в России.

## HTML

```html
<link rel="stylesheet" type="text/css" href="/PATH/covid-widget.css" />
<div id="covid-widget">
  <h3>Covid-19 в России</h3>
  <!-- Картинка с https://www.freepik.com -->
  <picture class="covid--image">
    <img src="/assets/images/covid.png" alt="Вирус covid-19" />
  </picture>
  <div class="covid--grid">
    <div class="covid--block">
      <span class="covid--block--value" id="covid-cases"></span>
      <span class="covid--block--header">Всего заболело</span>
    </div>
    <div class="covid--block">
      <span class="covid--block--value" id="covid-todayCases"></span>
      <span class="covid--block--header">Заболело сегодня</span>
    </div>
    <div class="covid--block">
      <span class="covid--block--value" id="covid-deaths"></span>
      <span class="covid--block--header">Умерло</span>
    </div>
    <div class="covid--block">
      <span class="covid--block--value" id="covid-todayDeaths"></span>
      <span class="covid--block--header">Умерло за сегодня</span>
    </div>
    <div class="covid--block">
      <span class="covid--block--value" id="covid-recovered"></span>
      <span class="covid--block--header">Выздоровело</span>
    </div>
    <div class="covid--block">
      <span class="covid--block--value" id="covid-critical"></span>
      <span class="covid--block--header">Критическое сост.</span>
    </div>
  </div>
</div>
<script type="module" src="/PATH/covid19.js"></script>
```

## JavaScript

```js
const URL = " https://coronavirus-19-api.herokuapp.com/countries/";

const showTypes = [
  "cases",
  "todayCases",
  "deaths",
  "todayDeaths",
  "recovered",
  "critical",
];
const getCountryInfo = async (url, country) => {
  const response = await fetch(url + country);
  return await response.json();
};

const drawStatistic = async () => {
  const statistic = await getCountryInfo(URL, "Russia");
  showTypes.forEach((type) => {
    const span = document.getElementById(`covid-${type}`);
    span.innerHTML = statistic[type];
  });
};

drawStatistic();
```

## CSS

```css
:root {
  --covid-todayCases: #ffd3d2;
  --covid-deaths: white;
  --covid-todayDeaths: white;
  --covid-recovered: #eaf9e2;
  --covid-critical: white;
}
#covid-cases {
  color: var(--covid-cases);
}
#covid-todayCases {
  color: var(--covid-todayCases);
}
#covid-deaths {
  color: var(--covid-deaths);
}
#covid-todayDeaths {
  color: var(--covid-todayDeaths);
}
#covid-recovered {
  color: var(--covid-recovered);
}
#covid-critical {
  color: var(--covid-critical);
}
#covid-widget {
  max-width: 700px;
  margin: 40px auto;
  border: 2px solid gray;
  background-color: gray;
  padding: 1em;
  border-radius: 5px;
  position: relative;
  background-image: url(/assets/images/covid-2.png);
  background-repeat: no-repeat;
  background-position: 3% 50%;
  box-sizing: border-box;
}

#covid-widget h3 {
  font-size: 2em;
  width: max-content;
  position: absolute;
  top: -2.3em;
  color: grey;
}
.covid--grid {
  display: grid;
  display: -ms-grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  margin-left: 150px;
  align-items: baseline;
}

.covid--block {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  text-align: center;
  margin: 1em 0;
  color: white;
}
.covid--block--header {
  font-size: 0.85em;
}
.covid--block--value {
  width: 100%;
  font-weight: bold;
  font-size: 1em;
  line-height: 1.2em;
}

.covid--image {
  display: none;
  position: absolute;
}
.covid--image img {
  max-width: 150px;
  width: 100%;
}

@media screen and (max-width: 600px) {
  #covid-widget {
    margin: 40px 1em;
    background-position: center center;
  }
  .covid--grid {
    margin-left: 0;
  }
}
```
