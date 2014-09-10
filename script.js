/* Time Loopr will help
 * those who have repeating tasks
 * and like good pictures
 */

var loopr = {
	timers: [],
	timerCount: 0,
	colours: [],
	start: function() {
		//initialize the timer

	},
	pause: function() {
		//pause the timer
	},
	clear: function() {
		//end and clear the timer
	}
};

var items = document.getElementsByClassName('time-item');
var itemDelete = function() {
	console.log(this);
	if (items.length <= 1) {
		console.log('no, there is only one');
		return;
	} else {
		var d = this.parentNode;
		d.parentNode.removeChild(d);
	}
}
var itemAdd = function() {
	console.log(this);

	var i = document.createElement('li');
	i.classList.add('time-item', 'clearfix', 'normal');
	var o = items.length;
	i.setAttribute('data-order', o);
	i.innerHTML = '<span class="time-name" contenteditable="true">name your timer</span><span class="time-amount" contenteditable="true">1</span><span class="time-delete">&times;</span><span class="time-repeat">&amp;</span>';
	items.parentNode.appendChild(i);
}
var itemReplicate = function() {
	console.log(this);
	var i = this.parent;

	var r = document.createElement('li');
	r.classList.add('time-item', 'clearfix', 'normal');
	var o = items.length;
	r.setAttribute('data-order', o);
	r.innerHTML = i.innerHTML;
	i.parentNode.insertBefore(r, i.nextSibling);

}
var itemLogtoLoop = function() {

}




function init() {
	//is there localStorage?

	//add the existing item to the time loopr

	//add the events to the applicable buttons
	var del = document.getElementsByClassName('iten-delete'),
		rep = document.getElementsByClassName('item-repeat');
	addClickEvent(del, itemDelete);
	addClickEvent(rep, itemReplicate);
	var add = document.getElementById('add-item');
	add.addEventListener('click', itemAdd, false);
}

function addClickEvent(what, fn) {
	for (var i = 0; i <= what.length; i++) {
		what.addEventListener('click', fn, false);
	}
}