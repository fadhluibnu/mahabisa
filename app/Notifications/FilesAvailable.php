<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FilesAvailable extends Notification implements ShouldQueue
{
    use Queueable;

    protected $order;
    protected $fileCount;

    /**
     * Create a new notification instance.
     *
     * @param Order $order
     * @param int $fileCount
     */
    public function __construct(Order $order, int $fileCount)
    {
        $this->order = $order;
        $this->fileCount = $fileCount;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Files Available for Download - Order #' . $this->order->order_number)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Great news! Your payment has been processed and your files are now available for download.')
            ->line('You can download ' . $this->fileCount . ' file(s) from your order details page.')
            ->action('View Order Files', url('/client/orders/' . $this->order->id))
            ->line('Thank you for using our platform!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'order_id' => $this->order->id,
            'order_number' => $this->order->order_number,
            'file_count' => $this->fileCount,
            'title' => 'Files Available',
            'message' => 'Your files for order #' . $this->order->order_number . ' are now available for download.',
        ];
    }
}
