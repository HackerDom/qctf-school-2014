# web_console #

Заходим на [сайт](http://onlychrome.qctf.ru)

Если у нас не Google Chrome - получаем ошибку и идем скачивать его.

Открываем под Google Chrome - видим красивую страничку на которой приветствие и всё...


Как обычно - неясно, что на странице - лезем в исходники. По страничке понятно, что ничего на ней нет, кроме подключенного javascript.

Чтож, открываем его и пытаемся понять, что происходит. Скрипт минимизирован и обфусцирован, но есть отличные инструменты, позволяющие получить правильное форматирование. Для примера, воспользуемся сайтом [JSBeautifier](http://jsbeautifier.org)

Вставляем туда полученный js, преобразовываем - все становится несколько понятнее.

Тут у нас два пути - можно посмотреть по-быстрому код и отсечь ненужные функции, можно просто все подряд позапускать.

Или совместить эти два метода. 

В итоге, отсеяв все заведомо ложные функции получаем несколько более сложных, из которых все кроме одной - без параметра, а одна - с параметром.

Те что без параметра - можно запустить и увидеть, что они выводят не то, что нужно.

Значит, остается выяснить, какой же параметр должен быть у единственной, оставшейся после отсеивания, функции **give\_me\_glag(inp)**.

Смотрим, что она выводит в конце.

    alert(_a.map(crypt1).map(String.fromCharCode).join("").concat(temp.toLowerCase()))


Значит первые символы ответа - значение массива \_a после применения функции crypt1(), где функция просто прибавляет 1 к входному параметру.

Можно предположить, что так как по условию флаг должен иметь вид QCTF\_2342342325, то массив \_a - это ascii коды символов QCTF\_ минус 1, то есть PBSE^

Смотрим, как получается массив \_a:

    var _a = [inp.charCodeAt(0) - " ".charCodeAt(0)];
        _a[_a.length] = (inp.charCodeAt(1) - inp.charCodeAt(3)) * 6;
        _a[_a.length] = inp.charCodeAt(2) - 022;
        _a[_a.length] = (inp.charCodeAt(4) - inp.charCodeAt(5)) * 5 - 1;
        _a[_a.length] = _a[_a.length - 1] + 031;

Составляем систему уравнений и вычисляем входную строку - "please"

Исполняем функцию (например, в консоли браузера) give\_me\_flag("please");  - во всплывающем окне получаем флаг.

P.S. За пару часов до конца игры был хинт - "Нельзя просто взять и вызвать функцию", намекающий на то, что функцию надо вызывать по-особенному - с параметром.
