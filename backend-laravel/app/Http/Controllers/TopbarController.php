<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TopbarController extends Controller
{
    public function index (){
        return response()->json([
            'welcome_message' => 'Welcome to Ecomart in Your Dream Online Store!',
            'links' => [
                'seller_apply' => '/seller/apply',
                'faq' => 'Need Help',
                'contact' => 'Contact Us',
            ],
        ]);
    }
}
