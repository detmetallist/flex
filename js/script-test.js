$(document).ready(function(){
	var width_razn=($(document).width()-$(".test_item").width())/2;
	$(".test_item").css("margin-left",width_razn).css("margin-right",width_razn);
	var col_tochek=$(".test_item").length;
	var tochki_html="";
	for(var i=1;i<=col_tochek;i++){
		tochki_html+='<div class="test_tochka"></div>';
	}
	$(".test_tochki").html(tochki_html);
	$(".test_tochka").eq(0).addClass('tochka_active');
	var test_et=0;
	var margin=0;
	var nazhali=0;
	$(".test_item_bottom button").click(function(){
		var input_name_val=$("input[name='user_name']").val();
		var input_phone_val=$("input[name='user_phone']").val();
		if(test_et==0||(test_et==1&&nazhali==1)||test_et==2||(test_et==3&&nazhali==1)||test_et==4||(test_et==5&&nazhali==1)||(test_et==6&&input_name_val!=""&&input_phone_val!="")){
			if(test_et<col_tochek-1){
				test_et+=1;
				if($(window).width()>=1024){
					margin=-100*test_et;
					$(".test_container").animate({"margin-left":margin+"vw"},300);
				} else {
					$(".test_item").eq(test_et-1).fadeOut(400);
					$(".test_item").eq(test_et).fadeIn(400);
				}
				$(".test_tochka").eq(test_et).addClass('tochka_active');
				$(".test_tochka").eq(test_et-1).removeClass('tochka_active');
				nazhali=0;
			}
		} else if(test_et!=6){
			alert("Вы забыли выбрать вариант ответа!");
		} else {
			alert("Вы не заполнили поля формы");
		}
		
	});
	$(".test_item_bottom ul li").click(function(){
		$(".test_item_bottom ul li").css("background-image","url(images/tochka.png)");
		$(this).css("background-image","url(images/tochka_active.png)");
		nazhali=1;
	});
	$("form").submit(function(){
		var th = $(this);
			$.ajax({
				type: "POST",
				url: "send.php", //Change
				data: th.serialize()
			}).done(function() {
				
			});
		return false;
	});
});