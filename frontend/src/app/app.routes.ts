import { Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { PaymentsComponent } from './payments/payments.component';

export const routes: Routes = [
    { path: '', redirectTo: 'grid', pathMatch: 'full' },
    { path: 'grid', component: GridComponent },
    { path: 'payments', component: PaymentsComponent },
];
