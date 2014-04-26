<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Hungary</title>
    </head>
    <body>
        <?php
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $ip = $_SERVER['HTTP_CLIENT_IP'];
        } else {
            $ip = $_SERVER['REMOTE_ADDR'];
        }

        $f = file_get_contents("http://ipgeobase.ru:7020/geo?ip=" . $ip);
        preg_match("#<country>(.*?)</country>#si", $f, $country);

        if ($country[1] == 'HU') {
            die("QCTF_RaBUJaKuSEpaSiLEvUvecEPYfemUkUpA");
        } else {
            die("Этот сайт доступен только из определенной страны.");
        }
        ?>
    </body>
</html>