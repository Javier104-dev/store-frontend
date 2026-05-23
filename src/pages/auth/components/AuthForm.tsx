import { Form } from 'formik';

import type { IReactChildrenProps } from '@/interfaces/IReactChildren';

export default function AuthForm({ children }: IReactChildrenProps) {
  return <Form className="max-w-md mx-auto w-full">{children}</Form>;
}
