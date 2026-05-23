import z from 'zod';

import { STORE_FORM_MESSAGES } from '@/features/store/components/form/messages/store-form.messages';

export const storeFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, STORE_FORM_MESSAGES.NAME_REQUIRED)
    .min(8, STORE_FORM_MESSAGES.NAME_MIN),
});
