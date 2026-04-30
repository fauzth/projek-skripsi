<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MonitoringJaringanController;
use App\Http\Controllers\MonitoringKolamController;


Route::get('/', [DashboardController::class, 'index']);
Route::get('/dashboard', [DashboardController::class, 'index']);

// Route::get('/kolam', [MonitoringKolamController::class, 'index']);
Route::get('/kolam', [MonitoringKolamController::class, 'index'])
    ->name('monitoring.kolam');
Route::get('/jaringan', [MonitoringJaringanController::class, 'index']);


Route::get('/upload', fn () => Inertia::render('UploadImage'));
// Route::get('/kolam', fn () => Inertia::render('MonitorKolam'));
Route::get('/about', fn () => Inertia::render('About'));





// Route::get('/', function () {
//     return Inertia::render(component: 'Dashboard');
// });
// Route::get('/dashboard', fn () => Inertia::render('Dashboard'));
