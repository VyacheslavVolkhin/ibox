document.addEventListener("DOMContentLoaded", function() {



	//button scroll up
	let buttonUp = document.querySelector(".js-btn-up");
	buttonUp.addEventListener('click', function(e) {
		window.scrollTo({top: 0, behavior: 'smooth'});
		e.preventDefault()
		e.stopPropagation()
	})

	//button scroll 
	document.querySelectorAll('.js-anchor').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});

	//files add
	const fileBlocks = document.querySelectorAll('.js-field-file');

	fileBlocks.forEach(fileBlock => {
		const fileInput = fileBlock.querySelector('.js-field-input');
		const fileAttachButton = fileBlock.querySelector('.js-file-button-attach');
		const fileDeleteButton = fileBlock.querySelector('.js-file-button-del');
		const fileName = fileBlock.querySelector('.file-name');

		fileAttachButton.addEventListener('click', function() {
			fileInput.click();
		});

		fileInput.addEventListener('change', function() {
			if (fileInput.files.length > 0) {
				fileName.textContent = fileInput.files[0].name;
				fileBlock.classList.add('file-active');
			} else {
				fileName.textContent = '';
				fileBlock.classList.remove('file-active');
			}
		});

		fileDeleteButton.addEventListener('click', function(e) {
			e.preventDefault();
			fileName.textContent = '';
			fileBlock.classList.remove('file-active');
			fileInput.value = null;
		});
	});


	// filter actions
	const filterButtons = document.querySelectorAll('.js-filter-toggle');
	if (filterButtons.length > 0) {
	filterButtons.forEach(button => {
		button.addEventListener("click", function(e) {
		document.body.classList.toggle("filter-show");
		e.preventDefault();
		});
	});
	}


	//show message add cart
	const addButton = document.querySelector('.js-show-message-cart');
	const popupBox = document.querySelector('.popup-box#popup-message-cart');

	if (addButton) {
		addButton.addEventListener('click', function() {
			popupBox.classList.add('active');
	
			setTimeout(function() {
				popupBox.classList.remove('active');
			}, 5000);
		});
	}


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				if (this.classList.contains('js-show-message-cart')) {
					document.querySelector('#popup-message-cart').classList.add('active');
			
					setTimeout(function() {
						document.querySelector('#popup-message-cart').classList.remove('active');
					}, 5000);
				}
				e.preventDefault()
				return false
			}
		})
	}
	

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (!element.closest('.no-close')) {
				element.classList.remove('active')
			}
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//slider tabs
	const swiperSliderTabs = new Swiper('.slider-tabs .swiper', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tabs-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tabs-prev',
		},
		breakpoints: {
			1024: {
				loop: false,
			},
		},
	
	});


	//slider accessories
	const swiperSliderAccessories = new Swiper('.slider-accessories .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-accessories-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-accessories-prev',
		},
	
	});


	//slider brands
	const swiperSliderBrands = new Swiper('.slider-brands .swiper', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-brands-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-brands-prev',
		},
		breakpoints: {
			1024: {
				loop: false,
			},
		},
	
	});
	
	//slider reviews
	const swiperSliderReviews = new Swiper('.slider-reviews .swiper', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-reviews-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-reviews-prev',
		},
		breakpoints: {
			1280: {
				slidesPerView: 3,
			},
			1600: {
				slidesPerView: 4,
			},
		},
	
	});

	//slider reviews content
	const swiperSliderReviewsContent = new Swiper('.slider-reviews-content .swiper', {
		loop: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-reviews-content-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-reviews-content-prev',
		},
	
	});


	
	
	//slider video
	const swiperSliderVideo = new Swiper('.slider-video .swiper', {
		loop: false,
		slidesPerView: 2,
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		initialSlide: 2,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-video-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-video-prev',
		},
		breakpoints: {
			640: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 5,
			},
			1600: {
				slidesPerView: 6,
			},
		},
	
	});
	//slider video content
	const swiperSliderVideoContent = new Swiper('.slider-video-content .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: false,
		autoplay: false,
		initialSlide: 2,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-video-content-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-video-content-prev',
		},
	
	});


	//slider topActions
	const swiperSliderTopActions = new Swiper('.slider-topActions .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: true,
		speed: 400,
		pagination: {
			el: '.slider-topActions-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		navigation: false,
	
	});
	
	


	//slider media thumbs preview
	const swiperMediaPreview = new Swiper(".slider-media-thumbs .swiper",
	{
	  loop: false,
	  slidesPerView: 4,
	  spaceBetween: 0,
	  threshold: 5,
	  watchSlidesVisibility: true,
	  watchSlidesProgress: true,
	  freeMode: false,
	  navigation: {
		nextEl: ".button-slider-media-thumbs-next",
		prevEl: ".button-slider-media-thumbs-prev",
	},
	});
	
	//slider media thumbs main
	const swiperMediaMain = new Swiper(".slider-media-main .swiper",
	{
	  loop: false,
	  slidesPerView: 1,
	  spaceBetween: 0,
	  autoHeight: true,
	  speed: 400,
	  threshold: 5,
	  freeMode: false,
	  watchSlidesProgress: true,
	  navigation: false,
	  pagination: {
		clickable: true,
		},
	  thumbs: {
		swiper: swiperMediaPreview,
		},
	});


	//slider compare
	const swiperSliderCompare = new Swiper('.slider-compare .swiper', {
		loop: false,
		slidesPerView: 'auto',
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-compare-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-compare-prev',
		},
	
	});


	//slider tiles
	const swiperSliderTiles = new Swiper('.slider-tiles .swiper', {
		loop: false,
		slidesPerView: 2,
		spaceBetween: 0,
		autoHeight: false,
		speed: 400,
		pagination: false,
		autoplay: false,
		navigation: {
			nextEl: '.btn-action-ico.ico-arrow.ico-arrow-next.button-slider-tiles-next',
			prevEl: '.btn-action-ico.ico-arrow.ico-arrow-prev.button-slider-tiles-prev',
		},
		breakpoints: {
			768: {
				slidesPerView: 4,
			},
			1024: {
				slidesPerView: 5,
			},
			1100: {
				slidesPerView: 6,
			},
		},
	
	});
	
})





//select toggle content visibility
document.addEventListener("DOMContentLoaded", function () {
	const inputs = document.querySelectorAll(
	  "input[data-content], input[data-content-check], input[data-content-uncheck]"
	);
  
	inputs.forEach(function (input) {
	  toggleContent(input);
	  });
  
	inputs.forEach((input) => {
	  input.addEventListener("click", function () {
		document.querySelectorAll(".frm-content").forEach((content) => {
		  content.classList.remove("active");
			  });
  
		inputs.forEach(toggleContent);
		  });
	  });
  
	document.querySelectorAll(".btn[data-content]").forEach((button) => {
	  button.addEventListener("click", function () {
		let dataContent = this.getAttribute("data-content");
		this.disabled = true;
		document
		  .querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
		  .forEach((content) => {
			content.classList.add("active");
			  });
		return false;
		  });
	  });
  
	function toggleContent(input) {
	  let selectContent;
	  if (input.checked) {
		selectContent =
		  input.getAttribute("data-content-check") ||
		  input.getAttribute("data-content");
		  } else {
		selectContent = input.getAttribute("data-content-uncheck");
		  }
	  document
		.querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		.forEach((content) => {
		  content.classList.add("active");
		  });
	  }

  });


