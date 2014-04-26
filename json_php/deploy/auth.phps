<?php
define("PASS", "xxx");
define("FLAG", "xxx");

if (!isset($_POST['type']) || !isset($_POST['data'])) exit('Wrong post!');

if ($_POST['type'] == 'auth') {
	$data = json_decode($_POST['data'], true);
	if ($data['user'] == 'admin' && $data['pass'] == PASS) {
		echo FLAG;
	} else {
		echo 'Wrong user name or password!';
	}
} else {
	echo 'Wrong type!';
}
?>