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

	function startTimer() {
		//get all the timers and put their information in an array
		var timeSet = $('.time-set');
		var timers = [];
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
			timers.push([prompt, amount]);
		};
		// console.log(timers);

		
	}

	smartAssLoop() {
		//some one is trying to trick us, Schmeagel!
		//no one trickes us, Precious
		do {
			amount = prompt('try again', 'in minutes');
		} while (!$.isNumeric(amount) || amount <= 0);
		// return amount;
	}

	$('.control').click(function() {
		startTimer();
		console.log('we clicked the start button');
		// if $(this).hasClass('non-init') {

		// }
	});

});
})(jQuery);

	









