
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
    Schema::create('portfolios', function (Blueprint $table) {

        $table->id();

        $table->string('title');

        $table->string('slug')->unique();

        $table->longText('description');

        $table->string('client_name');

        $table->string('location');

        $table->year('year');

        $table->string('category');

        $table->string('before_image_path')->nullable();
$table->string('after_image_path')->nullable();

        $table->timestamps();

        $table->softDeletes();

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolios');
    }
};
