"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var sidebar_component_1 = require('./components/sidebar.component');
var order_component_1 = require('./components/order.component');
var order_cleared_component_1 = require('./components/order-cleared.component');
var order_create_component_1 = require('./components/order-create.component');
var order_edit_component_1 = require('./components/order-edit.component');
var menu_component_1 = require('./components/menu.component');
var menu_create_component_1 = require('./components/menu-create.component');
var menu_edit_component_1 = require('./components/menu-edit.component');
var reports_component_1 = require('./components/reports.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.routing],
            declarations: [app_component_1.AppComponent, sidebar_component_1.sidebarComponent, order_component_1.OrderComponent, order_cleared_component_1.OrderClearedComponent, order_create_component_1.CreateOrderComponent, order_edit_component_1.EditOrderComponent, menu_component_1.MenuComponent, menu_create_component_1.CreateMenuComponent, menu_edit_component_1.EditMenuComponent, reports_component_1.ReportsComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map