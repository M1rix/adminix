import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IOrder, NewOrder } from '../order.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IOrder for edit and NewOrderFormGroupInput for create.
 */
type OrderFormGroupInput = IOrder | PartialWithRequiredKeyOf<NewOrder>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IOrder | NewOrder> = Omit<T, 'createdDate' | 'lastModifiedDate'> & {
  createdDate?: string | null;
  lastModifiedDate?: string | null;
};

type OrderFormRawValue = FormValueOf<IOrder>;

type NewOrderFormRawValue = FormValueOf<NewOrder>;

type OrderFormDefaults = Pick<NewOrder, 'id' | 'createdDate' | 'lastModifiedDate'>;

type OrderFormGroupContent = {
  id: FormControl<OrderFormRawValue['id'] | NewOrder['id']>;
  width: FormControl<OrderFormRawValue['width']>;
  height: FormControl<OrderFormRawValue['height']>;
  status: FormControl<OrderFormRawValue['status']>;
  fileName: FormControl<OrderFormRawValue['fileName']>;
  comment: FormControl<OrderFormRawValue['comment']>;
  createdBy: FormControl<OrderFormRawValue['createdBy']>;
  createdDate: FormControl<OrderFormRawValue['createdDate']>;
  lastModifiedBy: FormControl<OrderFormRawValue['lastModifiedBy']>;
  lastModifiedDate: FormControl<OrderFormRawValue['lastModifiedDate']>;
};

export type OrderFormGroup = FormGroup<OrderFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class OrderFormService {
  createOrderFormGroup(order: OrderFormGroupInput = { id: null }): OrderFormGroup {
    const orderRawValue = this.convertOrderToOrderRawValue({
      ...this.getFormDefaults(),
      ...order,
    });
    return new FormGroup<OrderFormGroupContent>({
      id: new FormControl(
        { value: orderRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      width: new FormControl(orderRawValue.width),
      height: new FormControl(orderRawValue.height),
      status: new FormControl(orderRawValue.status, {
        validators: [Validators.required],
      }),
      fileName: new FormControl(orderRawValue.fileName, {
        validators: [Validators.maxLength(255)],
      }),
      comment: new FormControl(orderRawValue.comment, {
        validators: [Validators.maxLength(255)],
      }),
      createdBy: new FormControl(orderRawValue.createdBy, {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      createdDate: new FormControl(orderRawValue.createdDate),
      lastModifiedBy: new FormControl(orderRawValue.lastModifiedBy, {
        validators: [Validators.maxLength(50)],
      }),
      lastModifiedDate: new FormControl(orderRawValue.lastModifiedDate),
    });
  }

  getOrder(form: OrderFormGroup): IOrder | NewOrder {
    return this.convertOrderRawValueToOrder(form.getRawValue() as OrderFormRawValue | NewOrderFormRawValue);
  }

  resetForm(form: OrderFormGroup, order: OrderFormGroupInput): void {
    const orderRawValue = this.convertOrderToOrderRawValue({ ...this.getFormDefaults(), ...order });
    form.reset(
      {
        ...orderRawValue,
        id: { value: orderRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): OrderFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      createdDate: currentTime,
      lastModifiedDate: currentTime,
    };
  }

  private convertOrderRawValueToOrder(rawOrder: OrderFormRawValue | NewOrderFormRawValue): IOrder | NewOrder {
    return {
      ...rawOrder,
      createdDate: dayjs(rawOrder.createdDate, DATE_TIME_FORMAT),
      lastModifiedDate: dayjs(rawOrder.lastModifiedDate, DATE_TIME_FORMAT),
    };
  }

  private convertOrderToOrderRawValue(
    order: IOrder | (Partial<NewOrder> & OrderFormDefaults)
  ): OrderFormRawValue | PartialWithRequiredKeyOf<NewOrderFormRawValue> {
    return {
      ...order,
      createdDate: order.createdDate ? order.createdDate.format(DATE_TIME_FORMAT) : undefined,
      lastModifiedDate: order.lastModifiedDate ? order.lastModifiedDate.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
