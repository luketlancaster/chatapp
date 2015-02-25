'use strict';

var fb = new Firebase('https://chatappy.firebaseio.com/');



$('#chatForm').on('click', '#chatButton', function(evt) {
	evt.preventDefault();
	var   chatWords = $('#chatInput').val(),
	    chatterName = $('#chatterName').val(),
	            now = moment().format('MMM Do YYYY, h:mm a');

	fb.push({name: chatterName, message: chatWords, time: now});

	$('input').val('');
});

fb.limitToLast(20).on('child_added', function(snap){
	var content = snap.val();

	addMessages(content.name, content.message, content.time);
});

function addMessages(name, message, now) {
	$('<div class="nameAndMessage"></div>')
		.text(message)
		.prepend(
			$('<strong></strong>').text(name + ' said: ')
			)
		.prepend('On ' + now + ' ')
		.appendTo($('.messagesBox'));
		removeTopMessage();
}

function removeTopMessage() {
	//count length of .nameAndMessage divs √
	var divsLength = $('.nameAndMessage').length;
	//remove the first .nameAndMessage div
	if(divsLength >= 20) {
		$('.nameAndMessage:first').remove();
	}
}