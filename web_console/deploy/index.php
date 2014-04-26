<?php
if (strpos($_SERVER["HTTP_USER_AGENT"], 'Chrome')) {
    echo <<<EOF
    <!DOCTYPE html>
<head>
<script src="generic.js"></script>
<style>
    *{margin:0;}
    html,body{height: 100%;}
    .wrapper{min-height: 100%; height: auto !important;height: 100%; margin: 0 auto -3em;
             display: flex; justify-content: center; align-items: center;}
    footer,.push{height: 2em; text-align: center; background-color: #eee; padding-top: 1em;}
    .centering{display: flex; justify-content: center; align-items: center;}
    .banner{display: flex; align-items: center; background-color: #eee; padding: 80px;
            border-radius: 20px;}
</style>
</head>
<body>
<div class="wrapper">
    <div class="banner">
        <h1>Hello, Chrome!</h1>
    </div>
    <div class="push"></div>
</div>

<footer>©Hackerdom</footer>
</body>
EOF;
}
else{
    echo "<h1 style=\"color:red;\">Works only in Chrome!</h1>";
}
?>