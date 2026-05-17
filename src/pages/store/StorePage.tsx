import { useNavigate } from 'react-router-dom';

import Spinner from '@/components/ui/feedback/Spinner';
import PageLayout from '@/components/ui/layout/PageLayout';
import VStack from '@/components/ui/layout/VStack';
import { StoreRoutes } from '@/configs/router/StoreRoutes.enum';
import { notifyError } from '@/errors/notify-error';
import StoreForm from '@/features/store/components/form/StoreForm';
import { STORE_FORM_CONFIG } from '@/features/store/constants/store-form.config';
import { STORE_TOAST_MESSAGES } from '@/features/store/constants/store-toast-messages';
import { StoreQueryKeys } from '@/features/store/constants/store.queryKeys';
import { useStore } from '@/features/store/hooks/useStore';
import type { IStoreFormValues } from '@/features/store/interfaces/form/IStoreFormValues';
import type { IStore } from '@/features/store/interfaces/types/IStore';
import { storeService } from '@/features/store/services/store.service';
import useInvalidateQueries from '@/hooks/query/useInvalidateQueries';
import useMutate from '@/hooks/query/useMutate';
import { notificationService } from '@/services/notification.service';

const defaultValues: IStoreFormValues = {
	name: '',
};

const StorePage = () => {
	const navigate = useNavigate();
	const { invalidateQueryKeys } = useInvalidateQueries();

	const { storeInfo, isLoading } = useStore();
	const storeId = storeInfo?.id ?? '';
	const isEdit = Boolean(storeId);

	const { mutate: createStore, isPending: createStoreIsPending } = useMutate({
		mutationFn: storeService.createStore,
		onSuccess: () => {
			navigate(StoreRoutes.MANAGE_PRODUCTS);
		},
	});

	const { mutate: updateStore, isPending: updateStoreIsPending } = useMutate({
		mutationFn: storeService.updateStore,
		onSuccess: () => {
			invalidateQueryKeys([StoreQueryKeys.getStoreFronOwner]);
			navigate(StoreRoutes.MANAGE_PRODUCTS);
		},
	});

	const config = isEdit ? STORE_FORM_CONFIG.edit : STORE_FORM_CONFIG.create;
	const mutation = isEdit ? updateStore : createStore;
	const isPending = createStoreIsPending || updateStoreIsPending;
	const mutationMessage = isEdit
		? STORE_TOAST_MESSAGES.updated
		: STORE_TOAST_MESSAGES.created;

	const handleStoreSubmit = (values: IStoreFormValues) => {
		mutation(values, {
			onSuccess: () => {
				notificationService.success(mutationMessage);
			},
			onError: (error) => {
				notifyError(error);
			},
		});
	};

	const handleDefaultValues = (storeInfo?: IStore): IStoreFormValues => {
		if (isEdit && storeInfo) {
			return {
				name: storeInfo.name,
			};
		}
		return defaultValues;
	};

	return (
		<PageLayout>
			<VStack dataTest="store-products">
				{isLoading && <Spinner />}
				{!isLoading && (
					<StoreForm
						handleStoreSubmit={handleStoreSubmit}
						defaultValues={handleDefaultValues(storeInfo)}
						isSubmitting={isPending}
						title={config.title}
						submitText={config.submitText}
					/>
				)}
			</VStack>
		</PageLayout>
	);
};

export default StorePage;
