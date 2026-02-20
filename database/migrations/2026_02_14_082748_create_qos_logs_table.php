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
        Schema::create('qos_logs', function (Blueprint $table) {
            $table->id();

            $table->float('throughput')->nullable();
            $table->float('delay')->nullable();
            $table->float('jitter')->nullable();
            $table->float('packet_loss')->nullable();

            $table->dateTime('tested_at');

            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qos_logs');
    }
};
