<div class="col s12">
    <div class="carousel carouselAlt">
      @foreach($productalt as $aleatorio)
        <a class="carousel-item carousel-main" href="{{route('shop.showproduct',$aleatorio->id)}}" target="_blank"><img src="{{asset('image/ecommerce/products/'.$aleatorio->shop_images[0]->route)}}"></a>
      @endforeach
    </div>
  </div>