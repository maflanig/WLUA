(function() {
  console.log('|_* ~ *_| Welcome to the WLUA website |_* ~ *_|');
})();

(function() {
    // Mobile Menu
    
    const $menuButton = document.querySelector("#navbar__mobileButton");
    const $menu = document.querySelector("#navbar__menu");

    let menuOpen = false;

    $menuButton.addEventListener("click", event => {
      if (menuOpen) {
        menuOpen = false;
        $menu.classList.remove('active');
        
      } else {
        menuOpen = true;
        $menu.classList.add('active');
      }
    });
  })();

$(document).ready(function() {
	
	// Add class to mailto link
	// Needed to separate the disabling of the default action AND copy email to clipboard
	$('a[href^=mailto]').addClass('mailto-link');

	var mailto = $('.mailto-link');
	var messageCopy = 'Click to copy email address';
	var messageSuccess = 'Email address copied to clipboard';
	
	mailto.append('<span class="mailto-message"></span>');
	$('.mailto-message').append(messageCopy);
	
	// Disable opening your email client. yuk.
	$('a[href^=mailto]').click(function() {
		return false; 
	})
	
	// On click, get href and remove 'mailto:' from value
	// Store email address in a variable.
	mailto.click(function() {
		var href = $(this).attr('href');
		var email = href.replace('mailto:', '');
		copyToClipboard(email);
		$('.mailto-message').empty().append(messageSuccess);
		setTimeout(function() {
			$('.mailto-message').empty().append(messageCopy);}, 2000); 
	});
	
});

// Grabbed this from Stack Overflow.
// Copies the email variable to clipboard
function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}

const slideGallery = document.querySelector('.slides');
const slides = slideGallery.querySelectorAll('div');
const thumbnailContainer = document.querySelector('.thumbnails');
const slideCount = slides.length;
const slideWidth = 540;

const highlightThumbnail = () => {
  thumbnailContainer
    .querySelectorAll('div.highlighted')
    .forEach(el => el.classList.remove('highlighted'));
  const index = Math.floor(slideGallery.scrollLeft / slideWidth);
  thumbnailContainer
    .querySelector(`div[data-id="${index}"]`)
    .classList.add('highlighted');
};

const scrollToElement = el => {
  const index = parseInt(el.dataset.id, 10);
  slideGallery.scrollTo(index * slideWidth, 0);
};

thumbnailContainer.innerHTML += [...slides]
  .map((slide, i) => `<div data-id="${i}"></div>`)
  .join('');

thumbnailContainer.querySelectorAll('div').forEach(el => {
  el.addEventListener('click', () => scrollToElement(el));
});

slideGallery.addEventListener('scroll', e => highlightThumbnail());