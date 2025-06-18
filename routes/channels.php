<?php

use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Private chat channel between two users
Broadcast::channel('chat.{senderId}.{recipientId}', function ($user, $senderId, $recipientId) {
    return (int) $user->id === (int) $senderId || (int) $user->id === (int) $recipientId;
});

// Private notification channel for individual users
Broadcast::channel('notifications.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});

// Private user channel for message counts and other user-specific events
Broadcast::channel('user.{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId;
});
