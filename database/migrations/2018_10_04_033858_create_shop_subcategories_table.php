<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopSubcategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_subcategories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('shop_category_id')->unsigned();
            $table->string('name');
            $table->timestamps();
            $table->foreign('shop_category_id')->references('id')
                                               ->on('shop_categories')
                                               ->onUpdate('cascade')
                                               ->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_subcategories');
    }
}
