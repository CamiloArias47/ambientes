<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    public function up()
    {
        Schema::create('shop_products', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->longText('description');
            $table->string('meta_description',1000);
            $table->integer('shop_brand_id')->unsigned();
            $table->biginteger('price');
            $table->integer('user_id')->unsigned();
            $table->integer('shop_subcategory_id')->unsigned();
            $table->enum('showproduct',["no","si"]);
            $table->enum('showprice',["no","si"]);
            $table->timestamps();
            $table->foreign('shop_brand_id')->references('id')
                                            ->on('shop_brands')
                                            ->onUpdate('cascade')
                                            ->onDelete('cascade');
            $table->foreign('shop_subcategory_id')->references('id')
                                                  ->on('shop_subcategories')
                                                  ->onUpdate('cascade')
                                                  ->onDelete('cascade');
            $table->foreign('user_id')->references('id')
                                      ->on('users')
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
        Schema::dropIfExists('shop_products');
    }
}
