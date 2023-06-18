$(document).ready(function () {  
	/*погода*/
	var script = document.createElement('script');
	script.src = "https://www.gismeteo.ua/ajax/getInformer/?hash=D0g0CEWk6reG6q";
	document.documentElement.appendChild(script);
	script.onload = function() {
		$('#main_wrap .gsTemp span').ready(function(){
			$('span.temp').html($('#main_wrap td:eq(0) .gsWeatherIcon').html()+$('#main_wrap td:eq(0) .gsTemp').html());
			$('span.temp').find('.tsp').remove();
	});

	}

	
	$(".use_h").click(function() {
		if ($(this).parent().hasClass("open")) {
			$(this).parent().children('.use_l_wrapper').slideDown('normal');
			$(this).parent().removeClass("open");
			$(this).parent().children('.use_l_wrapper').slideUp('normal');
		}
		else {
			$(this).parent().addClass('open');
			$(this).parent().children('.use_l_wrapper').slideDown('normal');
		}

	});
});

function setDatepickers()
{
	$('#inlineCalendar').DatePicker({
		flat: true,
		date: datepickerCurDate,
		current: datepickerCurDate,
		//lastSel: new Date(),
		calendars: 1,
		starts: 1,
		onChange: function(formated, dates){
			$('#dateSelected').val(formated);
			$('#inputDateFrom').val(formated);
			$('#inputDateTo').val(formated);
			//console.log(formated);return false;
			$('#formArchive').submit();
		},
		containerId: 'datepicker-inline',
		localeKey: lang
	});
	$('#inputDateFrom').val(datepickerCurDate);
	var prevMonth=new Date(datepickerCurDate);
	prevMonth.setMonth(prevMonth.getMonth()-1);

	$('#showRangeCalendar').DatePicker({
		format: 'Y-m-d',
		date: datepickerCurDate,
		current: prevMonth,
		lastSel: new Date(),
		starts: 1,
		position: 'b',
		calendars: 3,
		mode: 'range',
		onChange: function(formated, dates){
			$('#inputDate').val(formated);
			var dates = $('#inputDate').val().split(',');
			if(dates[0] == dates[1])
			{
				$('#periodSpecified').html($.translations.calendar.dateChosen+' '+$.translations.calendar.dateFor+' <span id="startDate"></span>');
				$('#startDate').html(dates[0]);
			}
			else
			{
				$('#periodSpecified').html($.translations.calendar.dateChosen+' '+$.translations.calendar.dateFrom+' <span id="startDate"></span> '+$.translations.calendar.dateTo+' <span id="endDate"></span>');
				$('#startDate').html(dates[0]);
				$('#endDate').html(dates[1]);
			}
		},
		onHide: function(){
			var dates = $('#inputDate').val().split(',');
			if(dates[0] == dates[1])
			{
				$('#startDate').html(dates[0]);
			}
			else
			{
				$('#startDate').html(dates[0]);
				$('#endDate').html(dates[1]);
			}
		},
		localeKey: lang,
		containerId: 'datepicker-popup',
		containerWrapper: '<div class="datepicker"><div class="datepickerContainer"><div class="datepicker-toolbox-header"><span id="periodSpecified"></span><a href="#" id="datepicker-tool-fold">' + $.translations.calendar.foldUp + '</a></div><table><tbody><tr></tr></tbody></table><div class="datepicker-toolbox-footer">* ' + $.translations.calendar.canChoose + '<a href="#" id="datepicker-tool-choose">' + $.translations.calendar.choose + '</a></div></div></div>'
	});
	$('#datepicker-tool-fold').bind('click', function(){
		$('#showRangeCalendar').DatePickerHide();
		return false;
	});
	$('#datepicker-tool-choose').bind('click', function(){
		var dates = $('#inputDate').val().split(',');
		if(dates[0] != '')
		{
			$('#inputDateFrom').val(dates[0]);
			$('#inputDateTo').val(dates[1]);
		}
		$('#formArchive').submit();
		return false;
	});
	$('#formArchive').submit(function(){
		var reDate = /(?:19|20\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/;
		var bringDate = $('#dateSelected').val();
		if(reDate.test(bringDate))
		{
			$('#inputDateFrom').val(bringDate);
			$('#inputDateTo').val(bringDate);
		}
	});
	$('.customDate').each(function(){
		var cdId = $(this).attr('id');
		var cdSelector = 'customDateTrigger_'+cdId;
		var dateProvided = $(this).val()?$(this).val():datepickerCurDate;
		$('#'+cdSelector).DatePicker({
			format: 'Y-m-d',
			date: dateProvided,
			lastSel: new Date(),
			current: dateProvided,
			starts: 1,
			calendars: 1,
			position: 'left',
			containerId: 'datepicker-popup_'+cdId,
			localeKey: lang,
			onChange: function(formated, dates){
				$('#'+cdId).val(formated);
				$('#'+cdSelector).DatePickerHide();
			}
		});
	});
}
function markBySelectedLi(selectedLi)
{
	if(selectedLi.is('li'))
	{
		selectedLi.addClass('m_mark');
		selectedLi.parents('li').addClass('open');//each(function(){$(this).addClass('open')});
	}
}

function openBySelectedLi(selectedLi)
{
	$('#menu').find('li').removeClass('m_mark');
	if(selectedLi.is('li'))
	{
		selectedLi.addClass('open');
		selectedLi.parents('li').addClass('open');//each(function(){$(this).addClass('open')});
	}
}

function nav() {
	$("#menu ul").each(function() {
		$(this).parent().addClass('parent');
	});
	/*
	$("#menu li.parent > a").each(function() {
		if ($(this).hasClass("m_ico")) {
		}
		else {
			$(this).replaceWith("<span>" + $(this).text() + "</span>");
		}
	});
	*/

	$(".use_l_wrapper #myAccordion_index dt > a, .use_l_wrapper #myAccordion_side dt > a").each(function() {
		cl = $(this).attr('class');
		$(this).replaceWith("<span class=" + cl + ">" + $(this).text() + "</span>");
	});

	// Обработка клика статических ветвей разворачивающегося списка	
	$("#menu li.parent span").click(function() {
		var selectedLi=$('#mainmenu_44');
		if ($(this).parent().hasClass("open")) {
			$(this).parent().removeClass("open");
//			$(this).parent().children('ul').removeClass("open_ul").slideUp('normal');
		}
		else {
		/*
			if ($(this).parent().parent().hasClass("open_ul")) {

			}
			else {*/
//				$("#menu .open").each(function() {
//					$(this).removeClass("open");
//					$(this).children('ul').removeClass("open_ul").slideUp('normal');
//				});
				$("#menu .open").removeClass("open");
//				$(this).parents('ul').addClass('open_ul');
				openBySelectedLi($(this).parent('li'));
			}
		/*

			$(this).parent().addClass('open');
			$(this).parent().children('ul').addClass("open_ul").slideDown('normal');
		}
*/
		//$(this).parent().children('ul').slideToggle('normal');
	});




	var max_hieght;
	$('.n_l_block').each(function() {
		if ($(this).height() > max_hieght) {
			var max_hieght = $(this).height();
		}
	});

	$('.n_l_block').each(function() {
		$(this).height(max_hieght);
	});

	$("#myAccordion_index dt, #myAccordion_side dt").click(function() {
		if ($(this).hasClass("u_open")) {
			$(this).removeClass("u_open");
			$(this).parent().children('dd').slideUp('normal');
		}
		else {
			$(this).addClass('u_open');
			$(this).parent().children('dd').slideDown('normal');
		}
	});
}

var cycleBoxes=true;
var timeview = 3000;
function nextBox(selector)
{
    if(!selector) return;
    if(!cycleBoxes) return;

    var nextLi=$(selector).next();
    if(nextLi.is('*'))
    {
            nextLi.find('a').trigger('click');
            if(!cycleBoxes) return;
            setTimeout(function(){nextBox(nextLi);}, timeview);
    }
    else
    {
            if(!cycleBoxes) return;
            selector.parent('ul').find('li:first a').trigger('click');
            nextLi=selector.parent('ul').find('li:first');
            setTimeout(function(){nextBox(nextLi);}, timeview);
    }
}

function setupCycleBoxes()
{
	var links=$('a', '.s_l_item');
	var boxes=$('.s_l_block');
	$(links).each(function(){
		$(this).click(function(){
			var currentBox=$(this).attr('id');
			$(boxes).each(function(){
				if($(this).hasClass(currentBox))
					$(this).addClass('active');
				else
					$(this).removeClass('active');
			});
			$(links).each(function(){
				if($(this).attr('id')==currentBox)
					$(this).addClass('current');
				else
					$(this).removeClass('current');
	
			});
			//cycleBoxes=false;
			return false;
		});
	});
        /*setTimeout(function(){nextBox($('.s_l_item li:first'))}, timeview);
        
	$('.s_l_block').hover(
            function(){
                cycleBoxes=false;
            }, 
            function(){
                cycleBoxes=true;
                nextBox($('ul.s_l_item li').eq($(this).attr('class').slice(6,8)-1));
            }
        );*/
}
var anchorStart = window.location.hash.substring(1);
var anchor = '';

function checkHash()
{
	var currentAnchor=window.location.hash.substring(1);
	if(anchor!=currentAnchor)
	{
		$('#tab_'+currentAnchor).trigger('click');
	}
	setTimeout('checkHash()', 100);
}


function ajaxLinksLoader(container, target)
{
	var selector = anchorStart?'#tab_'+anchorStart:'a:first';
	$(container).find("a").each(function(){
		$(this).click(function(){
			var aHref=$(this).attr("href");
			var idRegex=/\/([0-9]+)\/?$/;
			var currentAnchor = '';
			if(aHref.match(idRegex))
			{
				currentAnchor = aHref.match(idRegex)[1];
			}
			if(currentAnchor == '' || currentAnchor != anchor)
			{
				anchor = currentAnchor;
				window.location.hash=currentAnchor;

				$(target).html('<div class="load_loader">'+$.translations.loader.loadingText+'</div>');
				$(target).load(aHref, function(response, status, xhr){
					if(status=='error')
					{
						$(target).html('<div class="load_error">'+$.translations.loader.errorText+'</div>');
					}
					else
					{
						 if ( $.browser.msie ) 
							 $(target).html(innerShiv(response, false));
						 else
							 $(target).html(response);	 
					}
						
				});
				$('html').scrollTop(0);
				var selectedLink=this;
				$(container).find("a").map(function(){if (this==selectedLink)$(this).addClass('a_mark');else $(this).removeClass('a_mark');});
			//
				if(currentAnchor)
				{
	//				var hash=aHref.match(idRegex)[1];
					
					currentAnchor='#'+currentAnchor;
					$('.lang_link', '.lang').each(function(){
						var langHref=$(this).attr('href');
						var hashRegex=/#([0-9]+)\/?/;
						if(langHref.match(hashRegex))
							langHref=langHref.replace(hashRegex, currentAnchor);
						else
							langHref+=currentAnchor;

						$(this).attr('href', langHref);
					});
				}
			}
			//
			//
			return false;
		});
	}).end().find(selector).trigger('click');
	
	if ("onhashchange" in window)
	{
		$(window).bind('hashchange', (function(){
			$('#tab_'+window.location.hash.substring(1)).trigger('click');
		}));
	}
	else
	{
		checkHash();
	}
}

// function setDatepickers()
// {
// 	$('#inputDateFrom').val(datepickerCurDate);
// 	var prevMonth=new Date(datepickerCurDate);
// 	prevMonth.setMonth(prevMonth.getMonth()-1);
//
// 	$('#showRangeCalendar').DatePicker({
// 		format: 'Y-m-d',
// 		date: datepickerCurDate,
// 		current: prevMonth,
// 		lastSel: new Date(),
// 		starts: 1,
// 		position: 'b',
// 		calendars: 3,
// 		mode: 'range',
// 		onChange: function(formated, dates){
// 			$('#inputDate').val(formated);
// 			var dates = $('#inputDate').val().split(',');
// 			if(dates[0] == dates[1])
// 			{
// 				$('#periodSpecified').html($.translations.calendar.dateChosen+' '+$.translations.calendar.dateFor+' <span id="startDate"></span>');
// 				$('#startDate').html(dates[0]);
// 			}
// 			else
// 			{
// 				$('#periodSpecified').html($.translations.calendar.dateChosen+' '+$.translations.calendar.dateFrom+' <span id="startDate"></span> '+$.translations.calendar.dateTo+' <span id="endDate"></span>');
// 				$('#startDate').html(dates[0]);
// 				$('#endDate').html(dates[1]);
// 			}
// 		},
// 		onHide: function(){
// 			var dates = $('#inputDate').val().split(',');
// 			if(dates[0] == dates[1])
// 			{
// 				$('#startDate').html(dates[0]);
// 			}
// 			else
// 			{
// 				$('#startDate').html(dates[0]);
// 				$('#endDate').html(dates[1]);
// 			}
// 		},
// 		localeKey: lang,
// 		containerId: 'datepicker-popup',
// 		containerWrapper: '<div class="datepicker"><div class="datepickerContainer"><div class="datepicker-toolbox-header"><span id="periodSpecified"></span><a href="#" id="datepicker-tool-fold">' + $.translations.calendar.foldUp + '</a></div><table><tbody><tr></tr></tbody></table><div class="datepicker-toolbox-footer">* ' + $.translations.calendar.canChoose + '<a href="#" id="datepicker-tool-choose">' + $.translations.calendar.choose + '</a></div></div></div>'
// 	});
// 	$('#datepicker-tool-fold').bind('click', function(){
// 		$('#showRangeCalendar').DatePickerHide();
// 		return false;
// 	});
// 	$('#datepicker-tool-choose').bind('click', function(){
// 		var dates = $('#inputDate').val().split(',');
// 		if(dates[0] != '')
// 		{
// 			$('#inputDateFrom').val(dates[0]);
// 			$('#inputDateTo').val(dates[1]);
// 		}
// 		$('#formArchive').submit();
// 		return false;
// 	});
// 	$('#inlineCalendar').DatePicker({
// 		flat: true,
// 		date: datepickerCurDate,
// 		current: datepickerCurDate,
// 		//lastSel: new Date(),
// 		calendars: 1,
// 		starts: 1,
// 		onChange: function(formated, dates){
// 			$('#dateSelected').val(formated);
// 			$('#inputDateFrom').val(formated);
// 			$('#inputDateTo').val(formated);
// 			//console.log(formated);return false;
// 			$('#formArchive').submit();
// 		},
// 		containerId: 'datepicker-inline',
// 		localeKey: lang
// 	});
// 	$('#formArchive').submit(function(){
// 		var reDate = /(?:19|20\d{2})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])/;
// 		var bringDate = $('#dateSelected').val();
//         if(reDate.test(bringDate))
// 		{
// 			$('#inputDateFrom').val(bringDate);
// 			$('#inputDateTo').val(bringDate);
// 		}
// 	});
// 	$('.customDate').each(function(){
// 		var cdId = $(this).attr('id');
// 		var cdSelector = 'customDateTrigger_'+cdId;
// 		var dateProvided = $(this).val()?$(this).val():datepickerCurDate;
// 		$('#'+cdSelector).DatePicker({
// 			format: 'Y-m-d',
// 			date: dateProvided,
// 			lastSel: new Date(),
// 			current: dateProvided,
// 			starts: 1,
// 			calendars: 1,
// 			position: 'left',
// 			containerId: 'datepicker-popup_'+cdId,
// 			localeKey: lang,
// 			onChange: function(formated, dates){
// 				$('#'+cdId).val(formated);
// 				$('#'+cdSelector).DatePickerHide();
// 			}
// 		});
// 	});
// }

function setupAudioPlayer()
{
	$('a.audio_link').each(function(){
		var link=$(this);
		link.flash({src: baseurl+'swf/player_small.swf', width:150, height:11, wmode:'opaque', flashvars: {mp3_url: link.attr('href')}});
		link.click(function(){return false;});
	});
}
/*
function init_poll_box(){
	$('#showPollBoxContainer').click(function(){
		$('#poll_box_form_container').toggle();
		return false;
	});
	$('#poll_box_form').submit(function(){
					var answ=$(this).find('input:checked').val();
					var id=$('#poll_box_id').val();
					
					if(answ)
					{
						var posturl=lang+'/poll/poll/';
						var postdata= {id: id, number: answ};
						$.getJSON(posturl, postdata, function(cbData){
							$.cookie('vote_id['+id+']', id, {path:'/', expires: 365});
							drawPollResults(cbData, '#poll_box_form_container');
						});
					}
					return false;
				});
	$('#poll_box_showResults').click(function(){
		var id=$('#poll_box_id').val();
			var posturl=lang+'/poll/archive/';
			var postdata= {id: id};
			$.getJSON(posturl, postdata, function(cbData){
				drawPollResults(cbData, '#poll_box_form_container');
			});
		return false;
	});
}

function getPollResults(postdata, dest)
{
	$.getJSON(lang+'/poll/archive/', postdata, function(data){drawPollResults(data, dest)});
}

function init_poll_lister()
{			
	var flag=true;
	$('#poll_lister').find('li').each(function(){
		var id=$(this).attr('id').split('_')[1];
		var postdata={id: id};
		if(flag)
		{
			$("#poll_print").attr('href', lang+'/poll/print/id/'+id);
			getPollResults(postdata, '#poll_results');
//			$.getJSON(lang+'/poll/archive/', postdata, function(data){drawPollResults(data, '#poll_results')});
			flag=false;
		}
		$(this).click(function(){
			$("#poll_print").attr('href', lang+'/poll/print/id/'+id);
			getPollResults(postdata, '#poll_results');
//			$.getJSON(lang+'/poll/archive/', postdata, function(data){drawPollResults(data, '#poll_results')});
		});
	});
}

function drawPollResults(cbData, destID)
{
	var total_votes = 0;
	$.each(cbData.polls, function(i, item){
		total_votes=total_votes+parseInt(item.pr_counter);
	});
	var results_html = '<h2>'+cbData.question+'</h2>';
	if(total_votes)
	{
		results_html += '<dl id=\'poll-results\'>';
		$.each(cbData.polls, function(i, item){
			percent = Math.round((parseInt(item.pr_counter)/parseInt(total_votes))*100);
			results_html = results_html+'<dt class=\'bar-title\'>'+item.pa_text+'</dt><dd class=\'bar-container\'><div id=\'bar'+item.pa_number+'\' style=\'width: '+percent+'%; \'>&nbsp;</div><strong>'+percent+'%</strong></dd>';
		})
		results_html = results_html+'<dd>'+cbData.total_votes+': '+total_votes+'</dd></dl>';
	}
	else
	{
		results_html += cbData.no_poll_results;
	}
	$(destID).html(results_html);
}
*/

function hideGMapsLabels()
{
	$('a[href^=http://maps.google]', 'small').hide();
}

function supportObsoleteAttributes()
{
	$('img', '.s_text').each(function(){
		var img=$(this);
		var styles={};
		var hspace=img.attr('hspace');
		var vspace=img.attr('vspace');
		var border=img.attr('border');
		if(hspace!=-1)
		{
			styles['margin-left']=hspace+'px';
			styles['margin-right']=hspace+'px';
		}
		
		if(vspace!=-1)
		{
			styles['margin-top']=vspace+'px';
			styles['margin-bottom']=vspace+'px';
		}
		
		if(border!=-1)
		{
			styles['border-width']=border+'px';
		}

		img.css(styles);
	});
	
	/*
	$('table', '.s_text').each(function(){
		var table=$(this);
		var styles={};
		var cellspacing=table.attr('cellspacing');
		var cellpadding=table.attr('cellpadding');
		var border=table.attr('border');
		if(cellspacing!=-1)
		{
			styles['margin']=cellspacing+'px';
		}
		
		if(cellpadding!=-1)
		{
			styles['padding']=cellpadding+'px';
		}
		
		if(border!=-1)
		{
			styles['border-width']=border+'px';
			table.css({borderWidth: border+'px'}); //'
		}

		table.find('td').css(styles);
	});
	*/
}

function BTF(title)
{
	var shareUrl=window.location.href;
	var shareTitle=encodeURIComponent(title!=''?title:document.title);
	$('#shareMail').attr('href', 'mailto:?subject='+shareTitle+' - '+shareUrl);
	//$('#shareBuzz').attr('href', $('#shareBuzz').attr('href')+'?url='+shareUrl+'&title='+shareTitle);
	$('#shareVkontakte').attr('href', $('#shareVkontakte').attr('href')+'?url='+shareUrl+'&title='+shareTitle);
	$('#shareTwitter').attr('href', $('#shareTwitter').attr('href')+'?url='+shareUrl+'&text='+shareTitle);
	$('#shareFacebook').attr('href', $('#shareFacebook').attr('href')+'?u='+shareUrl+'&t='+shareTitle);
	//$('#shareYandex').attr('href', $('#shareYandex').attr('href')+'?URL='+shareUrl+'&title='+shareTitle);
	$('#shareLivejournal').attr('href', $('#shareLivejournal').attr('href')+'?subject='+shareTitle+'&event='+shareUrl);
	$('#shareMailru').attr('href', $('#shareMailru').attr('href')+'?share_url='+shareUrl+'&title='+shareTitle);
	$('#shareOdnoklassniki').attr('href', $('#shareOdnoklassniki').attr('href')+'&st._surl='+shareUrl);
	$('#shareFriendfeed').attr('href', $('#shareFriendfeed').attr('href')+'?url='+shareUrl+'&title='+shareTitle);
}

function setupMain(){
	nav();
	setupAudioPlayer();
	// init_poll_box();
	var euroDate = new Date('09 June 2012');$('#euro2012banner').countdown({until: euroDate, format: 'dHM'});$('#dateSelected').placehold();
}
