import { NgModule } from '@angular/core';
import { SharedModule } from 'custom/shared/shared.module';
import { OrderComponent } from './list/order.component';
import { OrderDetailComponent } from './detail/order-detail.component';
import { OrderUpdateComponent } from './update/order-update.component';
import { OrderDeleteDialogComponent } from './delete/order-delete-dialog.component';
import { OrderRoutingModule } from './route/order-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [SharedModule, OrderRoutingModule, NgxDatatableModule],
  declarations: [OrderComponent, OrderDetailComponent, OrderUpdateComponent, OrderDeleteDialogComponent],
})
export class OrderModule {}
