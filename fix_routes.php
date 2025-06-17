<?php
// Script untuk menghapus route messages/{conversation_id} di routes/web.php

$webRoutesPath = __DIR__ . '/routes/web.php';
$routeContent = file_get_contents($webRoutesPath);

// Cari dan hapus semua route untuk client.messages.conversation
$pattern = "/\s*Route::get\('\/messages\/\{conversation_id\}',\s*\[ClientController::class,\s*'showConversation'\]\)->name\('client\.messages\.conversation'\);/";
$replacedContent = preg_replace($pattern, '', $routeContent);

// Tulis kembali ke file
file_put_contents($webRoutesPath, $replacedContent);

echo "Routes untuk client.messages.conversation telah dihapus.\n";
?>
