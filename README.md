делать отдельные файл *.lazy.tsx, на мой взгляд - это оверхэд(это сейчас изменять ненадо) 
	
	- оставил без изменений

в Product: делать два одинаковых useEffect(с одинаковыми зависимостями) - моветон
		
		- исправил. теперь один useEffect. так же  оптимизировал с помощью Promise.all

в Product: назначать первоначально заданные id в state - грубая ошибка
		
		- исправил. 

в Product: делать запрос на сервер при каждой смене цвета - вопрос спорный. обновлять текущие данные до актуальных безусловно важно, но если берёмся это делать - то переключение цвета не должно блокировать пользователю интерфейс. сравните озон и ВБ - на озоне происходит обновление страницы и всё в лоадерах, на ВБ моментальная перерисовка контента.
		
		- исправил. пояснение оставил в файле Product.tsx.


в Carousel: есть проблема - нужно найти и исправить
		
		- предполагаю, что проблема была в том, что текущий индекс картинки использовался напрямую в функции обновления. имправил через предыдущее состояние.
		- так же добавил обработку пустого массива.

в ColorChooserItem: есть проблема - нужно найти и исправить
		
		- рендер компонента зависел от выбранного цвета (currentColor). 
		- так же был не обязательный .preventDefault().

в ColorChooserItem: делать colorMap с ключами цветов - не дело. если хочется выводить цвет по хэшу - нужно добавлять поле в "базу"(api) как это бы было сделано в реальной жизни
		
		- убрал colorMap, добавил hex в api. Сначала считал что нужно воздержаться от редактирования "базы", так сказать работать с тем что есть. решение с colorMap - откровенный костыль.
		 

localStorage в отрыве от стора - плохая практика.
		
		- перенес всё что связано с localStorage в стор (entities/customer.ts)

есть баг с корзиной, нужно найти и исправить
		
		- вот здесь, честно сказать, не понял очем конкретно речь. Но всё что связано с корзиной сильно изменилоь, по этому надеюсь, что косвенно исправил.


расчёт стоимости корзины делать через запрос на сервер - плохо. расчёт нужно переделать
		
		- расчет стоимости полностью перенес на "клиент"

в корзине очень много запросов на сервер. спам - плохо
		
		-теперь запросы осуществляются в самой корзине, а не в каждом её отжельном компоненте. 
		 количество запросов при загрузке корзины сократилось с 3*n + n (n - число товаров в корзине) до двух.
