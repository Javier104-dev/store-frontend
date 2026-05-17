import {
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Modal, type ModalProps } from '@/components/ui/modal/Modal';

export type UseModalResp = {
	modal: ReactNode;
	openModal: () => void;
	closeModal: () => void;
};

export type UseModalProps = Omit<ModalProps, 'children'> & {
	children: (closeModal: () => void) => ReactNode;
	onModalOpen?: () => void;
	onModalClose?: () => void;
};

export const useModal = ({
	children,
	modalBoxClassName,
	onModalClose,
	onModalOpen,
	closeOnOutClick = true,
}: UseModalProps): UseModalResp => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);
	const [mounted, setMounted] = useState(false);

	const closeModal = useCallback(() => {
		onModalClose?.();
		setMounted(false);
	}, [onModalClose]);

	const handleClose = useCallback(() => {
		dialogRef.current?.close();
		closeModal();
	}, [closeModal]);

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
			if (event.key === 'Escape') handleClose();
		};
		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [mounted, handleClose]);

	const modal = mounted
		? createPortal(
				<Modal
					close={handleClose}
					ref={dialogRef}
					modalBoxClassName={modalBoxClassName}
					closeOnOutClick={closeOnOutClick}
				>
					{children(closeModal)}
				</Modal>,
				document.body,
			)
		: null;

	return { openModal, closeModal: handleClose, modal };
};
