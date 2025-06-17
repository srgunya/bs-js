function map() {
    mapInit()

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
            button(myMap)
        }
    }
}
map()
