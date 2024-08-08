<?php
	error_reporting(E_ALL);
	$sendto   = "flex.kras@yandex.ru";
	$subject  = "Заявка с TheFlex";
	$headers = 'From: TheFlex <no-reply@theflex.ru>' . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html;charset=utf-8 \r\n";
	$name = $_POST['user_name']; 
	$phone = $_POST['user_phone'];		
	$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	$msg  .= "К вам поступила заявка<br>";
	$msg.=" Имя - ".$name."<br>";
	$msg.=" Телефон - ".$phone."<br>";
	$msg .= "</body></html>";
	if(mail($sendto, $subject, $msg, $headers)) {
   	 	echo "<center>Заявка отправлена!</center>";
	} else {
    	echo "<center>Заявка не отправлена!</center>";
	}
?>