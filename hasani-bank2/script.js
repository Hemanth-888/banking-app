"use strict";

/////////////////////////////////////////////////
// Select Elements

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//selects entire header sections
const header = document.querySelector(".header");
//select multiple elements with querySelectorAll
const allSelection = document.querySelectorAll(".section");
console.log(allSelection);

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

document.getElementsByClassName("btn");

// BUTTON SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});
/////////////////////////////////////////////////
//PAGE NAVIGATION
// Event Delegation
// 1. Add event listerner to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/////////////////////////////////////////////////
// IMPLEMENT TABBED COMPONENT

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //gaurd clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  //Activate tab
  clicked.classList.add("operations__tab--active");

  //Activate content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//passing argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
//////////////////////////////////////////////

// Sticky Navigation
const intialcords = section1.getBoundingClientRect();

console.log(intialcords);
window.addEventListener("scroll", function () {
  console.log(window.scrollY);

  if (this.window.scrollY > intialcords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
});

/////////////////////////////////////////////
//implementing smooth scroll on all nav links
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log('LINK');

//     //get href id of nav links
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

////////////////////////////////////////////////////////
// MOST USED WAYS FOR SELECTING ELEMENTS IN JS
// Selecting the entire document of any webpage
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

//selects entire header sections
// const header = document.querySelector('.header');
// //select multiple elements with querySelectorAll
// const allSelection = document.querySelectorAll('.section');
// console.log(allSelection);

// document.getElementById('section--1');
// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// document.getElementsByClassName('btn');

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

////////////////////////////////////////////////////////

// // CREATING, INSERTING, DELETING ELEMENTS
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'we use cookies for improved functionality and anayltics'
// message.innerHTML =
//   'we use cookies for improved functionality and anayltics <button class="btn btn--close-cookie">Got it!</button>';

// // adds message dom to header
// // header.prepend(message);
// header.append(message);
// // header.append(message.cloneNode(true));
// // header.before(message);
// // header.after(message);

// // DELETE ELEMENTS
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     // message.remove();
//     message.parentElement.removeChild(message);
//   });

// ////////////////////////////////////////////////////////

// //Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// // console.log(message.style.backgroundColor);
// console.log(getComputedStyle(message).height);

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// logo.alt = 'Beautiful minimalist logo - Hasani Bank';
// console.log(logo.alt);

// //NOn-standard
// // console.log(logo.designer);
// // console.log(logo.getAttribute('designer'));
// logo.setAttribute('company', 'Hasani Bank');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.twitter-link');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// // Data attributes
// console.log(logo.dataset.versionNumber);

// // Classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1coords = section1.getBoundingClientRect();
//   console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());

//   // read the X & Y axis of current viewport
//   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

//   console.log(
//     'height/width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );

//   //Implement Scrolling
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );
//   //old way
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   // modern way
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('addEventListern: Great You are reading the heading ');

//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// // rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// // Learning how the DOM works
// const navLink = document
//   .querySelector('.nav__link')
//   .addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('link', e.target, e.currentTarget);

//     //stop propagation
//     e.stopPropagation();
//   });

// const navLinks = document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('container', e.target, e.currentTarget);
//   });

// const nav = document
//   .querySelector('.nav')
//   .addEventListener('click', function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log('nav', e.target, e.currentTarget);
//   });

// //DOM TRAVERSING

// const h1 = document.querySelector('h1');

// // going downwards: child elements
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);
// console.log((h1.firstElementChild.style.color = 'white'));
// console.log((h1.lastElementChild.style.color = 'black'));

// // going upwards: parent elements

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // going sideways siblings

// console.log(h1.parentElement.children);
// (...h1.parentElement.children).forEach(fucntion(el){
//   console.log(zzz);
