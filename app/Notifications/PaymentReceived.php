<?php

namespace App\Notifications;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentReceived extends Notification implements ShouldQueue
{
    use Queueable;

    protected $order;
    protected $payment;

    /**
     * Create a new notification instance.
     *
     * @param Order $order
     * @param Payment $payment
     */
    public function __construct(Order $order, Payment $payment)
    {
        $this->order = $order;
        $this->payment = $payment;
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
            ->subject('Payment Received - Order #' . $this->order->order_number)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Great news! We have received payment from the client for your order #' . $this->order->order_number . '.')
            ->line('Amount: Rp ' . number_format($this->order->amount, 0, ',', '.'))
            ->line('This amount will be credited to your account balance once the order is completed.')
            ->action('View Order', url('/freelancer/orders/' . $this->order->id))
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
            'payment_id' => $this->payment->id,
            'payment_amount' => $this->payment->amount,
            'title' => 'Payment Received',
            'message' => 'You have received payment for order #' . $this->order->order_number . ' amounting to Rp ' . number_format($this->order->amount, 0, ',', '.'),
        ];
    }
}
