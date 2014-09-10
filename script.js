/* Time Loopr will help
 * those who have repeating tasks
 * and like good pictures
 */

var loopr = {
	timers: [],
	timerCount: 0,
	currentTimer: 0,
	colours: [],
	running: false,
	unique: 0,
	individual: 0,
	audio: document.getElementById('audio-1'),
	start: function() {
		if (!loopr.running) {	
			itemLogtoLoop();

			//initialize the timer
			console.log('starting the timer');
			loopr.currentTimer = 0;
			loopr.running = true;
			visualTimerFeedback(0);
			loopr.unique = window.setTimeout(runTimer, loopr.timers[0].tamount * (1000 * 60));

			var begin = document.getElementById('activate');
			begin.removeEventListener('click', loopr.start, false);
			begin.textContent = 'clear timer';
			begin.addEventListener('click', loopr.clear, false);
		}
	},
	pause: function() {
		//pause the timer
	},
	clear: function() {
		console.log('clear the timer!');
		//end and clear the timer
		loopr.running = false;
		loopr.currentTimer = 0;
		loopr.timerCount = 0;
		window.clearTimeout(loopr.unique);

		//clean up the visual blocks
		visualReset();

		var begin = document.getElementById('activate');
		begin.removeEventListener('click', loopr.clear, false);
		begin.textContent = 'start timer';
		begin.addEventListener('click', loopr.start, false);
	}
};

var items = document.getElementsByClassName('time-item');
var itemDelete = function() {
	console.log(this);
	if (items.length <= 1) {
		console.log('no, there is only one');
		return;
	} else if (loopr.running) {
		console.log('pause the timer first');
		return;
	} else {
		var d = this.parentNode;
		d.parentNode.removeChild(d);
	}
}
var itemAdd = function() {
	if (loopr.running) {
		console.log('pause the timer first');
		return;
	} else {	
		var i = document.createElement('li');
		i.classList.add('time-item', 'clearfix', 'normal');
		var o = items.length;
		i.setAttribute('data-order', o + 1);
		i.innerHTML = '<span class="time-name" contenteditable="true">name your timer</span><span class="time-amount" contenteditable="true">1</span><span class="time-delete">&times;</span><span class="time-repeat">&amp;</span><div class="time-visual"></div>';
		items[0].parentNode.appendChild(i);

		eventUpdate();
	}
}
var itemReplicate = function() {
	if (loopr.running) {
		console.log('pause the timer first');
		return;
	} else {
		var i = this.parentNode;

		var r = document.createElement('li');
		r.classList.add('time-item', 'clearfix', 'normal');
		var o = items.length;
		r.setAttribute('data-order', o);
		r.innerHTML = i.innerHTML;
		i.parentNode.insertBefore(r, i.nextSibling);

		eventUpdate();
	}
}
var itemLogtoLoop = function() {
	loopr.timers.length = 0;
	loopr.timerCount = items.length;

	for (var i = 0; i < items.length; i++) {
		var amount = items[i].querySelector('.time-amount').textContent.replace(' minute(s)', '');
		var n = {
			'tname': items[i].querySelector('.time-name').textContent,
			'tamount': Number(amount)
		};
		loopr.timers.push(n);
	}
}




function init() {
	//is there localStorage?

	//add the events to the applicable buttons
	eventUpdate();
	var add = document.getElementById('add-item');
	add.addEventListener('click', itemAdd, false);
	var begin = document.getElementById('activate');
	begin.addEventListener('click', loopr.start, false);
}
init();

function addClickEvent(what, fun) {
	for (var i = 0; i < what.length; i++) {
		what[i].addEventListener('click', fun, false);
	}
}
function eventUpdate() {
	var del = document.getElementsByClassName('time-delete'),
		rep = document.getElementsByClassName('time-repeat');
	addClickEvent(del, itemDelete);
	addClickEvent(rep, itemReplicate);
}






function visualTimerFeedback(which) {
	//which item are we running?
	var titem = items[which];

	//let's show the visual
	var v = titem.querySelector('.time-visual');
	v.style.display = 'block';
	v.style.transition = 'right ' +  (loopr.timers[which].tamount * 60) + 's linear';
	window.setTimeout(function() {
		//let's make that style 'disappear'
		v.style.right = '100%'; 
	}, 10);
}
function visualReset() {
	var v = document.getElementsByClassName('time-visual');
	for (var i = 0; i < v.length; i++) {
		v[0].style.display = 'none';
		v[0].style.right = '0.01%';
	}
}
function runTimer() {
	//we just finished an iteration of the timer
	loopr.audio.play();
	loopr.currentTimer++;
	//sound the trumpets!
	console.log('times up for ' + loopr.timers[loopr.currentTimer - 1].tname);
	
	//should we be running this interval again?
	if (loopr.currentTimer >= loopr.timerCount) {
		//no, we shouldn't
		loopr.currentTimer = 0;
		loopr.timerCount = 0;
		loopr.running = false;

		//clean up the visual blocks
		visualReset();

		var begin = document.getElementById('activate');
		begin.removeEventListener(loopr.clear);
		begin.textContent = 'start timer';
		begin.addEventListener('click', loopr.start, false);
	} else {
		//yes, run it again!
		var w = loopr.currentTimer;
		visualTimerFeedback(w);
		loopr.unique = window.setTimeout(runTimer, loopr.timers[w].tamount * (1000 * 60));
	}
}