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
var global_component_1 = require('./global.component');
var order_service_1 = require('../services/order.service');
var router_1 = require('@angular/router');
var OrderClearedComponent = (function () {
    function OrderClearedComponent(router, orderService) {
        var _this = this;
        this.router = router;
        this.orderService = orderService;
        this.tables = new global_component_1.GlobalComponent().tables;
        this.filter = {
            table: '',
            tableTitle: '',
            date: {}
        };
        this.orderService.getClearedOrders().subscribe(function (order) {
            _this.orders = Array.from(order);
        });
    }
    OrderClearedComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('#order_clearedTables').addClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    };
    OrderClearedComponent.prototype.editOrder = function (orderId) {
        this.router.navigate(['/order', orderId]);
    };
    OrderClearedComponent.prototype.search = function () {
        var _this = this;
        if (typeof (this.searchDate) != 'undefined') {
            var date = this.searchDate.split("-");
            this.filter.date.year = Math.abs(date[0]);
            this.filter.date.month = Math.abs(date[1]);
            this.filter.date.date = Math.abs(date[2]);
        }
        this.orderService.filterOrders(this.filter).subscribe(function (orders) {
            _this.orders = Array.from(orders);
        });
    };
    OrderClearedComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order',
            templateUrl: '../../components/order-cleared.component.html',
            providers: [order_service_1.OrderService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, order_service_1.OrderService])
    ], OrderClearedComponent);
    return OrderClearedComponent;
}());
exports.OrderClearedComponent = OrderClearedComponent;
//# sourceMappingURL=order-cleared.component.js.map