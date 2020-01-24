import Validator from './utils/Validator';

class LightCarousel {
  constructor(selector, nextButtonSelector, previousButtonSelector, navigationDotsContainerSelector = null, autoplay = false, interval = 5000) {
    this.selector = selector;
    this.slider = document.querySelector(selector);
    this.slides = this.slider.children;
    this.nextButton = document.querySelector(nextButtonSelector);
    this.previousButton = document.querySelector(previousButtonSelector);

    this.navigationDots = [];
    this.navigationDotsContainer = document.querySelector(navigationDotsContainerSelector);

    this.autoplay = autoplay;
    this.interval = interval;

    this.firstSlide = 0;
    this.currentSlide = 0;
    this.lastSlide = this.slides.length - 1;
    this.slidesCount = this.slides.length - 1;

    this.nextSlide = this._nextSlide.bind(this);
    this.previousSlide = this._previousSlide.bind(this);
    this.handleNavigationDotClick = this._handleNavigationDotClick.bind(this);

    this.initialization();
  }

  initialization() {
    this.nextButton.addEventListener('click', this.nextSlide);
    this.previousButton.addEventListener('click', this.previousSlide);

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.position = 'absolute';
      this.slides[i].style.left = '0px';
      this.slides[i].style.top = '0px';
      this.slides[i].style.transition = '.3s';

      if (i !== this.currentSlide) {
        this.slides[i].style.left = '-100%';
      };
    };

    if (this.autoplay) {
      setInterval(this.nextSlide, this.interval);
    }

    Validator.isEnabled(this.navigationDotsContainer, () => {
      this.createNavigationDots();
    });
  }

  _nextSlide() {
    this.incrementSlidesPointer();
    this.showCurrentSlide();

    Validator.isEnabled(this.navigationDotsContainer, () => {
      this.changeActiveDot();
    });
  }

  _previousSlide() {
    this.decrementSlidesPointer();
    this.showCurrentSlide();

    Validator.isEnabled(this.navigationDotsContainer, () => {
      this.changeActiveDot();
    });
  }

  incrementSlidesPointer() {
    if (this.currentSlide >= this.slidesCount) {
      this.currentSlide = 0;
    } else {
      this.currentSlide++;
    }
  }

  decrementSlidesPointer() {
    if (this.currentSlide <= 0) {
      this.currentSlide = this.slidesCount;
    } else {
      this.currentSlide--;
    }
  }

  hideAllSlides() {
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.left = '-100%';
    };
  }

  showCurrentSlide() {
    this.hideAllSlides();
    this.slides[this.currentSlide].style.left = '0%';
  }

  _handleNavigationDotClick(e) {
    this.currentSlide = e.target.getAttribute('data-slide');

    this.changeActiveDot();
    this.showCurrentSlide();
  }

  createNavigationDots() {
    this.navigationDotsContainer.classList.add('dots');
    for (let i = 0; i < this.slides.length; i++) {
      const button = document.createElement('button');
      button.setAttribute('data-slide', i);
      button.classList.add('dot');
      button.addEventListener('click', this.handleNavigationDotClick);
      this.navigationDots.push(button);

      if (i === this.currentSlide) {
        button.classList.add('active');
      }

      this.navigationDotsContainer.appendChild(button);
    }
  }

  changeActiveDot() {
    for (let i = 0; i < this.navigationDots.length; i++) {
      this.navigationDots[i].classList.remove('active');
    }

    this.navigationDots[this.currentSlide].classList.add('active');
  }
}