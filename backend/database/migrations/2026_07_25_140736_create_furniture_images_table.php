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
    Schema::create('furniture_images', function (Blueprint $table) {

        $table->id();

       $table->foreignId('furniture_id')
    ->constrained('furnitures')
    ->cascadeOnDelete();
    
        $table->string('image_path');

        $table->boolean('is_primary')
            ->default(false);

        $table->timestamps();

        $table->index('furniture_id');

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('furniture_images');
    }
};
