<?php
$IP=$_POST['IP'];
exec('ping -c 4 '.$IP,$info);
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Ping</title>
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script>
  var ip =((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?);
  function check(id, reg){
  	var value = $("#" + id).val();
  	if (reg.test(value) ){
  		$("#" + id).css("background","green"); 
  		return true;
  	}else{
  		$("#" + id).css("background","red"); 
  		return false;
  	}
  }
  </script>
</head>
<body>
    <form action="index.php" method="post" id="f1">
    <p><label for="ip">IP</label><input maxlength="15" type="text" id="IP" name="IP"  onKeyUp="check('IP', reg_login)" onBlur="check('IP', ip)"></p>
    <p><button id="ping" >Ping</button></p>
        </form>
        <script>
        $("#f1").submit(function(){
        	if(check('IP', ip))
        	{
        		return true;
        	}else{
        		alert('Проверьте правильность данных!!');
        		return false;
        	}
        });
        </script>
        <output>
                <? foreach($info as $key => $value)
  {
     echo "$value <br />";
  }  ?>

        </output>
</body>
</html>
