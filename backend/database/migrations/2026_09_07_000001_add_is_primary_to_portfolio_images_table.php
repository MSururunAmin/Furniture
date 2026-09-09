<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('portfolio_images', 'is_primary')) {
            Schema::table('portfolio_images', function (Blueprint $table) {
                $table->boolean('is_primary')->default(false)->after('image_path');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('portfolio_images', 'is_primary')) {
            Schema::table('portfolio_images', function (Blueprint $table) {
                $table->dropColumn('is_primary');
            });
        }
    }
};
