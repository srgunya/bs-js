function map() {
    let mapDestroy;

    let contactButton__block = document.querySelector('.contactButton__block');
    contactButton__block.onclick = () => mapOpen();

    let contactMap = document.querySelector('.contactMap');
    let contactMap__img = document.querySelector('.contactMap__img');
    contactMap.onclick = (e) => mapClose(e);
    contactMap__img.onclick = (e) => mapClose(e);


    let contactMap__block = document.querySelector('.contactMap__block');
    let body = document.querySelector('body');
    let header = document.querySelector('.header');

    function mapOpen() {
        contactMap.classList.remove('contactMap_display-none');
        setTimeout(() => {
            body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            header.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            body.style.overflow = 'hidden';
            contactMap.style.top = window.scrollY + 'px';
            contactMap.style.opacity = 1;
            contactMap__block.style.bottom = 0;
        }, 100)

        mapInit()
    }

    function mapClose(e) {
        if (e.target == contactMap || e.target == contactMap__img) {
            contactMap__block.style.bottom = -65.8327847268 + 'vw';
            contactMap.style.opacity = 0;
            setTimeout(() => {
                body.style.paddingRight = 0;
                header.style.paddingRight = 0;
                contactMap.classList.add('contactMap_display-none');
                body.style.overflow = 'inherit';
                mapDestroy.destroy();
            }, 300)
        }

    }

    function mapInit() {
        // Функция ymaps.ready() будет вызвана, когда
        // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
        ymaps.ready(init);

        function init() {
            // Создание карты.
            // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/map-docpage/
            var myMap = new ymaps.Map("map", {
                // Координаты центра карты.
                // Порядок по умолчнию: «широта, долгота».
                center: [55.772537, 37.610008],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 12.5,

                // Элементы управления
                // https://tech.yandex.ru/maps/doc/jsapi/2.1/dg/concepts/controls/standard-docpage/
                controls: [

                'zoomControl', // Ползунок масштаба
                'trafficControl', // Пробки
                'typeSelector', // Переключатель слоев карты
                'fullscreenControl', // Полноэкранный режим

                // Поисковая строка
                new ymaps.control.SearchControl({
                        options: {
                            // вид - поисковая строка
                            size: 'large',
                            // Включим возможность искать не только топонимы, но и организации.
                            provider: 'yandex#search',

                        }
                    })

            ]
            }, {
                suppressMapOpenBlock: true
            });

            // Добавление метки
            // https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
            var myPlacemark = new ymaps.Placemark([55.772537, 37.610008], {
                // Хинт показывается при наведении мышкой на иконку метки.
                hintContent: 'Москва, Каретный ряд, 8',
            }, {
                iconLayout: 'default#image',
                iconImageHref: '../../img/contact/map.png',
                iconImageSize: [35, 32],
            });
            // После того как метка была создана, добавляем её на карту.
            myMap.geoObjects.add(myPlacemark);
            mapDestroy = myMap;
        }
    }
}
map()
