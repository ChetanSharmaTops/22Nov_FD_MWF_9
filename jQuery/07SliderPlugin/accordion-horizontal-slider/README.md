accordion.js
============

A slider plugin in accordion style.

Firstly, you should include the js file: 

###
    <script type="text/javascript" src="js/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="js/accordion.js"></script>
    
And then that you can create the slider now:

###
    <script type="text/javascript">
        $.as({
    		id: "demo",         //the id of the slider container
    		folder: "images",   //the images to store the slider images, default: ""
    		images: ["yam_1.jpg", "yam_2.jpg", "yam_3.jpg", "yam_4.jpg", "yam_5.jpg"],    //the images array
    		speed: 2000,        //the speed of the slider, default: 3000(ms)
    		imgWidth: 700,      //the width of the images in the plugin, default: 0.8*boxWidth
    		boxWidth: 1000,     //the width of the plugin, defalut: the width of the id
    	});
    </script>
    	
Click here to see the [demo](http://jiajunlo.github.io/accordion.js)
