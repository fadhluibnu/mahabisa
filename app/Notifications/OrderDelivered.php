<?php

namespace App\Notifications;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrderDelivered extends Notification implements ShouldQueue
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
            ->subject('Deliverables Ready - Order #' . $this->order->order_number)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Good news! The freelancer has delivered your order #' . $this->order->order_number . '.')
            ->line('They have uploaded ' . $this->fileCount . ' file(s) for your review.')
            ->line('To access these files, please complete the payment first.')
            ->action('View Order and Pay', url('/client/orders/' . $this->order->id . '/payment'))
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
            'title' => 'Order Delivered',
            'message' => 'Your order #' . $this->order->order_number . ' has been delivered with ' . $this->fileCount . ' file(s). Please complete the payment to download.',
        ];
    }
}
