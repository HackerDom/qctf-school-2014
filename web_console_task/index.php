<?php
if (strpos($_SERVER["HTTP_USER_AGENT"], 'Chrome')) {
    echo "<h1>Hello</h1>";
    echo "<script src=\"generic.js\"></script>";
}
else{
    echo "<h1>Works only in Chrome</h1>";
}
?>
