$(document).ready(function(){
	var docheight=$(document).height();
	var winheight=$(window).height();
	var wintop=$(document).scrollTop();
	var rasst=0;
	var bottom=0;
	var section4_bottom=-100;
	var zvuk=0;
	var video_perekl=0;
	var scroll_delta=0;
	var videoEl = document.getElementById('video4_zvuk');
	videoEl.volume = 0;
	videoEl.currentTime = 0;
	var video_num=1;
	var video_time=0;
	var video1=document.getElementById('video1');
	var video2=document.getElementById('video2');
	var video3=document.getElementById('video3');
	video2.pause();
	video3.pause();
	video1.play();
	if($(window).width()>=1024){
		smena_video();
	}
	
	$(".section_content h1").delay(2000).fadeIn(300);
	$(".section_content h2").delay(3000).fadeIn(300);
	$(".strelka").delay(4000).fadeIn(300);
	strelka_animate();

	$(".chasti_tela_wrap").mouseover(function(){
		$(".strelka_left").stop().animate({"left":"10px"},200);
		$(".strelka_right").stop().animate({"right":"10px"},200);
	});
	$(".chasti_tela_wrap").mouseout(function(){
		$(".strelka_left").stop().animate({"left":"-40px"},200);
		$(".strelka_right").stop().animate({"right":"-40px"},200);
	});
	var screen_width=$(document).width();
	var shirirna_chasti=screen_width*0.325;
	var chasti_kol=$(".chast").length;
	var chasti_sdvig=0;
	var chasti_margin_first=parseFloat($(".chast_cont").css('margin-left'));
	$(".chasti_tela_wrap .strelka_right").click(function(){
		if(chasti_sdvig+3<chasti_kol){
			chasti_sdvig+=1;
			chasti_margin=chasti_margin_first-chasti_sdvig*shirirna_chasti;
			$(".chast_cont").animate({"margin-left":chasti_margin},200);
		};
	});
	$(".chasti_tela_wrap .strelka_left").click(function(){
		if(chasti_sdvig>0){
			chasti_sdvig-=1;
			chasti_margin=chasti_margin_first-chasti_sdvig*shirirna_chasti;
			$(".chast_cont").animate({"margin-left":chasti_margin},200);
		};
	});

	function strelka_animate(){
		$('.strelka').animate({'bottom':'15px'},500).animate({'bottom':'25px'},500);
		setTimeout(strelka_animate,1000);
	}

	function smena_video(){
		video1dur=video1.duration;
		video2dur=video2.duration;
		video3dur=video3.duration;
		if(video_num==1){
			video_time=video1.currentTime;
			if(video_time==video1dur){
				video1.pause();
				video2.currentTime=0;
				video2.play();
				$('#video1').fadeOut(500);
				$('#video2').fadeIn(500);
				video_num=2;
			}
		}
		if(video_num==2){
			video_time=video2.currentTime;
			if(video_time==video2dur){
				video2.pause();
				video3.currentTime=0;
				video3.play();
				$('#video2').fadeOut(500);
				$('#video3').fadeIn(500);
				video_num=3;
			}
		}
		if(video_num==3){
			video_time=video3.currentTime;
			if(video_time==video3dur){
				video3.pause();
				video1.currentTime=0;
				video1.play();
				$('#video3').fadeOut(500);
				$('#video1').fadeIn(500);
				video_num=1;
			}
		}
		setTimeout(smena_video,250);
	}

	$(".zvuk").click(function(){
		$('#video4').fadeOut(0);
		$('#video4_zvuk').css('display','block');
		if(video_perekl==0){
			var cur_time=$('#video4').get(0).currentTime;
			videoEl.currentTime = cur_time;
			videoEl.play();
			video_perekl=1;
		}
		$(this).toggleClass('zvuk_nazhat');
		if(zvuk==0){
			zvuk=1;
			videoEl.volume = 1;
		} else {
			zvuk=0;
			videoEl.volume = 0;
		}
	});
	$(window).on('wheel', function(event) {
		if($(window).width()>=1024){
			scroll_delta=event.originalEvent.deltaY;
			docheight=$(document).height();
			winheight=$(window).height();
			if(bottom==0){
				wintop=parseInt($(document).scrollTop());
				rasst=winheight+wintop;
				//$('.cifra_fix').html(docheight+' - '+rasst);
				if(rasst>=docheight-10){
					$('.sections').css('position','fixed').css('bottom','0');
					$('.section4').scrollTop(100);
					$('.section4').css('position','relative');
					bottom=1;
				}
			}
			if(bottom==1){
				if($(document).scrollTop()<=0&&scroll_delta<0){
					$('.sections').css('position','relative');
					$('.section4').css('position','fixed');
					$(document).scrollTop(docheight);
					bottom=0;
				} 
				//$('.cifra_fix').html(wintop+' - '+scroll_delta);
			}
		}
	});
	var CurrentScroll = 0;
	$(window).on('scroll', function(event) {
		var scorost=500;
		if($(window).width()<1024){
			$('.section1').swipe({
			  swipeUp:function(event, direction, distance, duration, fingerCount) {
			  	var destination = $('.section2').offset().top-60;
			   	$('html,body').animate( { scrollTop: destination }, scorost );
			  },
			  threshold:50
			});
			$('.section2').swipe({
			  swipeUp:function(event, direction, distance, duration, fingerCount) {
			  	var destination = $('.chasti_tela_wrap').offset().top;
			  	var rasst=$(document).scrollTop()-$('.chasti_tela_wrap').offset().top;
			  	if(rasst<-50){
			  		$('html,body').animate( { scrollTop: destination }, scorost );
			  	} else {
			  		var dest=$('.section3').offset().top;
			  		$('html,body').animate( { scrollTop: dest }, scorost );
			  	}
			  },
			  swipeDown:function(event, direction, distance, duration, fingerCount) {
			  	var destination = $('.section1').offset().top;
			   	$('html,body').animate( { scrollTop: destination }, scorost );
			  },
			  threshold:50
			});
			$('.section3').swipe({
			  swipeUp:function(event, direction, distance, duration, fingerCount) {
			  	$('.section4').animate({'top':'0vh'},scorost);
			  },
			  swipeDown:function(event, direction, distance, duration, fingerCount) {
			  	var destination = $('.chasti_tela_wrap').offset().top;
			   	$('html,body').animate( { scrollTop: destination }, scorost );
			  },
			  threshold:50
			});
			$('.section4').swipe({
			  swipeDown:function(event, direction, distance, duration, fingerCount) {
			  	$('.section4').animate({'top':'100vh'},scorost);
			  },
			  threshold:50
			});
			/*var NextScroll = $(this).scrollTop();
		    if (NextScroll > CurrentScroll){
		        scroll_delta=150;
		    }
		    else {
		        scroll_delta=-150;
		    }
		    CurrentScroll = NextScroll;  //Updates current scroll position
		    
			docheight=$(document).height();
			winheight=$(window).height();
			if(bottom==0){
				wintop=parseInt($(document).scrollTop());
				rasst=winheight+wintop;
				$('.cifra_fix').html(docheight+' - '+rasst);
				if(rasst>=docheight-60&&scroll_delta>0){
					$('.sections').css('position','fixed').css('bottom','0');
					$('.section4').scrollTop(100);
					$('.section4').css('position','relative');
					bottom=1;
				}
			}
			if(bottom==1){
				wintop=parseInt($(document).scrollTop());
				if($(document).scrollTop()<=0&&scroll_delta<0){
					$('.sections').css('position','relative');
					$('.section4').css('position','fixed');
					$(document).scrollTop(docheight);
					bottom=0;
				} 
				$('.cifra_fix').html(wintop+' - '+scroll_delta);

			}	*/
		}
	});
	$(".strelka").click(function(){
		var destination = $('.section2').offset().top-60;
	   	$('html,body').animate( { scrollTop: destination }, 1100 );
	});

});