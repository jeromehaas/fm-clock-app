"use strict";

const domElements = {
  weatherIcon: $("#primary__greeter img"),
  greeter: $("#primary__greeter p"),
  time: $("#primary__time"),
  country: $("#primary__country"),
  text: $("#primary__text"),
  city: $("#primary__city"),
  menuSwitcher: $("#primary__menu-switcher"),
  toggle: $("#primary__toggle"),
  toggleText: $("#primary__menu-switcher p"),
  main: $("#main"),

};

const changableElements = [
  domElements.menuSwitcher,
  domElements.toggle,
  domElements.main,
  domElements.toggleText
]

domElements.menuSwitcher.on('click', () => {
  if (domElements.menuSwitcher.hasClass('less')) {
    changableElements.forEach(el => {
      el.removeClass('less')
      el.addClass('more')
    })
  } 
  else if (domElements.menuSwitcher.hasClass('more')) {
    changableElements.forEach(el => {
      el.removeClass('more')
      el.addClass('less')
    }) 
  }
})

async function getCountry() {
  const response = await fetch("https://freegeoip.app/json/");
  const data = await response.json()
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