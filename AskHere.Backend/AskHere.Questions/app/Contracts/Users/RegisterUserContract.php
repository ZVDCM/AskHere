<?php

namespace App\Contracts\Users;

class RegisterUserContract
{
    public string $id;
    public string $username;
    public string $email;
    public string $password;

    public function __construct(string $id, string $username, string $email, string $password)
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
    }
}
