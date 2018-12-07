import {ToastType} from '@/enums/toast-type';

export interface ToastData {
  text: string;
  type: ToastType;
  dismissAfter: number;
}
