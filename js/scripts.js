var modal, hasLiked, likes;

window.onload = function() {
	var buttons;

	// check to see if we already have likes first thing
	updateLikeCount('load');

	// set our variables
	buttons = document.getElementsByTagName('button');

	// let's listen for a click on any buttons
	for (var key in buttons) {
		buttons[key].onclick = function() {
			if (this.getAttribute('data-modal') == 'show') {
				toggleModal('quote');

				// now let's listen for the click trap
				clickTrapListener();
			}
			if (this.getAttribute('data-modal') == 'hide') {
				toggleModal('quote');
			}
			if (this.getAttribute('data-likes') == 'count') {
				updateLikeCount('toggle', this);
			}
		}
	}
}

function toggleModal(id) {
	// let's try to grab the modal by the id
	modal = document.getElementById(id);
	// if we have an element and it has a class of 'modal' we can keep going
	if (modal && modal.classList.contains('modal')) {
		// toggle the show class in the classList
		modal.classList.toggle('show');
	}
}

function clickTrapListener() {
	var clickTrap;

	// if we have a modal element and it has a class of 'modal' we can keep going
	if (modal && modal.classList.contains('modal')) {
		for (var key in modal.children) {
			// exit loop if the property is from prototype
			if (! modal.children.hasOwnProperty(key)) continue;

			// check to see if the child is our click trap
			if (modal.children[key].classList.contains("click-trap")) {
				// set the child we found as our click trap variable
				clickTrap = modal.children[key];

				// listen for a click in the click trap
				clickTrap.onclick = function() { toggleModal('quote'); }

				// once we find the click trap we don't need to keep going
				break;
			}
		}
	}
}

function updateLikeCount(action, elem) {
	var likesCounter;

	// let's setup our like button and likes counting variable
	likesCounter = document.getElementById('js-likes');

	// if we're loading, let's check to see if we have saved a count
	if (action === 'load') {
		// if we don't have likes setup in the localStorage, let's set that up now
		if (localStorage.getItem('likes') === 'undefined') {
			localStorage.setItem('likes', parseInt(likes));

			// ----- bof development block ----- //
			if (likesCounter.innerHTML.length > 0 && ! hasLiked) {
				likes = parseInt(likesCounter.innerHTML);
			} else {
				likes = 423;
				likesCounter.innerHTML = likes;
			}
			// ----- eof development block ----- //
		} else {
			likes = parseInt(localStorage.getItem('likes'));
			likesCounter.innerHTML = likes;
		}

		// now let's check to see if we've already liked this quote
		if (localStorage.getItem('liked') !== 'undefined') {
			hasLiked = (localStorage.getItem('liked') === 'true') ? true : false;
			if (hasLiked) { document.getElementById('like').classList.add('liked'); }
		} else {
			hasLiked = false;
			localStorage.setItem('liked', hasLiked.toString());
		}
	}

	// now let's set the count in our variable and make sure it's an integer
	likes = parseInt(localStorage.getItem('likes'));
	likesCounter.innerHTML = likes;

	// if we're toggling, let's toggle the number here
	if (action === 'toggle') {
		// on button click toggle add/subtract
		if (! elem.classList.contains('liked') && ! hasLiked) {
			// add
			elem.classList.add('liked');
			likes += 1;
			localStorage.setItem('likes', likes);
			hasLiked = true;
			localStorage.setItem('liked', hasLiked.toString());
		} else if (elem.classList.contains('liked') && hasLiked) {
			// subtract
			elem.classList.remove('liked');
			likes -= 1;
			localStorage.setItem('likes', likes);
			hasLiked = false;
			localStorage.setItem('liked', hasLiked.toString());
		}
	}

	// finally, we'll update the text in the
	if (action === 'toggle' && hasLiked) {
		likesCounter.innerHTML = parseInt(likesCounter.innerHTML) + 1;
	} else if (action === 'toggle' && ! hasLiked) {
		likesCounter.innerHTML = parseInt(likesCounter.innerHTML) - 1;
	}
}