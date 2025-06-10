<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Service;

// Periksa jika Service model memiliki fillable property yang mencakup 'revisions'
$service = new Service();
$fillable = $service->getFillable();

echo "Current fillable properties in Service model:\n";
print_r($fillable);

// Jika 'revisions' belum ada di fillable, kita perlu menambahkannya
if (!in_array('revisions', $fillable)) {
    echo "\nAdding 'revisions' to Service model...\n";
    
    $service_file = app_path('Models/Service.php');
    $content = file_get_contents($service_file);
    
    // Mencari property $fillable
    if (preg_match('/protected\s+\$fillable\s*=\s*\[(.*?)\];/s', $content, $matches)) {
        $current_fillable = $matches[1];
        $new_fillable = $current_fillable;
        
        // Tambahkan 'revisions' jika belum ada
        if (strpos($current_fillable, "'revisions'") === false) {
            if (substr(trim($current_fillable), -1) === "'") {
                $new_fillable .= ", 'revisions'";
            } else {
                $new_fillable .= "'revisions'";
            }
        }
        
        $updated_content = str_replace($matches[0], "protected \$fillable = [$new_fillable];", $content);
        file_put_contents($service_file, $updated_content);
        
        echo "Service model updated successfully!\n";
    } else {
        echo "Could not find \$fillable property in Service model.\n";
    }
} else {
    echo "\n'revisions' already in Service model fillable property.\n";
}

echo "\nDone checking and fixing Service model.\n";