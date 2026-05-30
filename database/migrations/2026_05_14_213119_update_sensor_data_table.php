<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sensor_data', function (Blueprint $table) {

    $table->float('temp_pakan')->nullable();

    $table->float('hum_pakan')->nullable();

    $table->float('temp_udara')->nullable();

    $table->float('hum_udara')->nullable();

    $table->float('intensitas_cahaya')->nullable();

});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
