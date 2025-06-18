<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Broadcast;
use Pusher\Pusher;

class TestPusherCommand extends Command
{
    protected $signature = 'test:pusher';
    protected $description = 'Test Pusher configuration and connection';

    public function handle()
    {
        $this->info('Testing Pusher configuration...');

        // Check broadcast driver configuration
        $driver = config('broadcasting.default');
        $this->info("Broadcast driver: $driver");

        if ($driver !== 'pusher') {
            $this->warn('Broadcast driver is not set to pusher. Set BROADCAST_DRIVER=pusher in .env');
            return;
        }

        // Check Pusher configuration
        $config = config('broadcasting.connections.pusher');
        $this->info('Pusher config: ' . json_encode($config, JSON_PRETTY_PRINT));

        // Check if Pusher class exists
        if (!class_exists('Pusher\Pusher')) {
            $this->error('Pusher\Pusher class not found. Run composer require pusher/pusher-php-server');
            return;
        }
        
        $this->info('Pusher\Pusher class found!');

        // Try to create a Pusher instance
        try {
            $pusher = new Pusher(
                $config['key'],
                $config['secret'],
                $config['app_id'],
                $config['options'] ?? []
            );
            
            $this->info('Successfully created Pusher instance!');
            
            // Try to trigger a test event
            $response = $pusher->trigger('test-channel', 'test-event', ['message' => 'Hello World!']);
            $this->info('Test event triggered. Response: ' . json_encode($response));
            
        } catch (\Exception $e) {
            $this->error('Error with Pusher: ' . $e->getMessage());
        }
    }
}
