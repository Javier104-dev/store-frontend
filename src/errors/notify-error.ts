import { notificationService } from '@/services/notification.service';

export const notifyError = (errorOrMessage: string | Error) => {
	if (errorOrMessage instanceof Error) {
		notificationService.error(errorOrMessage.message);
	} else {
		notificationService.error(errorOrMessage);
	}
};
