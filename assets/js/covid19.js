const URL = " https://coronavirus-19-api.herokuapp.com/countries/";

/* 
{"country":"Russia",
"cases":4149,
"todayCases":601,
"deaths":34,
"todayDeaths":4,
"recovered":281,
"active":3834,
"critical":8,"casesPerOneMillion":28,"deathsPerOneMillion":0}
 */
const getCountryInfo = async (url, country) => {
  const response = await fetch(url + country);
  return await response.json();
};

const drawStatistic = async () => {
  const statistic = await getCountryInfo(URL, "russia");
  for (let typeOfStatistic in statistic) {
    const span = document.getElementById(`covid-${typeOfStatistic}`);
    span.innerHTML = statistic[typeOfStatistic];
  }
};

drawStatistic();
