(function() {
	"use strict";

	var currentIndex = 0;
	var cards = document.querySelectorAll('.carousel-card');
	var dots = document.querySelectorAll('.dot');
	var prevBtn = document.getElementById('prev-card');
	var nextBtn = document.getElementById('next-card');
	var wrapper = document.querySelector('.carousel-wrapper');
	var autoAdvanceInterval;

	function updateCarousel() {
		cards.forEach((card, index) => {
			card.classList.remove('active', 'prev', 'next');

			if (index === currentIndex) {
				card.classList.add('active');
			} else if (index === (currentIndex - 1 + cards.length) % cards.length) {
				card.classList.add('prev');
			} else if (index === (currentIndex + 1) % cards.length) {
				card.classList.add('next');
			}
		});

		dots.forEach((dot, index) => {
			dot.classList.toggle('active', index === currentIndex);
		});
	}

	function nextSlide() {
		currentIndex = (currentIndex + 1) % cards.length;
		updateCarousel();
	}

	function prevSlide() {
		currentIndex = (currentIndex - 1 + cards.length) % cards.length;
		updateCarousel();
	}

	function goToSlide(index) {
		currentIndex = index;
		updateCarousel();
		resetTimer();
	}

	function startTimer() {
		autoAdvanceInterval = setInterval(nextSlide, 5000);
	}

	function stopTimer() {
		clearInterval(autoAdvanceInterval);
	}

	function resetTimer() {
		stopTimer();
		startTimer();
	}

	// Event Listeners
	if (prevBtn) {
		prevBtn.addEventListener('click', function(e) {
			e.preventDefault();
			prevSlide();
			resetTimer();
		});
	}

	if (nextBtn) {
		nextBtn.addEventListener('click', function(e) {
			e.preventDefault();
			nextSlide();
			resetTimer();
		});
	}

	dots.forEach((dot, index) => {
		dot.addEventListener('click', function(e) {
			e.preventDefault();
			goToSlide(index);
		});
	});

	if (wrapper) {
		wrapper.addEventListener('mouseenter', stopTimer);
		wrapper.addEventListener('mouseleave', startTimer);
	}

	// Initialize
	updateCarousel();
	startTimer();

})();
