var db = require('./db');

var ImgMeta = db.model('ImgMeta', {
        username: {type: String, required: true},
	    path:     {type: String, required: true},
	    title:    {type: String},
	    caption:  {type: String},
	    tags:     {type: String},
        camera:   {type: String},
        shutter:  {type: String},
        aperture: {type: String},
        iso:      {type: String},
        date:     {type: String},
        lat:      {type: String},
        latRef:   {type: String},
	    lon:      {type: String},
	    lonRef:   {type: String}
});

module.exports = ImgMeta;