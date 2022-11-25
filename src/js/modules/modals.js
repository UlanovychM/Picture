const modals = () => {
	let btnPressed = false;

	function bindModal(
		triggerSelector,
		modalSelector,
		closeSelector,
		destroy = false
	) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const windows = document.querySelectorAll('[data-modal]');
		const scroll = calcScroll();

		trigger.forEach(item => {
			item.addEventListener('click', e => {
				if (e.target) {
					e.preventDefault();
				}

				if (destroy) {
					item.remove();
				}

				btnPressed = true;

				windows.forEach(item => {
					item.style.display = 'none';
					item.classList.add('animated', 'fadeIn');
				});

				modal.style.display = 'block';
				document.body.classList.add('modal-open');
				document.body.style.marginRight = `${scroll}px`;
			});
		});

		close.addEventListener('click', () => {
			windows.forEach(item => {
				item.style.display = 'none';
			});

			modal.style.display = 'none';
			document.body.classList.remove('modal-open');
		});

		modal.addEventListener('click', e => {
			if (e.target === modal) {
				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'none';
				document.body.classList.remove('modal-open');
				document.body.style.marginRight = `${0}px`;
			}
		});
	}

	function showModalByTime(selector, time) {
		setTimeout(() => {
			let display;

			document.querySelectorAll('[data-modal]').forEach(item => {
				if (getComputedStyle(item).display !== 'none') {
					display = 'block';
				}
			});

			if (!display) {
				document.querySelector(selector).style.display = 'block';
				document.body.style.overflow = 'hidden';
				let scroll = calcScroll();
				document.body.style.marginRight = `${scroll}px`;
			}
		}, time);
	}

	function calcScroll() {
		let div = document.createElement('div');

		div.style.width = '50px';
		div.style.height = '50px';
		div.style.overflow = 'scroll';
		div.style.visibility = 'hidden';

		document.body.appendChild(div);
		let scrollWidth = div.offsetWidth - div.clientWidth;
		div.remove();

		return scrollWidth;
	}

	function openBySelector(selector) {
		window.addEventListener('scroll', () => {
			let scrollHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			if (
				!btnPressed &&
				window.pageYOffset + document.documentElement.clientHeight >=
					scrollHeight - 1
			) {
				document.querySelector(selector).click();
			}
		});
	}

	bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
	bindModal(
		'.button-consultation',
		'.popup-consultation',
		'.popup-consultation .popup-close'
	);
	bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
	openBySelector('.fixed-gift');
	// showModalByTime('.popup-consultation', 60000);
};

export default modals;
