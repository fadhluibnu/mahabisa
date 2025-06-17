<?php
require "vendor/autoload.php";
$app = require_once "bootstrap/app.php";
$app->make("Illuminate\Contracts\Console\Kernel")->bootstrap();

$galleries = DB::table("service_galleries")->select("service_id", "image_path", "order")->get();
print_r($galleries->toArray());

