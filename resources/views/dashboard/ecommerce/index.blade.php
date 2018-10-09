@extends('layouts.appDashboard')
	@section('title','E-commerce')

	@section('head')
     <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/summernote-master/dist/summernote.css') }}">
     <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/summernote-master/dist/summernote-bs3.css') }}">
     <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/chosen/bootstrap-chosen.css') }}">
     <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.css') }}">
     <link rel="stylesheet" type="text/css" href="{{ asset('assets/plugins/cropperjs-master/src/css/cropper.css') }}">

	 <style type="text/css">
        #ReactRoot #loaderGif{
            text-align: center;
        }
     </style>

	@endsection()


	@section('contenido')
	        	   	<div id="ReactRoot">
									<div class="preloader-wrapper big active">
											<div class="spinner-layer spinner-blue">
												<div class="circle-clipper left">
													<div class="circle"></div>
												</div><div class="gap-patch">
													<div class="circle"></div>
												</div><div class="circle-clipper right">
													<div class="circle"></div>
												</div>
											</div>

											<div class="spinner-layer spinner-red">
												<div class="circle-clipper left">
													<div class="circle"></div>
												</div><div class="gap-patch">
													<div class="circle"></div>
												</div><div class="circle-clipper right">
													<div class="circle"></div>
												</div>
											</div>

											<div class="spinner-layer spinner-yellow">
												<div class="circle-clipper left">
													<div class="circle"></div>
												</div><div class="gap-patch">
													<div class="circle"></div>
												</div><div class="circle-clipper right">
													<div class="circle"></div>
												</div>
											</div>

											<div class="spinner-layer spinner-green">
												<div class="circle-clipper left">
													<div class="circle"></div>
												</div><div class="gap-patch">
													<div class="circle"></div>
												</div><div class="circle-clipper right">
													<div class="circle"></div>
												</div>
											</div>
										</div>
	              </div>
    @endsection()


    @section('scripts')
        <script type="text/javascript" src="{{ asset('assets/plugins/summernote-master/dist/summernote.js') }}"></script>
        <script type="text/javascript" src="{{ asset('assets/plugins/summernote-master/dist/lang/summernote-es-ES.js') }}"></script>
        <script type="text/javascript" src="{{ asset('assets/plugins/chosen/chosen.jquery.js') }}"></script>
        <script type="text/javascript" src="{{ asset('assets/plugins/bootstrap-tagsinput-latest/src/bootstrap-tagsinput.js') }}"></script>
        <!-- <script type="text/javascript" src="{{ asset('plugins/cropperjs-master/src/js/cropper.js') }}"></script> -->

        <script type="text/javascript">
            var fatherCategories = {!!$fatherCategories!!},
                brands           = {!!$brands!!},
                tags             = {!!$tags!!},
                maxUpload        = "{{$maxUpload}}",
                products         = {!!$products!!},
                defaultImg       = "{{ asset('image/ecommerce/products/default.png') }}",
								prev       			 = "{!!$prev!!}",
                routes = {}
        </script>
    	<script type="text/javascript" src="{{ asset('assets/js/components/ecommerce/compiled.min.js') }}"></script>
    @endsection()
