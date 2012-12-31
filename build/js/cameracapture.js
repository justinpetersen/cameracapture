function CameraCapture( ) {
	
	this.canvas = null;
	this.context = null;
	this.video = null;
	this.videoObj = null;
	
	this.errorHandler = function( ) {
		console.log( "Video capture error: ", error.code );
	};
	
	this.onSnapPhotoClickHandler = function( ) {	
		this.context.drawImage( this.video, 0, 0, 640, 480 );
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
	
}

$( document ).ready( function( ) {
	
	var cameraCapture = new CameraCapture( );
	cameraCapture.init( );
	
});