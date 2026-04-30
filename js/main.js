// DOM Elements

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const burgerBtn = document.getElementById('burgerBtn');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    if (burgerBtn && mainNav) {
        let closeBtn = null; // Переменная для хранения крестика

        // Функция создания крестика
        function createCloseButton() {
            if (closeBtn) return closeBtn; // Если уже создан, возвращаем

            const btn = document.createElement('button');
            btn.className = 'mobile-menu-close';
            btn.innerHTML = '✕';
            btn.setAttribute('aria-label', 'Закрыть меню');
            btn.addEventListener('click', closeMenu);
            return btn;
        }

        // Функция закрытия меню
        function closeMenu() {
            burgerBtn.classList.remove('active');
            mainNav.classList.remove('active');
            body.style.overflow = '';

            // Удаляем крестик при закрытии меню
            if (closeBtn && closeBtn.parentNode) {
                closeBtn.remove();
            }
        }

        // Функция открытия меню
        function openMenu() {
            burgerBtn.classList.add('active');
            mainNav.classList.add('active');
            body.style.overflow = 'hidden';

            // Добавляем крестик при открытии меню
            if (!closeBtn) {
                closeBtn = createCloseButton();
            }
            mainNav.insertBefore(closeBtn, mainNav.firstChild);
        }

        // Открытие/закрытие по бургеру
        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();

            if (mainNav.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Закрытие по ссылкам меню
        const navLinks = mainNav.querySelectorAll('.header__menu-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Закрытие по клику вне меню
        document.addEventListener('click', function (e) {
            if (mainNav.classList.contains('active')) {
                if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
                    closeMenu();
                }
            }
        });

        // Закрытие по клавише ESC
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMenu();
            }
        });
    }

    // Search Toggle
    const searchBtn = document.getElementById('searchBtn');
    const searchForm = document.getElementById('searchForm');

    if (searchBtn && searchForm) {
        searchBtn.addEventListener('click', function () {
            searchForm.classList.toggle('active');
            const searchInput = searchForm.querySelector('.header__search-input');
            if (searchForm.classList.contains('active')) {
                searchInput.focus();
            }
        });

        const searchClose = searchForm.querySelector('.header__search-close');
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchForm.classList.remove('active');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchForm.classList.contains('active')) {
                searchForm.classList.remove('active');
            }
        });
    }

    // FAQ Accordion
    
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq__h3');

        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // SWIPER SLIDER

    const swiper = new Swiper('#casesSlider', {
        direction: 'horizontal',
        navigation: {
            nextEl: '.cases__nav--next',
            prevEl: '.cases__nav--prev',
        },
        pagination: {
            el: '.cases__pagination',
            clickable: true,
            dynamicBullets: false,
        },
        loop: true,
        speed: 800,
        effect: 'slide',

        breakpoints: {

            320: {
                slidesPerView: 1,
                spaceBetween: 16,
            },
            576: {
                slidesPerView: 2,
                spaceBetween: 16,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 18,
            },
        },
        grabCursor: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        mousewheel: {
            sensitivity: 1,
            eventsTarget: '.cases__slider',
        },

    });

    let swiperAudience = null;
    const swiperContainer = '.audience__swiper';

    function initSwiperOnMobile(containerSelector, paginationSelector) {
        let swiperInstance = null;

        const swiperConfig = {
            direction: 'horizontal',
            pagination: {
                el: paginationSelector,
                clickable: true,
                dynamicBullets: false,
            },
            loop: true,
            speed: 800,
            effect: 'slide',
            slidesPerView: 1,
            spaceBetween: 25,
            grabCursor: true,
            keyboard: {
                enabled: true,
                onlyInViewport: true,
            },
            mousewheel: {
                sensitivity: 1,
                eventsTarget: containerSelector,
            },
        };

        const mobileMediaQuery = window.matchMedia('(max-width: 575px)');

        function handleMobileChange(e) {
            if (e.matches) {
                if (!swiperInstance) {
                    swiperInstance = new Swiper(containerSelector, swiperConfig);
                }
            } else {
                if (swiperInstance) {
                    swiperInstance.destroy(true, true);
                    swiperInstance = null;
                }
            }
        }

        handleMobileChange(mobileMediaQuery);
        mobileMediaQuery.addEventListener('change', handleMobileChange);
    }

    // Инициализация
    initSwiperOnMobile('.audience__swiper', '.audience__pagination');
    initSwiperOnMobile('.services-offer__swiper', '.services-offer__pagination');

    // БАЗОВАЯ ВАЛИДАЦИЯ ФОРМЫ

    const form = document.getElementById('callbackForm');

    if (form) {
        function clearErrors() {
            const errors = form.querySelectorAll('.error-message');
            errors.forEach(error => error.remove());

            const errorInputs = form.querySelectorAll('.error');
            errorInputs.forEach(input => input.classList.remove('error'));
        }

        function showError(input, message) {
            input.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#e74c3c';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '5px';
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }

        function validateName(name) {
            if (!name || name.trim() === '') {
                return 'Введите ваше имя';
            }
            if (name.trim().length < 2) {
                return 'Имя слишком короткое';
            }
            return null;
        }

        function validatePhone(phone) {
            if (!phone || phone.trim() === '') {
                return 'Введите номер телефона';
            }
            const digits = phone.replace(/\D/g, '');
            if (digits.length < 10) {
                return 'Номер телефона слишком короткий';
            }
            if (digits.length > 12) {
                return 'Номер телефона слишком длинный';
            }
            return null;
        }

        function validateWebsite(website) {
            if (!website || website.trim() === '') {
                return null;
            }
            const url = website.trim();
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                return 'Ссылка должна начинаться с http:// или https://';
            }
            if (url.length < 10) {
                return 'Ссылка слишком короткая';
            }
            return null;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();

            clearErrors();

            const nameInput = document.getElementById('name');
            const phoneInput = document.getElementById('phone');
            const websiteInput = document.getElementById('website');
            const agreeCheckbox = document.getElementById('agree');

            const name = nameInput ? nameInput.value : '';
            const phone = phoneInput ? phoneInput.value : '';
            const website = websiteInput ? websiteInput.value : '';
            const agree = agreeCheckbox ? agreeCheckbox.checked : false;

            let isValid = true;

            const nameError = validateName(name);
            if (nameError) {
                showError(nameInput, nameError);
                isValid = false;
            }

            const phoneError = validatePhone(phone);
            if (phoneError) {
                showError(phoneInput, phoneError);
                isValid = false;
            }

            const websiteError = validateWebsite(website);
            if (websiteError) {
                showError(websiteInput, websiteError);
                isValid = false;
            }

            if (!agree) {
                showError(agreeCheckbox, 'Подтвердите согласие на обработку данных');
                isValid = false;
            }

            if (isValid) {
                const formData = {
                    name: name.trim(),
                    phone: phone.trim(),
                    website: website.trim() || '',
                    agree: agree
                };

                console.log('Отправка данных:', formData);

                const submitBtn = form.querySelector('.callback__submit');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
                    successMsg.style.color = '#2ecc71';
                    successMsg.style.padding = '15px';
                    successMsg.style.textAlign = 'center';
                    successMsg.style.fontWeight = 'bold';

                    form.innerHTML = '';
                    form.appendChild(successMsg);
                }, 1000);
            }
        });
    }

    // Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Callback button handler
    const callbackBtn = document.getElementById('callbackBtn');
    if (callbackBtn) {
        callbackBtn.addEventListener('click', () => {
            const formSection = document.querySelector('.callback');
            if (formSection) {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});