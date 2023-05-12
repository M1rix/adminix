import dayjs from 'dayjs/esm';

import { OrderStatus } from 'app/entities/enumerations/order-status.model';

import { IOrder, NewOrder } from './order.model';

export const sampleWithRequiredData: IOrder = {
  id: 47761,
  status: OrderStatus['IN_PROGRESS'],
  createdBy: 'New Parks Handcrafted',
};

export const sampleWithPartialData: IOrder = {
  id: 57558,
  width: 96762,
  status: OrderStatus['IN_PROGRESS'],
  fileName: 'indigo microchip Fantastic',
  createdBy: 'International',
  createdDate: dayjs('2023-05-07T21:11'),
  lastModifiedDate: dayjs('2023-05-07T08:00'),
};

export const sampleWithFullData: IOrder = {
  id: 8122,
  width: 91093,
  height: 25173,
  status: OrderStatus['IN_PROGRESS'],
  fileName: 'capacitor',
  comment: 'Multi-layered secured',
  createdBy: 'Dynamic',
  createdDate: dayjs('2023-05-07T16:24'),
  lastModifiedBy: 'copying Frozen Shoes',
  lastModifiedDate: dayjs('2023-05-07T19:07'),
};

export const sampleWithNewData: NewOrder = {
  status: OrderStatus['AVAILABLE'],
  createdBy: 'Savings',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
