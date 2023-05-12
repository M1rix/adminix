import dayjs from 'dayjs/esm';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

export interface IOrder {
  id: number;
  width?: number | null;
  height?: number | null;
  status?: OrderStatus | null;
  fileName?: string | null;
  comment?: string | null;
  createdBy?: string | null;
  createdDate?: dayjs.Dayjs | null;
  lastModifiedBy?: string | null;
  lastModifiedDate?: dayjs.Dayjs | null;
}

export type NewOrder = Omit<IOrder, 'id'> & { id: null };
