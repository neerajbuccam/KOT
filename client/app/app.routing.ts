import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent }  from './components/order.component';
import { OrderClearedComponent }  from './components/order-cleared.component';
import { CreateOrderComponent }  from './components/order-create.component';
import { EditOrderComponent }  from './components/order-edit.component';
import { MenuComponent }  from './components/menu.component';
import { CreateMenuComponent }  from './components/menu-create.component';
import { EditMenuComponent }  from './components/menu-edit.component';
import { ReportsComponent }  from './components/reports.component';


const appRoutes: Routes = [
    {
        path: '',
        component: OrderComponent
    },
    {
        path: 'order-cleared',
        component: OrderClearedComponent
    },
    {
        path: 'order-create',
        component: CreateOrderComponent
    },
    {
        path: 'order/:id',
        component: EditOrderComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    {
        path: 'menu-create',
        component: CreateMenuComponent
    },
    {
        path: 'menu/:id',
        component: EditMenuComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);