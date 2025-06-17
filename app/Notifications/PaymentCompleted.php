<?php

namespace App\Notifications;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentCompleted extends Notification implements ShouldQueue
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
            ->subject('Payment Successful - Order #' . $this->order->order_number)
            ->greeting('Hello ' . $notifiable->name . '!')
            ->line('Your payment for order #' . $this->order->order_number . ' has been received and processed successfully.')
            ->line('Total Amount: Rp ' . number_format($this->payment->amount, 0, ',', '.'))
            ->line('You can now download all deliverables from the order page.')
            ->action('View Order', url('/client/orders/' . $this->order->id))
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
            'payment_method' => $this->payment->payment_method,
            'title' => 'Payment Successful',
            'message' => 'Your payment for order #' . $this->order->order_number . ' has been processed successfully.',
        ];
    }
}
