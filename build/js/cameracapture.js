function CameraCapture( ) {
	
	this.IMAGE_WIDTH = 50;
	this.IMAGE_HEIGHT = 25;
	
	this.canvas = null;
	this.context = null;
	this.video = null;
	this.videoObj = null;
	
	this.errorHandler = function( ) {
		console.log( "Video capture error: ", error.code );
	};
	
	this.onSnapPhotoClickHandler = function( ) {
		this.context.drawImage( this.video, 0, 0, this.IMAGE_WIDTH, this.IMAGE_HEIGHT );
		this.serializePixels( );
	};
	
	this.init = function( ) {
		this.canvas = document.getElementById("canvas");
		this.context = canvas.getContext("2d");
		this.video = document.getElementById("video");
		this.videoObj = { "video": true };
		
		this.getUserMedia( );

		// Trigger photo take
		document.getElementById( "snap" ).addEventListener( "click", $.proxy( this.onSnapPhotoClickHandler, this ) );
	};
	
	this.getUserMedia = function( ) {
		if ( navigator.getUserMedia ) { // Standard
	    	navigator.getUserMedia( videoObj, function( stream ) {
				this.video.src = stream;
				this.video.play();
			}, $.proxy( this.errorHandler, this ) );
		} else if ( navigator.webkitGetUserMedia ) { // WebKit-prefixed
			navigator.webkitGetUserMedia( this.videoObj, function( stream ) {
				this.video.src = window.webkitURL.createObjectURL( stream );
				this.video.play();
			}, $.proxy( this.errorHandler, this ) );
		}
	};
	
	this.serializePixels = function( ) {
		var imageData = this.context.getImageData( 0, 0, this.IMAGE_WIDTH, this.IMAGE_HEIGHT );
		var pixels = [];
		
		for ( var y = 0; y < this.IMAGE_HEIGHT; y++ ) {
			for ( var x = 0; x < this.IMAGE_WIDTH; x++ ) {
				
				var pixelIndex = 4 * (x + y * this.IMAGE_WIDTH);
				var r = imageData.data[ pixelIndex ];     // red   color
				var g = imageData.data[ pixelIndex + 1 ]; // green color
				var b = imageData.data[ pixelIndex + 2 ]; // blue  color
				var hex = this.rgbToHex( r, g, b );
				
				pixels.push( hex );
				
			}
		}
		
		console.log( imageData.width + " x " + imageData.height );
		//alert( pixels );
		this.postPixels( pixels );
	};
	
	this.rgbToHex = function( r, g, b ) {
	    return "#" + ( ( 1 << 24 ) + ( r << 16 ) + ( g << 8 ) + b ).toString( 16 ).slice( 1 );
	};
	
	this.postPixels = function( pixels ) {
		//alert( pixels );
		$( "#pixels" ).val( pixels.toString( ) );
		var data = { username: "test user" };
		$.post( "https://script.google.com/macros/s/AKfycbx_qg4gJSl-fdoZ7LrDvz_pA7YsYlqvLp0R5AgrEw/dev", { username: "test user" } );
	};
	
}

$( document ).ready( function( ) {
	
	var cameraCapture = new CameraCapture( );
	cameraCapture.init( );
	
});