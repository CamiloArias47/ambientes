<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shop_emails', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('shop_product_id');
            $table->string("product_type");
            $table->string("name");
            $table->string("mail");
            $table->string("phone");
            $table->string("message",1500);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shop_emails');
    }
}
