import React from 'react';
import { FormProps, Form as RACForm } from 'react-aria-components';
import { cx } from '@/lib/cva.config';

export function Form(props: FormProps) {
  return <RACForm {...props} className={cx('grid gap-4', props.className)} />;
}
