
    function tick() {
        var code = 0;

        function tack() {
            $.ajax({type:'POST',url:'/'+window.location.href.split('/')[3]+'/',data:'ajax=online',dataType:'json',success:function(online){
                if (code != online.code) {
                    code = online.code;
                    $(".online").html(online.content);                      
                }
                setTimeout(function(){tack()}, /*[(online_interval)] * */ 5 * 1000);
            }});
        }
        tack();
    }
$(document).ready(function(){
    if ($('.js_work-group-filter')) {
      $('.js_work-group-filter').each(function (i, e) {
        $(e).select2({
          theme: 'default work-group-select',
          minimumResultsForSearch: -1,
          width: '100%'
        });
      });
    }
    if ($('.js_work-group-select')) {
      $('.js_work-group-select').each(function (i, e) {
        $(e).select2({
          theme: 'default work-group-select work-group-select--gray',
          minimumResultsForSearch: -1,
          width: '100%'
        });
      });
    }

    $('.files').change(function() {
      var max_attachments_size_allowed = 10 * 1024 * 1024; //10мб
      var attachments_size = this.files[0].size;
      var filename = this.files[0].name;
      $(this).siblings("label").text(filename);
      $(this).closest('.input-container__file').addClass('filled');
      if (attachments_size > max_attachments_size_allowed) {
        $(this).siblings('label').text($(this).data('error-size'));
      }
    });
    $('.input-container__file .delete').click(function() {
      var norma_class = 'pass';
      var error_class = 'error';
      var inp = $(this).siblings('input');
      var label = $(this).siblings('label');
      inp.val('');
      inp.parents('.input-container__file').removeClass(error_class);
      inp.parents('.input-container__file').removeClass('filled');
      inp.parents('.input-container__file').removeClass(norma_class);
      label.text(inp.data('error-existence'));
    });

    $('.tel-mask').mask("+38 (999) 999 99 99");
    var _lang = window.location.href.split('/')[3];
        if ($("#online").size() > 0) {
            tick();
        }

        $("#deputyTabs .a_link").bind("click", function(e){
            e.preventDefault();
            $("#deputyTabs .a_mark").removeClass("a_mark");
            $(this).addClass("a_mark");
            if ($(this).attr("id") == "tab_alphabet")
                    $(".block_caurosel").slideDown(1000);
            else 
                    $(".block_caurosel").slideUp(1000);
            $.ajax({type:'POST',cache:false,url:'/'+_lang+'/',data:"ajax=deputy&tab="+encodeURI($(this).attr("id")),dataType:'json',success:function(json){
                $("#deputy_container .thead").html(json.head);
                $("#deputy_container .tbody").html(json.body);
            }});
        });
        $(".letters_remote .d_i_l_link").bind("click", function(e){
            e.preventDefault();
            $(".letters_remote .a_mark").removeClass("a_mark");
            $(this).addClass("a_mark");
            $.ajax({type:'POST',cache:false,url:'/'+_lang+'/',data:"ajax=deputy&tab=tab_alphabet&letter="+$(this).attr("title"),dataType:'json',success:function(json){
                $("#deputy_container .tbody").html(json.body);
            }});
        });
        
        if (window.location.hash != "#" && window.location.hash != "" && window.location.hash != undefined) $("[href='"+window.location.hash+"']").trigger("click");


        // smartbanner();
        $(function () { $.smartbanner({ 
                title: null, // What the title of the app should be in the banner (defaults to <title>)
                author: null, // What the author of the app should be in the banner (defaults to <meta name="author"> or hostname)
                price: 'FREE', // Price of the app
                appStoreLanguage: 'us', // Language code for App Store
                inAppStore: 'On the App Store', // Text of price for iOS
                inGooglePlay: 'In Google Play', // Text of price for Android
                icon: '../images/logo_android.png', // The URL of the icon (defaults to <link>)
                iconGloss: null, // Force gloss effect for iOS even for precomposed (true or false)
                button: 'VIEW', // Text on the install button
                scale: 'auto', // Scale based on viewport size (set to 1 to disable)
                speedIn: 300, // Show animation speed of the banner
                speedOut: 400, // Close animation speed of the banner
                daysHidden: 15, // Duration to hide the banner after being closed (0 = always show banner)
                daysReminder: 90, // Duration to hide the banner after "VIEW" is clicked (0 = always show banner)
                force: null // Choose 'ios' or 'android'. Don't do a browser check, just always show this banner 
            });
        });

        $(".print").bind("click", function(){
            window.print();
            return false;
        })

        window.onload = function() {
            var $recaptcha = document.querySelector('#g-recaptcha-response');

            if($recaptcha) {
                $recaptcha.setAttribute("required", "required");
            }
        };

        //caurosel

        $('.caurosel').bxSlider({
            pager:false,
            auto: false,
            minSlides: 4,
            maxSlides: 11,
            moveSlides:1,
            slideWidth: 90
        });

        $('.caurosel01').bxSlider({
            pager:false,
            auto: false,
            minSlides: 2,
            maxSlides: 3,
            moveSlides:1,
            slideWidth: 180,
            slideMargin:5,
            startSlide:0,
            infiniteLoop:false,
            hideControlOnEnd:true
        });


        //caurosel




        // $('.inside_navbar .nav > ul > li').hover(function(){
        //     $(this).find('ul').css('display', 'block')},
        //     function(){
        //     $(this).find('ul').css('display', 'none');
        // });



		//top_menu

		$('.js_btn_drop').on('click', function(){
            $(this).toggleClass('open-menu').next('.list').slideToggle();
        });


        //top_menu


       	//resize-window

        function auto_width(){
        	var _w = $(window).width();
        
	        if(_w > 979){
	            $('.list').removeAttr('style');
	            $('.box_list span').removeClass('js_name_list');
	            $('.box_list ul').removeAttr('style');
                $('.footer_holder').removeAttr('style');
                $('.inside_navbar .nav > ul > li').removeClass('js_drop_main_nav');
                $('.nav ul li ul').removeAttr('style');
	        }

	         if(_w < 979){
	            $('.box_list span').addClass('js_name_list');
                $('.nav > ul > li').addClass('js_drop_main_nav');
	        }

            if(_w > 599){
                $('.sidebar ul').removeAttr('style');
            }


            
     	}
	    auto_width();
	      $(window).resize(function(){
	        auto_width();
	    });



	    //resize-window

	    //menu_footer

        $(document).on("click", ".js_name_list", function(e){ 
            $(this).next('ul').slideToggle();
            $('.footer_holder').css('height', 'auto');
        });

	    //menu_footer




        //drop_main_menu


        $(document).on('click','.js_drop_main_nav .icon-navbar', function(event){
            $(this).parent('li').find('ul').slideToggle();
           
            if($(this).parent('li').hasClass('add_drop')){
                $(this).parent('li').removeClass('add_drop');
            }else{
                $(this).parent('li').addClass('add_drop');
            }
              event.preventDefault();
        });

        //drop_main_menu


	    //datapicker
       
        $('.js_date').on('change',function(){
            var day = new Date();
            var thisDay = new Date($(this).val());
            var curr_date = day.getDate();
            var curr_month = day.getMonth() + 1;
            var curr_year = day.getFullYear();
            if(thisDay>day)
                $(this).val(curr_year+'-'+curr_month+'-'+curr_date);
            if($('[name="date_from"]').val()>$('[name="date_to"]').val())
                $('[name="date_to"]').val($('[name="date_from"]').val());            
        });
	 

	 	$('.datetimepicker').datetimepicker({
                language: 'ru',
                maxDate: new Date(),
                pickTime: false,
                defaultDate: false,                
                format: 'YYYY-MM-DD'
        });
        

        if ( $('#datetimepicker2').length > 0) {
        	$('#datetimepicker2').data("DateTimePicker").show(0);
        }

 	

	 	//datapicker




	 	//placeholder



	 	$('input[placeholder], textarea[placeholder]').placeholder();



	 	//placeholder


	 	//select

	 	$('.js_selectpicker').selectpicker();


	 	//select



	 	//inp_search

	 
		$('.js_search').on('click', function(){
			$('.js_inp_search').animate({
				left:'0',
                width:'95%'
			},300);
			setTimeout(function() { 
					$('.js_inp_search').focus();
				}, 500)
	 		$('.js_btn_search').css('display', 'block');
		});
		$('.js_inp_search').blur(function(){
            $('.js_inp_search').animate({
                left:'94%',
                width:'0%'
            },300);
	 		$('.js_btn_search').css('display', 'none');
		});
	 


	 	//inp_search



	 	//validation


	 	$('.js_validate input[type="submit"], .js_validate button[type="submit"]').on("click", function(){
        	return validate($(this).parents(".js_validate"));
    	}); 


	 	//validation


         //fancy

        $('.fancybox-buttons').fancybox({
                padding: 0,
                openEffect  : 'none',
                closeEffect : 'none',

                prevEffect : 'none',
                nextEffect : 'none',

                closeBtn  : false,

                helpers : {
                    title : {
                        type : 'outside'
                    },
                    buttons : {}
                },

                afterLoad : function() {
                    this.title = ' ' + (this.index + 1) + ' / ' + this.group.length + (this.title ? ' - ' + this.title : '');
                }
        });



        //fancy



        //list kernes

        $('.js_btn_open').on('click', function(){
            $(this).parent('.js_figure').next('.list').slideToggle();
        });


        //list kernes


        //resize video

            $( 'body' ).responsiveVideo();

        //resize video





        /*каталог аккордион footer*/

                    $("#footer ul").each(function(){
                        i = 0  ;
                        filter_count = $(this).find("li").length;
                        $(this).find("li").each(function(){
                          i++;
                          if(i == 5 && filter_count > 5)
                            $(this).append("<div class='more-label'>"+$('#footer').attr('data-show')+" ("+filter_count+")</div>");
                          if(i > 5)
                            $(this).hide();
                        });
                    });

                     

                    $(document).on("click", ".more-label", function(e){ 
                        $(this).parents("#footer ul").find("li").show(300);
                        $(this).parents("#footer ul").append("<div class='more-label_up'>"+$('#footer').attr('data-hide')+"</div>");
                        $(this).remove();
                          return false;
                    });

                      
                    $(document).on("click", ".more-label_up", function(e){ 
                        console.log('1111');
                        filter_count = $(this).parent("#footer ul").find("li").length;
                        $(this).parent("#footer ul").find("li:eq(4)").append("<div class='more-label'>"+$('#footer').attr('data-show')+" ("+filter_count+")</div>");
                        $(this).parent("#footer ul").find("li:gt(4)").hide(300);  
                        $(this).remove(); 
                    });

                /*каталог аккордион footer*/


        //$('.container_post').find('br').remove('br');

    $('.js_foget_').on('click',function() {
        $('#remember').val($('#mobile').val());
        $('.js_foget_password').slideToggle();        
        return false;
    })
    $("[data-active]").each(function(){
      _ids = $(this).attr("data-active").split(",");
      for (_i in _ids) {
         _option = $(this).find("option[value='"+_ids[_i]+"']");
         _option.prop("selected", true);
      }
      $(this).selectpicker('refresh');
    });



    //start open block e

    $('.e-cite__drop').on('click', function(){
        $(this).find('ul').slideToggle();
        
    });



    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        $('.js_selectpicker').selectpicker('mobile');
    }
    $('.js_selectpicker').selectpicker('refresh');
    if($('.select-list').length){
    	$('.select-list').select2({
		 
			minimumResultsForSearch: -1,
			width: '100%'
		});
    }
	



    // $(document).on('click', '[data-normalized-text]', function(){
    //     alert('select');
    // });

    // $(document).on('click', '.dropdown-menu', function(){
    //     alert('select02');
    // });

});



//validation

// function validate(form){
//     var error_class = "error";
//     var norma_class = "pass";
//     var item        = form.find("[required]");
//     var e           = 0;
//     var reg         = undefined;
//     var pass        = form.find('.password').val();
//     var pass_1      = form.find('.password_1').val();
//     function mark (object, expression) {
//         if (expression) {
//             object.parent('label').addClass(error_class).find('.text_error').css('display','block');
//             e++;
//         } else
//             object.parent('label').addClass(norma_class).removeClass(error_class).find('.text_error').css('display','none');
//     }
//     item.each(function(){
//         switch($(this).attr("data-validate")) {
//             case undefined:
//                 mark ($(this), $.trim($(this).val()).length == 0);
//             break;
//             case "email":
//                 reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
//                 mark ($(this), !reg.test($.trim($(this).val())));
//             break;
//             case "phone":
//                 reg = /[0-9 -()+]{5}$/;
//                 mark ($(this), !reg.test($.trim($(this).val())));
//             break;
//             case "pass":
//                 reg = /^[a-zA-Z0-9_-]+$/;
//                 mark ($(this), !reg.test($.trim($(this).val())));
//             break;
//             case "pass1":
//                 mark ($(this), pass_1 != pass);
//             break;
//             default:
//                 reg = new RegExp($(this).attr("data-validate"), "g");
//                 mark ($(this), !reg.test($.trim($(this).val())));
//             break
//         }
//     })
//     if ($('.js_valid_select').length) {
//         if ($('.js_valid_select option:selected').val() == "") {
//             $('.js_valid_select').parent('label').addClass(error_class).find('.text_error').css('display','block');
//             e==1;
//         } else {
//             $('.js_valid_select').parent('label').addClass(norma_class).removeClass(error_class).find('.text_error').css('display','none');
//         }
//     }
//     if (e == 0) {
//         return true;
//     }
//     else {
//         form.find("."+error_class+" input:first").focus();
//         return false;
//     }
// }

function validate(form){
    var error_class = "error";
    var norma_class = "pass";
    var item        = form.find("[required]");
    var e           = 0;
    var reg         = undefined;
    var pass        = form.find('.password').val();
    var pass_1      = form.find('.password_1').val();
    function mark (object, expression) {
        if (expression) {
            object.parents('label').addClass(error_class).find('.text_error:not(.user_exist)').css('display','block');
            e++;
        } else
            object.parents('label').addClass(norma_class).removeClass(error_class).find('.text_error:not(.user_exist)').css('display','none');
    }
    item.each(function(){        
        switch($(this).attr("data-validate")) {
            case undefined:
                mark ($(this), $.trim($(this).val()).length == 0);
            break;
            case "minStr":
                reg = /^[\/\'"?!,.:А-Яа-яёЁЇїІіЄєҐґa-zA-Z_0-9\s-]{3,2000}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            case "email":
                reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            case "phone":
                reg = /\+38\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            case "phone_user":
                reg = /\+38\s\(\d{3}\)\s\d{3}\-\d{2}\-\d{2}/;
                _this = $(this);
                mark (_this, !reg.test($.trim(_this.val())));
                if(reg.test($.trim(_this.val())))
                    $.ajax({type:'POST',cache:false,url:'/',data:"ajax=check_user&username="+encodeURI(_this.val()),dataType:'json',success:function(json){                                        
                        if(json.status == false){                                                    
                            e++;
                            _this.parent('label').addClass(error_class).find('.user_exist').css('display','block');                            
                        }
                        else{
                            _this.parent('label').addClass(norma_class).removeClass(error_class).find('.user_exist').css('display','none');                            
                        }
                    }});
            break;
            case "pass":
                reg = /^[a-zA-Z0-9_-]{6,12}$/;
                mark ($(this), !reg.test($.trim($(this).val())));
            break;
            case "check":       
                mark ($(this), !$(this).is(":checked"));
            break;
            case "select":            
                mark ($(this), $(this).find('option:selected').val() == -1);
            break;
            case "pass1":
                mark ($(this), pass_1 != pass);
            break;
            default:
                reg = new RegExp($(this).attr("data-validate"), "g");
                mark ($(this), !reg.test($.trim($(this).val())));
            break
        }
    })

    if ($('.js_valid_select').length) {
        if ($('.js_valid_select option:selected').val() == "") {
            $('.js_valid_select').parent('label').addClass(error_class).find('.text_error').css('display','block');
            e==1;
        } else {
            $('.js_valid_select').parent('label').addClass(norma_class).removeClass(error_class).find('.text_error').css('display','none');
        }
    }
    if (e == 0) {
        return true;
    }
    else {
        form.find("."+error_class+" input:first").focus();
        return false;
    }
}

//validation




//responsive video
    

( function($) {
    $.fn.responsiveVideo = function() {
        // Add CSS to head
        $( 'head' ).append( '<style type="text/css">.responsive-video-wrapper{width:100%;position:relative;padding:0}.responsive-video-wrapper iframe,.responsive-video-wrapper object,.responsive-video-wrapper embed{position:absolute;top:0;left:0;width:100%;height:100%}</style>' );

        // Gather all videos
        var $all_videos = $(this).find( 'iframe[src*="player.vimeo.com"], iframe[src*="youtube.com"], iframe[src*="youtube-nocookie.com"], iframe[src*="dailymotion.com"],iframe[src*="kickstarter.com"][src*="video.html"], object, embed' );

        // Cycle through each video and add wrapper div with appropriate aspect ratio if required
        $all_videos.not( 'object object' ).each( function() {
            var $video = $(this);

            if ( $video.parents( 'object' ).length )
                return;

            if ( ! $video.prop( 'id' ) )
                $video.attr( 'id', 'rvw' + Math.floor( Math.random() * 999999 ) );

            $video
                .wrap( '<div class="responsive-video-wrapper" style="padding-top: ' + ( $video.attr( 'height' ) / $video.attr( 'width' ) * 100 ) + '%" />' )
                .removeAttr( 'height' )
                .removeAttr( 'width' );
        } );
    };
} )(jQuery);


//responsive video


// open hid form
    $(document).ready(function () {
        if ($('.js-show-hid-el').length) {
           $(document).on('click', '.js-show-hid-el', function () {
                $(this).toggleClass('active');
                if ($(this).hasClass('active')) {
                    $(this).closest('.warning-block').find('.warning-block__form').slideDown();
                    $(this).closest('.warning-block').find('.warning-block__form textarea.required').prop('required', true);
                } else {
                    $(this).closest('.warning-block').find('.warning-block__form').slideUp();
                    $(this).closest('.warning-block').find('.warning-block__form textarea.required').prop('required', false);
                    $(this).closest('.warning-block').find('.control-label').removeClass('error');
                }
            })
        }
    });
// open hid form



