var db = require('./db');

var ImgMeta = db.model('ImgMeta', {
    


	userid : {
    	type : Number
    	// required : true     PLEASE HANDLE ME LATER IN CONTROLLER
    },
	    path : {
	    	type : String
	    	// trim : true,
	    	// unique: true
	    	// required : true   PLEASE HANDLE ME LATER
	    },
	    title : {
    		type : String	
    	},
	    caption : {
	    	type : String
	    },
	    tags : {
	    	type : String
	    },
	    	camera: {
	    		type: String
	    	},
	    	shutter: {
	    		type: String
	    	},
	  	    aperture: {
	    		type: String
	    	},
	    	iso: {
	    		type: String
	    	},
	    	date: {
	    		type: String // change to date later and handle error
	    	},
	    		lat: {
	    			type: String
	    		},
	    		latRef: {
	    			type: String
	    		},
	    		lon: {
	    			type: String
	    		},
	    		lonRef: {
	    			type: String
	    		}
});

module.exports = ImgMeta;