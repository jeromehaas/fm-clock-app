"use strict";

const domElements = {
  weatherIcon: $("#greeter img"),
  greeter: $("#greeter p"),
  time: $("#time"),
  country: $("#country"),
  city: $("#city"),
};

async function getCountry() {
  const response = await fetch("https://freegeoip.app/json/");
  const data = await response.json();
  return data.country_name;
}

async function getCity() {
  const response = await fetch("https://freegeoip.app/json/");
  const data = await response.json();
  return data.city;
}

async function getTime() {
  const response = await fetch("http://worldtimeapi.org/api/timezone/Europe/London");
  const data = await response.json();
  return data.unixtime;
}

async function print() {
  await getCountry().then((data) => {
    domElements.country.text(data);
    console.log(data);
  });

  await getCity().then((data) => {
    domElements.city.text(data);
    console.log(data);
  });

  await getTime().then((data) => {
    let now = new Date(data * 1000);
    let hours = now.getHours();
    let minutes = now.getMinutes();
    domElements.time.text(`${hours}:${minutes}`);
    console.log(data);
  });
}

$(() => {
  print();
  setInterval(print, 1000 * 60);
});
