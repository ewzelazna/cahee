// wywołania funkcji 
navTop();
getGallery();
getBlog();

// funkcja dodająca fixed do nav
function navTop () {

	var distance,
		top,
		top_height;

	$(window).scroll(function() {
		top_height = 60;
		distance = $(window).scrollTop();
		top = top_height - distance;

		if ( top > 0 ) {
			$('.wrapper-nav').removeClass('scroll-top')
			$('.wrapper-nav').css({
				'top': top
			});

		} else if ( top <= 0 ) {

			$('.wrapper-nav').addClass('scroll-top');
			$('.wrapper-nav').css({
				'top': '0'
			});
		}


	});


}

//scroll menu

$(document).ready(function() {
    
	$('.navbar-default ul li a').click(function(){
		
		var page = $(this).attr('href');
		
		var params = {
			
			duration: 800,
			easing: 'swing'
			
			};
			
			$.scrollTo(page, params);
			
			return false;	
		
		});
	
});

//pobranie ajax gallery
function getGallery() {
	var number_start = 0,
		number_end = 2;

	$(".btn-gallery").on("click", function(){

		$('.btn-loader-section').addClass('inactive-link');

			var html = "",
				item;


			$.ajax({
				url: "https://jsonplaceholder.typicode.com/photos?_start="+number_start+"&_end="+number_end,
				method: "GET"
			}).then(function(response){
				var max_length = response.length;
				number_start += 2;
				number_end += 2;

				for(var i=0; i<max_length; i++){
					item = response[i];
					html += '<div class="col-md-6 col-xs-12 gallery-display">'+
								'<img class="img-responsive img-responsive-gallery" src="'+ item.url +'" alt="" title=""/>'+
							'</div>';
				}

				$(".photo-gallery").append(html);
				$('.btn-loader-section').removeClass('inactive-link');


			}).catch(function(erresponse){
				console.log("aaa");
			});

	});
}

//pobranie ajax blog
function getBlog() {

	var number_start = 0,
		number_end = 3;

	$(".btn-blog").on("click", function(){

		$('.btn-loader-section').addClass('inactiveLink');
		$(".sk-circle").css({"display": "block"});

		var html = "",
			item;

		$.ajax({
			url: "https://jsonplaceholder.typicode.com/photos?_start="+number_start+"&_end="+number_end,
			method: "GET"
		}).then(function(response){

			var max_length = response.length;
				number_start += 3;
				number_end += 3;

				for(var i=0; i<max_length; i++){
					item = response[i];

				var day,
					my_date,
					month,
					hour;

					day=Math.floor(Math.random()*30)+1;
					hour=Math.floor(Math.random()*25);
			//wyświetlanie dni w kalendarzu
					if (day<10) {
						day='0'+day;
					}

					my_date = new Date();
					month = my_date.toString().split(" ")[1].toUpperCase();

					html += '<div class="blog-section col-md-4 col-xs-8 blog-display test">'+
								'<div class="blog-img">'+
									'<div class="blog">'+
										'<p class="ontop">'+day+' '+month+'</p>'+
										'<div class="blog-date"></div>'+
										'<img src="'+ item.url + '"/>'+
										'<div class="blog-shadow"></div>'+
										'<p class="topic">'+
											'<a href="#">'+item.title+'</a>'+
										'</p>'+
										'<p class="author author-append">By Auskteez - '+hour+' hours ago</p>'+
									'</div>'+
								'</div>'+
							'</div>';
				}

			$('.gallery-blog').append(html);
			$(".sk-circle").css({"display": "none"});
			$('.btn-loader-section').removeClass('inactiveLink');

		}).catch(function(erresponse){
		console.log("aaa");
		});
	});
}
