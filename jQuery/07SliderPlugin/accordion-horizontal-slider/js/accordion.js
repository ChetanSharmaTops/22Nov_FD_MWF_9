/**
* author: Jun
* date: 2014/3/30
**/

(function(window, document) {

	function AccordionSlider(config) {
		this.id = config.id;
		this.folder = config.folder;
		this.images = config.images;
		this.speed = config.speed;
		this.boxWidth = config.boxWidth;
		this.imgWidth = config.imgWidth;
	}

	AccordionSlider.prototype = {
		constructor: AccordionSlider,
		init: function() {

			var li_node, temp_node;
			var self = this;
			var parent_node = document.getElementById(this.id);
			var container_node = document.createElement("div");
			container_node.setAttribute("class", "ac-slider-container");
			var pic_list_node = document.createElement("ul");
			pic_list_node.setAttribute("class", "ac-slider-list");

			for(var i = 0; i < this.images.length; i++) {
				li_node = document.createElement("li");
				li_node.setAttribute("class", "ac-slider-item");
				temp_node = document.createElement("img");
				temp_node.setAttribute("src", this.folder + "/" + this.images[i]);
				li_node.appendChild(temp_node);
				pic_list_node.appendChild(li_node);
			}

			container_node.appendChild(pic_list_node);
			parent_node.appendChild(container_node);
			this.run();
		},

		run: function() {
			var parent_id = "#" + this.id;
			var img_width = this.width;
			var current_pic = 0;
			var self = this;
			if(this.images.length > 1) {
				var move_pixel = this.imgWidth - (this.boxWidth - this.imgWidth) / (this.images.length - 1);
			}
			else {
				var move_pixel = 0;
			}
			$(parent_id).find(".ac-slider-container").css({"width": this.boxWidth + "px", "overflow": "hidden"});
			$(parent_id).find(".ac-slider-list").css({"width": this.imgWidth * this.images.length + "px"});
			$(parent_id).find(".ac-slider-list .ac-slider-item").css({"position": "relative", "float": "left"});
			$(parent_id).find(".ac-slider-list .ac-slider-item img").css({"width": this.imgWidth + "px", "cursor": "pointer"});

			for(var i = 2; i < this.images.length; i++ ) {
				$(parent_id).find(".ac-slider-container .ac-slider-list .ac-slider-item").eq(i).css({"left": -move_pixel * (i - 1) + "px"});
			}

			var slider_interval = setInterval(sliderPic, this.speed);

			$(parent_id).find(".ac-slider-list .ac-slider-item").mouseover(function() {
				window.clearInterval(slider_interval);
				if(current_pic <= $(this).index()) {
					for(var i = current_pic; i < $(this).index(); i++) {
						sliderPic();
					}
				}
				else {
					for(var i = current_pic; i > $(this).index(); i--) {
						if(i == 0) {
							continue;
						}
						$(parent_id).find(".ac-slider-container .ac-slider-list .ac-slider-item").eq(i).animate({left: -move_pixel * (i - 1) + "px"});
						current_pic--;
					}
					current_pic = $(this).index();
				}
			});

			$(parent_id).find(".ac-slider-list").mouseout(function() {
				window.clearInterval(slider_interval);
				slider_interval = setInterval(sliderPic, self.speed);
			});

			function sliderPic() {
				if(current_pic < self.images.length - 1) {
					current_pic++;
					$(parent_id).find(".ac-slider-container .ac-slider-list .ac-slider-item").eq(current_pic).animate({left: -move_pixel * current_pic + "px"});
				}
				else {
					for(var i = 1; i < self.images.length; i++) {
						$(parent_id).find(".ac-slider-container .ac-slider-list .ac-slider-item").eq(i).animate({left: -move_pixel * (i - 1) + "px"});
					}
					current_pic = 0;
				}
			}

		}
	}
	
	function createSlider(config) {
		if(!config.folder) {
			config.folder == "";
		}
		if((config.speed == undefined) || isNaN(config.speed)) {
			config.speed = 3000;
		}
		if((config.boxWidth == undefined) || isNaN(config.boxWidth)) {
			config.boxWidth = $("#" + config.id).width();
		}
		if((config.imgWidth == undefined) || isNaN(config.imgWidth)) {
			if(config.images.length != 1) {
				config.imgWidth = 0.8 * config.boxWidth;
			}
			else {
				config.imgWidth = boxWidth;
			}
		}

		var slider_temp = new AccordionSlider(config);
		slider_temp.init();
	}

	$.as = createSlider;

})(window, document);