<ul id="slide-out" class="side-nav fixed">
  		    	<li id="logoMain">
			    	<div class="user-view">
					      <div class="responsive-img">
					        <center><a href="{{route('shop')}}"><img src="{{ asset('assets/img/ambientesTienda.png') }}" style="width:100%"></a><br></center>
					      </div>
				    </div>
		        </li>
		        <li>
		        	<span class="tittles rem1-5 tittlee">Ambientes sostenibles</span>
		        </li>

		        @include('shop.layout.search')


		<ul class="container_menu">

				<li class="no-padding">
				   <ul class="collapsible " data-collapsible="expandable">
				   		@foreach($fatherC as $father)
						    <li class="bold"><a class="collapsible-header waves-effect waves-orange list"><b class="list"><i class="material-icons">@if($father->name == "Arboricultura") nature @elseif($father->name == "Paisajismo") filter_hdr @elseif($father->name == "Zonas verdes") spa @elseif($father->name == "Vivero") local_florist @endif</i>{{$father->name}}</b></a>
						    	<div class="collapsible-body">
							      	<ul class="collapsible " data-collapsible="expandable">
							      		<li><a href="{{route('shop.fathercategory',$father->id)}}" class="collapsible-header waves-effect waves-orange"><i class="tiny material-icons">play_arrow</i>Categorias</a></li>
							      		<li><a class="collapsible-header waves-effect waves-orange"><i class="tiny material-icons">add</i>Marcas</a>
							      			<div class="collapsible-body">
								      			<ul>
										      		@foreach($father->marcas as $marcas)
										      			<li>
										      				<a href="{{route('shop.allproducts_brand',$marcas['id'])}}" class="collapsible-header waves-effect waves-orange">
										      					<i class="tiny material-icons material-icon-mrg">play_arrow</i>{{$marcas["name"]}}
										      				</a>
										      			</li>
										      		@endforeach
								      			</ul>
							       			</div>
								      	</li>
							      	</ul>
							    </div>
							</li>
						@endforeach
					</ul>
				</li>

				<li class="no-padding">
				   <ul class="collapsible " data-collapsible="expandable">
					    <li class="bold" id="menuProducts"><a class="collapsible-header waves-effect waves-orange "><b class="list"><i class="material-icons">shopping_cart</i>Productos</b></a>
					    	<div class="collapsible-body" id="collapsible-body-products">
						      	<ul class="collapsible" data-collapsible="expandable">
						      		@foreach($categories as $category)
							      		<li class="bold" id="liCategory-{{$category->id}}">
							      			<a class="collapsible-header waves-effect waves-orange">
							      				<i class="tiny material-icons list">add</i>{{$category->name}}
							      			</a>
							      			<div class="collapsible-body" id="collapsible-body-category-{{$category->id}}">
							      				<ul>
							      					@foreach($category->shop_subcategories as $subcategory)
							      						<li>
							      							<a href="{{route('shop.allproducts',$subcategory->id)}}" class="collapsible-header waves-effect waves-orange">
							      								<i class="tiny material-icons material-icon-mrg">play_arrow</i>{{$subcategory->name}}
							      							</a>
							      						</li>
							      					@endforeach
							      				</ul>
							      			</div>
							      		</li>
						      		@endforeach
						      	</ul>
						    </div>
						</li>
					</ul>
				</li>

				<li class="no-padding">
				   <ul class="collapsible " data-collapsible="expandable">
					    <li class="bold" id="menuBrands"><a class="collapsible-header waves-effect waves-orange list"><b class="list"><i class="material-icons">book</i>Marcas</b></a>
					    	<div class="collapsible-body" id="collapsible-body-brands">
						      	<ul class="collapsible " data-collapsible="expandable">
						      		@foreach($brands as $brand)
							      		<li><a href="{{route('shop.allproducts_brand',$brand->id)}}" class="collapsible-header waves-effect waves-orange"><i class="tiny material-icons">play_arrow</i>{{$brand->name}}</a></li>
						      		@endforeach
						      	</ul>
						    </div>
						</li>
					</ul>
				</li>



		</ul>

</ul>
