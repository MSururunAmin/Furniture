<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('blogs', 'content') && !Schema::hasColumn('blogs', 'body')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->renameColumn('content', 'body');
            });
        }

        if (Schema::hasColumn('blogs', 'thumbnail') && !Schema::hasColumn('blogs', 'cover_image')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->renameColumn('thumbnail', 'cover_image');
            });
        }

        if (!Schema::hasColumn('blogs', 'status')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->string('status')->default('draft');
            });

            if (Schema::hasColumn('blogs', 'is_published')) {
                DB::table('blogs')
                    ->where('is_published', true)
                    ->update(['status' => 'published']);

                Schema::table('blogs', function (Blueprint $table): void {
                    $table->dropColumn('is_published');
                });
            }
        }

        if (!Schema::hasColumn('blogs', 'user_id')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->foreignId('user_id')
                    ->nullable()
                    ->constrained()
                    ->cascadeOnDelete();
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('blogs', 'user_id')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            });
        }

        if (Schema::hasColumn('blogs', 'status') && !Schema::hasColumn('blogs', 'is_published')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->boolean('is_published')->default(false);
            });

            DB::table('blogs')
                ->where('status', 'published')
                ->update(['is_published' => true]);

            Schema::table('blogs', function (Blueprint $table): void {
                $table->dropColumn('status');
            });
        }

        if (Schema::hasColumn('blogs', 'body') && !Schema::hasColumn('blogs', 'content')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->renameColumn('body', 'content');
            });
        }

        if (Schema::hasColumn('blogs', 'cover_image') && !Schema::hasColumn('blogs', 'thumbnail')) {
            Schema::table('blogs', function (Blueprint $table): void {
                $table->renameColumn('cover_image', 'thumbnail');
            });
        }
    }
};
