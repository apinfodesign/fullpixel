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
}); // end ImgMeta model







//     userid : {
//     	type : Number
//     	// required : true     PLEASE HANDLE ME LATER IN CONTROLLER
//     },
//     title : {
//     	type : String	
//     },
//     meta: {

// 	    path : {
// 	    	type : String,
// 	    	trim : true,
// 	    	unique: true
// 	    	// required : true   PLEASE HANDLE ME LATER
// 	    },
// 	    caption : {
// 	    	type : String
// 	    },
// 	    tags : {
// 	    	type : String
// 	    },
// 	    exif : {
// 	    	camera: {
// 	    		type: String
// 	    	},
// 	    	shutter: {
// 	    		type: String
// 	    	},
// 	  	    aperture: {
// 	    		type: String
// 	    	},
// 	    	iso: {
// 	    		type: String
// 	    	},
// 	    	date: {
// 	    		type: Date
// 	    	},
// 	    	location: {
// 	    		lat: {
// 	    			type: String
// 	    		},
// 	    		latRef: {
// 	    			type: String
// 	    		},
// 	    		lon: {
// 	    			type: String
// 	    		},
// 	    		lonRef: {
// 	    			type: String
// 	    		}
// 	    	} // end location
// 	    } // end exif
// 	} // end meta
// }); // end ImgMeta model


module.exports = ImgMeta;