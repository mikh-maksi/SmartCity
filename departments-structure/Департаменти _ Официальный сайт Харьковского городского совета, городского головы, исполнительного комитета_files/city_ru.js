(function($) {
	$.translations = {
		calendar : {
			dateFor: 'за',
			dateFrom: 'c',
			dateTo: 'по',
			dateChosen: 'Вы выбрали материалы',
			foldUp: 'Свернуть',
			choose: 'Выбрать',
			canChoose: 'Вы можете выбрать как один день, так и период,<br> определив начальную и конечную дату'
		},
		loader : {
			loadingText: 'Загрузка...',
			errorText: 'Ошибка загрузки'
		}
	};
})(jQuery);

(function($) {
	$.countdown.regional['ru'] = {
		labels: ['Лет', 'Месяцев', 'Недель', 'Дней', 'Часов', 'Минут', 'Секунд'],
		labels1: ['Год', 'Месяц', 'Неделя', 'День', 'Час', 'Минута', 'Секунда'],
		compactLabels: ['l', 'm', 'n', 'd'], compactLabels1: ['g', 'm', 'n', 'd'],
		timeSeparator: ':', isRTL: false};
	$.countdown.setDefaults($.countdown.regional['ru']);
})(jQuery);
