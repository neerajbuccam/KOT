"use strict";
var router_1 = require('@angular/router');
var order_component_1 = require('./components/order.component');
var order_cleared_component_1 = require('./components/order-cleared.component');
var order_create_component_1 = require('./components/order-create.component');
var order_edit_component_1 = require('./components/order-edit.component');
var menu_component_1 = require('./components/menu.component');
var menu_create_component_1 = require('./components/menu-create.component');
var menu_edit_component_1 = require('./components/menu-edit.component');
var reports_component_1 = require('./components/reports.component');
var appRoutes = [
    {
        path: '',
        component: order_component_1.OrderComponent
    },
    {
        path: 'order-cleared',
        component: order_cleared_component_1.OrderClearedComponent
    },
    {
        path: 'order-create',
        component: order_create_component_1.CreateOrderComponent
    },
    {
        path: 'order/:id',
        component: order_edit_component_1.EditOrderComponent
    },
    {
        path: 'menu',
        component: menu_component_1.MenuComponent
    },
    {
        path: 'menu-create',
        component: menu_create_component_1.CreateMenuComponent
    },
    {
        path: 'menu/:id',
        component: menu_edit_component_1.EditMenuComponent
    },
    {
        path: 'reports',
        component: reports_component_1.ReportsComponent
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map