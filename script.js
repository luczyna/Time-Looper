(function($) {
$(document).ready(function() {
	
	// set up er'thang

	// add more lists to the timer set
	$('#addMore').click(function() {
		var timeSet = $('.time-set').eq(0).clone(true, true);
		$(this).parent().find('ul').append(timeSet);
	});

	$('.time-delete').click(function() {
		//only delete it if it isn't the last one available
		if ($('.time-set').length !== 1) {
			$(this).fadeOut(200, function() {
				$(this).parent().slideUp(300, function() {
					$(this).remove();
				});
			});
		} else {
			alert('That\'s the last timer. We can\'t remove it');
		}
	});

	var timers = [];
	function startTimer() {
		//get all the timers and put their information in an array
		var timeSet = $('.time-set');
		for (var i = 0; i < timeSet.length; i++) {
			var prompt = timeSet.eq(i).find('.time-prompt').text();
			var amount = timeSet.eq(i).find('.time-entry').find('span').text();
			
			//we are given a string instead of a number for amount
			amount = parseInt(amount, 10);
			if (!$.isNumeric(amount)) {
				amount = window.prompt("please commit to a real time, you jackass", 'in minutes');
			} else if (amount <= 0) {
				amount = window.prompt("we can\'t give you time here - try again", 'smartass');
			}

			if /* still */ (!$.isNumeric(amount) || amount <= 0) {
				smartAssLoop();
			}

			//store the information in the array
			timers.push([prompt, amount]);
	
			// add divs for each timer and start a timeout
			var timer = $('<div/>', { class: 'timer' });

			if (i === 0) {
				//this is the first timer
				timer.addClass('running');
			} else {
				//these are the rest of them 
				timer.addClass('waiting');
			}

			$('#timer').append(timer);

			var thePrompt = $('<p/>', {
				text: prompt
			});
			timer.append(thePrompt);
			timer.append('<div class="progress"></div>');
			console.log('happiness all around');
		}
		// console.log(timers.length);
		$('#timer').fadeIn(300);
	}

	function animateTimer() {
		//for (var j = 0; j < timers.length; j++) {
		//	$('.progress').eq(j).animate({
		//		'right': '100%'
		//	}, 2000);
		//}
		

		//set up a loop that hopefully begins individually
		var counter = 0;
		var limit = timers.length;
		var timeInt = timers[counter][1];
		var interval;

		//interval = setInterval(animate, timeInt);
		

		function animate() {
			
		}
	}

	function smartAssLoop() {
		//some one is trying to trick us, Schmeagel!
		//no one trickes us, Precious
		do {
			amount = prompt('try again', 'in minutes');
		} while (!$.isNumeric(amount) || amount <= 0);
		// return amount;
	}

	$('.control').click(function() {
		startTimer();
		animateTimer();

		// if $(this).hasClass('non-init') {

		// }

	});

});
})(jQuery);

	









