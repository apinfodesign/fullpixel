# fullpixel - a PCS demonstration project

A big stack of screen filling images (mixed with users’ story texts and ads).

System Requirements

	brew install imagemagick

	brew install graphicsmagick

	npm install  

	gulp - to run the server locally

	Database setup

		create mongo database - use DBName

		Remove collection - db.collectionName.remove({})

		import to a collection - 

			mongoimport --db dbName --collection collectionName --file /absolutePath/fileName.json

	


Project Goals and Outline

We will...

	... serve the right size image to the right screen. 

	... preload so the user rarely waits for next image.
	
	... assume but not require full screen use.
	
	... provide a beautiful, super-simple user interface for photo viewing and sharing.

View Modes

1  Non-registered user front page  >>> fullpix.com

2  Non-registered user with specific url front page >>> fullpix.com/someuser

3  All-users - Fullscreen slideviewer, after first page....   fullpix.com/someuser

	First user page includes public user profile

	Second and subsequent pages are picture viewing pages (full screen or in browser viewing)
 
4  Registered (logged in) user dashboard  >>> fullpix.com/someuser/dashboard
	(forthcoming)	

	Upload and edit picture display modes

	Edit user profile  





