import { useCallback, useEffect, useRef, useState } from 'react';
import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { Modal, type ModalProps } from '@/components/ui/modal/Modal';

export type UseModalResp = {
	modal: (children: ReactNode) => ReactNode;
	openModal: () => void;
	closeModal: () => void;
};

export type UseModalProps = Omit<ModalProps, 'children'> & {
	onModalOpen?: () => void;
	onModalClose?: () => void;
};

export const useModal = ({
	modalBoxClassName,
	onModalClose,
	onModalOpen,
	closeOnOutClick = true,
}: UseModalProps): UseModalResp => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [mounted, setMounted] = useState(false);

	const closeModal = useCallback(() => {
		dialogRef.current?.close();
		onModalClose?.();
		setMounted(false);
	}, [onModalClose]);

	const openModal = useCallback(() => {
		onModalOpen?.();
		setMounted(true);
		requestAnimationFrame(() => {
			dialogRef.current?.showModal();
		});
	}, [onModalOpen]);

	useEffect(() => {
		if (!mounted) return;
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') closeModal();
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [mounted, closeModal]);

	const modal = useCallback(
		(children: ReactNode) =>
			mounted
				? createPortal(
						<Modal
							close={closeModal}
							ref={dialogRef}
							modalBoxClassName={modalBoxClassName}
							closeOnOutClick={closeOnOutClick}
						>
							{children}
						</Modal>,
						document.body,
					)
				: null,
		[mounted, closeModal, modalBoxClassName, closeOnOutClick],
	);

	return { openModal, closeModal, modal };
};
