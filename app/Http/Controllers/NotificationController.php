<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;
use App\Models\User;
use Kreait\Firebase\Messaging\CloudMessage;
use Kreait\Firebase\Messaging\Notification;
use Kreait\Firebase\Contract\Messaging;

class NotificationController extends Controller
{
    protected Messaging $messaging;

    public function __construct(Messaging $messaging)
    {
        $this->messaging = $messaging;
    }

    public function send()
    {
        $user = User::find(1);

        if (!$user || !$user->fcm_token) {
            return response()->json([
                'message' => 'FCM token tidak ditemukan'
            ], 404);
        }

        $message = CloudMessage::withTarget(
            'token',
            $user->fcm_token
        )->withNotification(
            Notification::create(
                'Suhu Biopond Tinggi',
                'Suhu mencapai 38°C'
            )
        );

        $this->messaging->send($message);

        return response()->json([
            'message' => 'Notifikasi berhasil dikirim'
        ]);
    }
}
