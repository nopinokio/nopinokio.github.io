(function($, $document, $window){

	var ui = {};

	ui.pageSet = {
		init : function(){
			this.sticky();
			this.SlideDownEventLisner();
			if(!ui.pageSet.isIE()=="8"){
				this.BtnReppleEffect();
				
			} else {
				
			}			
		},
		isIE :function(){
			var myNav = navigator.userAgent.toLowerCase();
			return (myNav.appName == 'Netscape' && myNav.userAgent.search('Trident') != -1 || myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		},
		sticky: function(){
			var $header = $('.js_header'),
				$subWrap = $('#cSub'),
				$offSet = $subWrap.outerHeight() - 50;
		    if ($(window).scrollTop() > $offSet){
		        $header.addClass("sticky_on");
		    }
		    else{
		        $header.removeClass("sticky_on");
		    }
		},
		BtnReppleEffect: function(){
			$(".ripple_e").mousedown(function (e) {
				$(".ripple").remove();
				var posX = $(this).offset().left,
					posY = $(this).offset().top,
					buttonWidth = $(this).width(),
					buttonHeight =  $(this).height();

				$(this).prepend('<span class="ripple"></span>');
				if(buttonWidth >= buttonHeight) {
					buttonHeight = buttonWidth;
				} else {
					buttonWidth = buttonHeight; 
				}
				var x = e.pageX - posX - buttonWidth / 2;
				var y = e.pageY - posY - buttonHeight / 2;

				// $(".ripple").css({
				// 	width: buttonWidth,
				// 	height: buttonHeight,
				// 	top: y + 'px',
				// 	left: x + 'px'
				// }).addClass("rippleEffect");
			});
		},
		scrSet: function(){
			var target = '.scr_area';
			$(target).customScrollbar({
				updateOnWindowResize:true,
				swipeSpeed:3
			});
		},
		visualParallax: function(){
			var $winScroll = $(window).scrollTop();
				$subWrap = $('#cSub'),
				$viewCont = $('#contents');
			if($subWrap.length > 0){
				var scr = $winScroll/2,
					headHeight = $subWrap.outerHeight(),
					HeadOffset = $subWrap.offset().top,
					range = 200;

				if ($(window).scrollTop() < headHeight){
			        $subWrap.css('top', -scr+'px');
			    } 
			    var offset = HeadOffset + headHeight / 2;
			    var calc = 1 - ($winScroll - offset + range) / range;
				/*
			    $subWrap.css({ 'opacity': calc });
			    if ( calc > '1' ) {
			      $subWrap.css({ 'opacity': 1 });
			    } else if ( calc < '0' ) {
			      $subWrap.css({ 'opacity': 0 });
			    }
			    */
			    $viewCont.css('padding-top', headHeight+'px');	
			    $('.cont_container').addClass('view');
			}
		},
		visualElementSet: function(){
			var $subWrap = $('#cSub');

			//$('#contents').prepend($subWrap);
			//$('#cSub, #cMain').wrapAll('<article></article>');
			$subWrap.fadeIn('fast');
		},
		SlideDownAnimate : function (href){
			var Positions = $(href).offset().top;
			$("body,html").stop().animate({
				scrollTop : Positions - $("#brandHead").height()
			},650)
		},
		SlideDownEventLisner : function (){
			$(".js_scroll_down").click(function(){
				var $href = $(this).attr("href");
				ui.pageSet.SlideDownAnimate($href);
				return false;
			});
		}
	},
    ui.FrameResize = {
        allVideos : "iframe[src^='//player.vimeo.com'], iframe[src^='//www.youtube.com'], object, embed, iframe[src^='http://www.youtube.com'], iframe[src^='https://www.youtube.com'], iframe[src^='http://videofarm.daum.net'], iframe[src^='https://videofarm.daum.net'], iframe[src^='//videofarm.daum.net'], iframe[src^='http://tv.kakao.com'], iframe[src^='http://serviceapi.rmcnmv.naver.com']",
        fluidEl : ".article",
        init : function(){
            var _this = this;
            $(_this.allVideos).each(function(){
                $(this)
                // jQuery .data does not work on object/embed elements
                    .attr('data-aspectRatio', this.height / this.width)
                    .removeAttr('height')
                    .removeAttr('width');
            });
        },
        event : function(){
            var _this = this;
            var newWidth = $(_this.fluidEl).width();
             $(_this.allVideos).each(function(){
                var $el = $(this);
                $el
                    .width(newWidth)
                    .height(newWidth * $el.attr('data-aspectRatio'));
             });
        }
    },
	ui.SearchBar = {
		init: function(){
			this.btnToggle();
		},
		btnToggle: function(){
			var btSearch = '.tit_util .btn_search',
				btClose = '.wrap_search .btn_close';

			$(btClose).click(function(){
				if($('body').hasClass('is_search_open')){
					$('body').removeClass('is_search_open');
					$('.wrap_search').removeClass('keyword_on');
					$('.ins-search-input').val('');
				}
			});

			$(btSearch).click(function(){
				
				if($('body').hasClass('is_search_open')){
					$('body').removeClass('is_search_open');
					$('.wrap_search').removeClass('keyword_on');
					$('.ins-search-input').val('');
				} else if($('body').hasClass('is_search_mini')){
					$('body').removeClass('is_search_mini');
					$('.wrap_search').removeClass('keyword_on');
					$('.ins-search-input').val('');
				} else {
					$('body').addClass('is_search_open');
					$('.search_block input:text').focus();
					$('.search_block input:text').select();
				}
				
			});
		}
	},
	ui.sideMenuSet = {
		init: function(){
			this.navigation();
			this.naviGenerate();
			this.depthMenu();
			this.asideNews();
		},
		navigation: function(){
			var gnbBtn = '.gnb_comm .btn_menu, .gnb_comm .btn_close',
				gnbClose = '.gnb_comm .btn_close',
				gnbDimmed = '.gnb_comm .dimmed_menu',
				headerIn = '#header .gnb_comm';

			$(gnbBtn).click(function(){
				var $winHeight = $(window).height();

				if($('body').hasClass('is_menu_open')){
					$('body').removeClass('is_menu_open');
					$('body').removeAttr("style");
					$(gnbDimmed).remove();
				} else {
					$('body').addClass('is_menu_open');
					$('body').css({
						height: $winHeight+"px"
					});
					$('<div>').addClass('dimmed_menu').html('').appendTo(headerIn);
				}
				ui.sideMenuSet.dimmedClose();
			});
			
		},
		dimmedClose: function(){
			var target = '.gnb_comm .dimmed_menu';
			$(target).click(function(){
	            if($('body').hasClass('is_menu_open')){
					$('body').removeClass('is_menu_open');
					$('body').removeAttr("style");
					$(target).remove();
				}
	        });
		},
		naviGenerate: function(){
			
			$('.sub-list').each(function(i) {
				 $(this).find('.sub-list-count').each(function() {
				 	$(this).appendTo($(this).prev());
				 });
				 $(this).find('.sub-list-child').each(function() {
				 	$(this).parent().addClass('depth_child');
				 });
			});

			// 메뉴생성
			/*
			var MenuTarget = '.tt_category';
				eleMenu01 = '<li><a href="#none" class="link_tit">HOME</a></li>',
				eleMenu02 = '<li><a href="#none" class="link_tit">TAG</a></li><li><a href="#none" class="link_tit">GUEST BOOK</a></li><li><a href="#none" class="link_tit">RSS</a></li>';
			$(MenuTarget).prepend(eleMenu01);
			$(MenuTarget).append(eleMenu02);
			*/

			// Depth Check
			var is1Depth = '.link_tit + .sub-list',
				is2Depth = '.sub-list-link + .sub-list-child',
				arrowButton = '<button type="button" class="btn_spread ripple_e"><span class="screen_out">Open/Close</span></button>'
			$(is1Depth).parent('li').find('.link_tit').addClass('is_sub').after(arrowButton);
			$('.link_tit').siblings('.btn_spread').addClass('is_active');
			$(is2Depth).parent('.depth_child').find('>.sub-list-link').after(arrowButton);

			//$(MenuTarget + ' li:nth-child(2)').find('.link_tit').textContent = "CATEGORY";

			// Depth Open/Close Check
			var spreadCheck = 1, // 0 -> Close, 1 -> Open
				depthCate = '.tt_category .sub-list',
				depthBtns = '.tt_category .sub-list .btn_spread';				
			if(spreadCheck == true){
				$(depthCate).addClass('is_spread');
				$(depthBtns).addClass('is_active');
				$(depthCate).parent('li').find('.link_tit').addClass('on');
			}
		},
		depthMenu: function(){
			var outerWrap = '.tt_category';
				depthEle = '.tt_category .sub-list';
				depth2 = '.sub-list-child';
			if($(depthEle).hasClass('is_spread')){
				$(depth2).css('display', 'block');
			} else {
				$(depth2).css('display', 'none');
			}
	        $(depthEle).on('click', 'li > .btn_spread', function(e) {
	            e.preventDefault();
	            $(this).toggleClass('is_active').siblings('.sub-list-child').slideToggle('fast');
	        });
	        $(outerWrap).on('click','.link_tit + .btn_spread', function(e){
	        	e.preventDefault();
	        	$(this).toggleClass('is_active').siblings('.sub-list').slideToggle('fast');
	        	$(this).parent('li').find('.link_tit').toggleClass('on');
	        });
		},
		asideNews: function(){
			var asideBtn = '.util_comm .btn_type1, .page_side .btn_close',
				asideDimmed = '.dimmed_aside',
				wrapIn = '#wrap';

			$('.archive-list').each(function(i) {
				 $(this).find('.archive-list-count').each(function() {
				 	$(this).appendTo($(this).prev());
				 });
			});
			$('.tag-list').each(function(i) {
				 $(this).find('.tag-list-count').each(function() {
				 	$(this).appendTo($(this).prev());
				 });
			});

			$(asideBtn).click(function(){
				var $winHeight = $(window).height();

				if($('body').hasClass('is_aside_open')){
					$('body').removeClass('is_aside_open');
					$('body').removeAttr("style");
					$(asideDimmed).remove();
				} else {
					$('body').addClass('is_aside_open');
					$('body').css({
						height: $winHeight+"px"
					});
					$('<div>').addClass('dimmed_aside').html('').appendTo(wrapIn);
				}
				ui.sideMenuSet.asideClose();
			});
		},
		asideClose: function(){
			var target = '.dimmed_aside';
			$(target).click(function(){
	            if($('body').hasClass('is_aside_open')){
					$('body').removeClass('is_aside_open');
					$('body').removeAttr("style");
					$(target).remove();
				}
	        });
		},
	},
	ui.toggleDisplay = {
		selector: '.js_toggle_display',
		init: function(){
			var _this = this;
			$document
				.delegate(_this.selector, 'click', function(e){
					var $this = $(this),
						$target = $(this.hash),
						$dataTarget = $this.attr('data-target');

					e.preventDefault();

					if( $this.attr('href') !== undefined ){
						_this.hrefToggle($this, $target);
					} else {
						_this.dataToggle($this, $dataTarget);
					}
					
					if($dataTarget = 'searchBox'){
						$('#'+$dataTarget).find('.inp_text').focus();
					}
				});
		},
		hrefToggle: function($this, $target){
			if( $this.hasClass('is_active') ){
				$target.slideUp(100);
				$this.removeClass('is_active');
			}else{
				$target.slideDown(100);
				$this.addClass('is_active');
			}
		},
		dataToggle: function($this, $dataTarget){
			if ( $this.hasClass('is_active') ){
				$('#'+$dataTarget).slideUp(100);
				$this.removeClass('is_active');
			}else{
				$('#'+$dataTarget).slideDown(100);
				$this.addClass('is_active');
			}
		}
	}

	$document.ready(function(){
		ui.pageSet.init();
		ui.SearchBar.init();
		ui.sideMenuSet.init();
        ui.FrameResize.init();
        ui.FrameResize.event();
	});

	$(window).on("scroll",function(){
		ui.pageSet.sticky();
		ui.pageSet.visualParallax();
	});
	$(window).on("resize",function(){
		ui.pageSet.sticky();
		ui.pageSet.visualParallax();
        ui.FrameResize.event();
	});
	$(window).on('load',function(){
		ui.pageSet.BtnReppleEffect();
		ui.pageSet.scrSet();
		ui.pageSet.visualParallax();
		ui.pageSet.visualElementSet();
	});



	window.ui = ui;

}(jQuery, $(document), $(window)));