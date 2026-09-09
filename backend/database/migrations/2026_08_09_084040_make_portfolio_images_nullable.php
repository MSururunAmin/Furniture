<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->string('before_image_path')->nullable()->change();
            $table->string('after_image_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('portfolios', function (Blueprint $table) {
            $table->string('before_image_path')->nullable(false)->change();
            $table->string('after_image_path')->nullable(false)->change();
        });
    }
};