const modals = () => {
	function bindModal(
		triggerSelector,
		modalSelector,
		closeSelector,
		closeClickOverlay = true
	) {
		const trigger = document.querySelectorAll(triggerSelector);
		const modal = document.querySelector(modalSelector);
		const close = document.querySelector(closeSelector);
		const windows = document.querySelectorAll('[data-modal]');

		trigger.forEach(item => {
			item.addEventListener('click', e => {
				if (e.target) {
					e.preventDefault();
				}

				windows.forEach(item => {
					item.style.display = 'none';
				});

				modal.style.display = 'block';
				document.body.classList.add('modal-open');
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
			}
		});
	}
};

export default modals;
