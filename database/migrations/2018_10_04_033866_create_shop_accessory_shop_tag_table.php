<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopAccessoryShopTagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_accessory_shop_tag', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('shop_accessory_id')->unsigned();
            $table->integer('shop_tag_id')->unsigned();
            $table->timestamps();

            $table->foreign('shop_accessory_id')->references('id')
                                              ->on('shop_accessories')
                                              ->onUpdate('cascade')
                                              ->onDelete('cascade');

            $table->foreign('shop_tag_id')->references('id')
                                              ->on('shop_tags')
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
        Schema::dropIfExists('shop_accessory_shop_tag');
    }
}
