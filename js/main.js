"use strict";
let reviewsSwiper = document.querySelector('.reviews__slider');
if (reviewsSwiper) {
   const swiper = new Swiper('.reviews__slider', {
      loop: true,
      spaceBetween: 20,
      // If we need pagination
      pagination: {
         el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
         nextEl: '.reviews__arrow-next',
         prevEl: '.reviews__arrow-prev',
      },
   });
}

let infoApartamentsSwiper = document.querySelector('.info-apartments__slider');
if (infoApartamentsSwiper) {
   const swiper = new Swiper('.info-apartments__slider', {
      spaceBetween: 5,
      slidesPerView: 1,
      thumbs: {
         swiper: {
            el: '.info-apartments__minslider',
            spaceBetween: 5,
            slidesPerView: 4,
         }
      },

      pagination: {
         el: '.swiper-pagination',
      },

      navigation: {
         nextEl: '.minslider-info-apartments__next',
         prevEl: '.minslider-info-apartments__prev',
      },
   });
}

google.maps.event.addDomListener(window, 'load', init);
function init() {
   let mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(59.4096, 56.7893),
      styles: [{ "featureType": "all", "elementType": "labels.text", "stylers": [{ "color": "#878787" }] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [{ "visibility": "off" }] }, { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f9f5ed" }] }, { "featureType": "road.highway", "elementType": "all", "stylers": [{ "color": "#f5f5f5" }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9c9c9" }] }, { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#aee0f4" }] }]
   };

   let mapElement = document.getElementById('map');
   let map = new google.maps.Map(mapElement, mapOptions);

   const iconBase = "img/";
   const icons = {
      info: {
         icon: iconBase + "icons/loc.svg",
      },
      
   };
   const points = [
      {
         position: new google.maps.LatLng(59.4144441,56.795751),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.4157645,56.799084),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.404997,56.7871765),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.4030777,56.8011815),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.3946962,56.8031147),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.392238, 56.798716),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.392108, 56.772727),
         type: "info",
      },
      {
         position: new google.maps.LatLng(59.396391, 56.758522),
         type: "info",
      },
   ];
   
   for (let i = 0; i < points.length; i++){
      const marker = new google.maps.Marker({
         position: points[i].position,
         icon: icons[points[i].type].icon,
         map: map,
      })
   }
}
   
// ПРОВЕРКА НА ТАЧСКРИН
const isMobile = {
   Android: function () {
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function () {
      return (
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   }
};

// МЕНЮ БУРГЕР
let menu = document.querySelector('.icon-menu');
let menuBody = document.querySelector('.menu__body');
let menuBox = document.querySelector('.menu__box');
menu.addEventListener('click', function () {
   document.body.classList.toggle('_lock');
   menu.classList.toggle('_active');
   menuBody.classList.toggle('_active');
   menuBox.classList.toggle('_active');
});

// ЛИПКИЙ HEADER
let header = document.querySelector('.header');
document.onscroll = function () {
   let scroll = window.scrollY;

   if (scroll > 0){
      header.classList.add('_fixed');
   } else {
      header.classList.remove('_fixed');
   }
}

// ЯКОРЬ (ПЛАВНАЯ ПРОКРУТКА ДО НУЖНОГО БЛОКА) С ПОДСВЕТКОЙ АКТИВНОГО ПУНКТА МЕНЮ
let menuLinks = document.querySelectorAll('[data-goto]');
if (menuLinks.length > 0) {
   let gotoBlock, gotoBlockValue, gotoBlockHeight, scrollDistance, paddingTopHeader, paddingBottomHeader, heightHeader;
   window.addEventListener('scroll', menuLinkActive);
   for (let menuLink of menuLinks) {
      menuLink.addEventListener('click', onMenuLinkClick);
   }
   function menuLinkVars(menuLink) {
      scrollDistance = pageYOffset + 1;
      gotoBlock = document.querySelector(menuLink.dataset.goto);
      gotoBlockHeight = document.querySelector(menuLink.dataset.goto).offsetHeight;
      paddingTopHeader = parseFloat(window.getComputedStyle(document.querySelector('header'), null).getPropertyValue('padding-top')) - 10;
      paddingBottomHeader = parseFloat(window.getComputedStyle(document.querySelector('header'), null).getPropertyValue('padding-bottom')) - 10;
      gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollDistance - (heightHeader || document.querySelector('header').offsetHeight - paddingTopHeader - paddingBottomHeader);
   }
   function onMenuLinkClick(e) {
      let menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         menuLinkVars(menuLink);
         if (menu.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            menu.classList.remove('_active');
            menuBody.classList.remove('_active');
            menuBox.classList.remove('_active');
         }
         
         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      }
   }
   function menuLinkActive(e) { 
      for (let menuLink of menuLinks) { 
         if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { 
            heightHeader = document.querySelector('header').offsetHeight;
            menuLinkVars(menuLink);
            if (gotoBlock.offsetTop - document.querySelector('header').offsetHeight <= scrollDistance && gotoBlockHeight + gotoBlockValue > scrollDistance) {
               menuLink.classList.add('_active');
            } else {
               menuLink.classList.remove('_active');
            }
         }
      }
   }
}

// ВАЛИДАЦИЯ ФОРМЫ
let forms = document.querySelectorAll('form');
if (forms.length > 0) { 
   intitForms(forms);
}
function intitForms(forms) {
   for (let i = 0; i < forms.length; i++){
      initForm(forms[i]);
   }

   function initForm(form) { 
      form.addEventListener('submit', formSend);

      let resultMessage = document.createElement('div');
      resultMessage.classList.add('_goodmessage');
      form.appendChild(resultMessage);

      async function formSend(e) {
         e.preventDefault();

         let error = formValidate(form);

         if (error === 0) {
            form.reset();
            resultMessage.textContent = 'Отправленно';
         } else {
            resultMessage.classList.add('_errormessage');
            resultMessage.textContent = 'Ошибка';
         }
      }

      function formValidate(form) { 
         let error = 0;
         let formReq = form.querySelectorAll('._req');

         for (let i = 0; i < formReq.length; i++){
            const input = formReq[i];
            formRemoveError(input);
            // проверяем input на email
            if (input.classList.contains('_email')) {
               if (emailTest(input)) {
                  formAddError(input);
                  error++;
               }
            // проверяем input на checkbox
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
               formAddError(input);
               error++;
            } else {
               // проверяем input на пустые поля
               if (input.value === '') {
                  formAddError(input);
                  error++;
               }
            }
         }
         return error;
      }
      // Функция для добавления класса error
      function formAddError(input) { 
         input.parentElement.classList.add('_error');
         input.classList.add('_error');
      }
      // Функция для удаления класса error
      function formRemoveError(input) { 
         input.parentElement.classList.remove('_error');
         input.classList.remove('_error');
      }
      // Функия теста email
      function emailTest(input) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
      }
   }
}

// POPUP
const popupLinks = document.querySelectorAll('[data-popup]');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll("[data-lp]");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
   for (let index = 0; index < popupLinks.length; index++){
      const popupLink = popupLinks[index];

      popupLink.addEventListener("click", function (e) {
         const popupName = popupLink.dataset.popup;
         const curentPopup = document.getElementById(popupName);;
         popupOpen(curentPopup);
         e.preventDefault();
      });
   }
}
const popupCloseIcon = document.querySelectorAll('[data-close]');
if (popupCloseIcon.length > 0) {
   for (let index = 0; index < popupCloseIcon.length; index++){
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
         popupClose(el.closest('.popup'));
         e.preventDefault();
      });
   }
}
function popupOpen(curentPopup) {
   if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup._open');
      if (popupActive) {
         popupClose(popupActive, false);
      } else {
         bodyLock();
      }
      curentPopup.classList.add('_open');
      curentPopup.addEventListener("click", function (e) {
         if (!e.target.closest('.popup__content')) {
            popupClose(e.target.closest('.popup'));
         }
      });
   }
}
function popupClose(popupActive, doUnlock = true) {
   if (unlock) {
      popupActive.classList.remove('_open');
      if (doUnlock) {
         bodyUnLock();
      }
   }
}
function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {

      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];

         el.style.paddingRight = lockPaddingValue;
      }
   }   
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('_lock');
   if (!isMobile.any()) {
      body.classList.add('_pseudo');
   }
   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
function bodyUnLock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }   
      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
      body.classList.remove('_pseudo');
   }, timeout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timeout);
}
document.addEventListener('keydown', function (e) {
   if (e.which === 27) {
      const popupActive = document.querySelector('.popup._open');
      popupClose(popupActive);
   }
});
(function () {
   // проверяем поддержку
   if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      }
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();

/**
 * @typedef {Object} dNode
 * @property {HTMLElement} parent
 * @property {HTMLElement} element
 * @property {HTMLElement} to
 * @property {string} breakpoint
 * @property {string} order
 * @property {number} index
 */
/**
 * @typedef {Object} dMediaQuery
 * @property {string} query
 * @property {number} breakpoint
 */
/**
 * @param {'min' | 'max'} type
 */
function useDynamicAdapt(type = 'max') {
   const className = '_dynamic_adapt_'
   const attrName = 'data-da'

   /** @type {dNode[]} */
   const dNodes = getDNodes()

   /** @type {dMediaQuery[]} */
   const dMediaQueries = getDMediaQueries(dNodes)

   dMediaQueries.forEach((dMediaQuery) => {
      const matchMedia = window.matchMedia(dMediaQuery.query)
      // массив объектов с подходящим брейкпоинтом
      const filteredDNodes = dNodes.filter(({ breakpoint }) => breakpoint === dMediaQuery.breakpoint)
      const mediaHandler = getMediaHandler(matchMedia, filteredDNodes)
      matchMedia.addEventListener('change', mediaHandler)

      mediaHandler()
   })

   function getDNodes() {
      const result = []
      const elements = [...document.querySelectorAll(`[${attrName}]`)]

      elements.forEach((element) => {
         const attr = element.getAttribute(attrName)
         const [toSelector, breakpoint, order] = attr.split(',').map((val) => val.trim())

         const to = document.querySelector(toSelector)

         if (to) {
            result.push({
               parent: element.parentElement,
               element,
               to,
               breakpoint: breakpoint ?? '767',
               order: order !== undefined ? (isNumber(order) ? Number(order) : order) : 'last',
               index: -1,
            })
         }
      })

      return sortDNodes(result)
   }

   /**
    * @param {dNode} items
    * @returns {dMediaQuery[]}
    */
   function getDMediaQueries(items) {
      const uniqItems = [...new Set(items.map(({ breakpoint }) => `(${type}-width: ${breakpoint}px),${breakpoint}`))]

      return uniqItems.map((item) => {
         const [query, breakpoint] = item.split(',')

         return { query, breakpoint }
      })
   }

   /**
    * @param {MediaQueryList} matchMedia
    * @param {dNodes} items
    */
   function getMediaHandler(matchMedia, items) {
      return function mediaHandler() {
         if (matchMedia.matches) {
         items.forEach((item) => {
            moveTo(item)
         })

         items.reverse()
         } else {
         items.forEach((item) => {
            if (item.element.classList.contains(className)) {
               moveBack(item)
            }
         })

         items.reverse()
         }
      }
   }

   /**
    * @param {dNode} dNode
    */
   function moveTo(dNode) {
      const { to, element, order } = dNode
      dNode.index = getIndexInParent(dNode.element, dNode.element.parentElement)
      element.classList.add(className)

      if (order === 'last' || order >= to.children.length) {
         to.append(element)

         return
      }

      if (order === 'first') {
         to.prepend(element)

         return
      }

      to.children[order].before(element)
   }

   /**
    * @param {dNode} dNode
    */
   function moveBack(dNode) {
      const { parent, element, index } = dNode
      element.classList.remove(className)

      if (index >= 0 && parent.children[index]) {
         parent.children[index].before(element)
      } else {
         parent.append(element)
      }
   }

   /**
    * @param {HTMLElement} element
    * @param {HTMLElement} parent
    */
   function getIndexInParent(element, parent) {
      return [...parent.children].indexOf(element)
   }

   /**
    * Функция сортировки массива по breakpoint и order
    * по возрастанию для type = min
    * по убыванию для type = max
    *
    * @param {dNode[]} items
    */
   function sortDNodes(items) {
      const isMin = type === 'min' ? 1 : 0

      return [...items].sort((a, b) => {
         if (a.breakpoint === b.breakpoint) {
         if (a.order === b.order) {
            return 0
         }

         if (a.order === 'first' || b.order === 'last') {
           return -1 * isMin
         }

         if (a.order === 'last' || b.order === 'first') {
           return 1 * isMin
         }

         return 0
      }

       return (a.breakpoint - b.breakpoint) * isMin
      })
   }

   function isNumber(value) {
      return !isNaN(value)
   }
}
useDynamicAdapt();