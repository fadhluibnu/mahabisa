<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Show the dashboard page
     */
    public function index()
    {
        return Inertia::render('Dashboard/Dashboard');
    }
}
