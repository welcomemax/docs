<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
