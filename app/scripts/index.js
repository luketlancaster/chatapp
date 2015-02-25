'use strict';

var fb = new Firebase('https://chatappy.firebaseio.com/');



$('#chatForm').on('click', '#chatButton', function(evt) {
	evt.preventDefault();
	var   chatWords = $('#chatInput').val(),
	    chatterName = $('#chatterName').val();

	fb.push({name: chatterName, message: chatWords});

	$('input').val('');
});

fb.on('child_added', function(snap){
	var content = snap.val();

	addMessages(content.name, content.message);
});

function addMessages(name, message) {
	$('<div class="nameAndMessage"></div>')
		.text(message)
		.prepend(
			$('<strong></strong>').text(name + ': ')
			)
		.appendTo($('.messagesBox'));
}

function countLength() {
	//count length of .nameAndMessage divs
	//remove the first .nameAndMessage div
}