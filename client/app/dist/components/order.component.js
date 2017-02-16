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
var order_service_1 = require('../services/order.service');
var router_1 = require('@angular/router');
var OrderComponent = (function () {
    function OrderComponent(router, orderService) {
        var _this = this;
        this.router = router;
        this.orderService = orderService;
        this.orderService.getActiveOrders()
            .subscribe(function (order) { _this.orders = Array.from(order); });
    }
    OrderComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    };
    OrderComponent.prototype.editOrder = function (orderId) {
        this.router.navigate(['/order', orderId]);
    };
    OrderComponent.prototype.getDate = function () {
        var datetime = {};
        var d = new Date();
        datetime.year = d.getFullYear();
        datetime.month = d.getMonth() + 1;
        datetime.date = d.getDate();
        datetime.hour = d.getHours();
        datetime.min = d.getMinutes();
        datetime.sec = d.getSeconds();
        return datetime;
    };
    OrderComponent.prototype.closeOrder = function (orderId, i) {
        var _this = this;
        var datetime = this.getDate();
        this.orders[i].dateClosed = {
            year: datetime.year,
            month: datetime.month,
            date: datetime.date,
            hour: datetime.hour,
            min: datetime.min,
            sec: datetime.sec
        };
        this.orderService.closeOrder(this.orders[i]).subscribe(function (data) {
            for (var i = 0; i < _this.orders.length; i++) {
                if (_this.orders[i]._id == orderId) {
                    _this.orders.splice(i, 1);
                }
            }
        });
    };
    OrderComponent.prototype.decQty = function (i, j) {
        var order = this.orders[i].orderItems[j];
        if (order.qty > 1) {
            order.qty--;
            order.total = order.unitPrice * order.qty;
            this.calcTotals(i);
            this.saveOrder(i);
        }
    };
    OrderComponent.prototype.incQty = function (i, j) {
        var order = this.orders[i].orderItems[j];
        order.qty++;
        order.total = order.unitPrice * order.qty;
        this.calcTotals(i);
        this.saveOrder(i);
    };
    OrderComponent.prototype.calcTotals = function (i) {
        this.orders[i].grandTotal = 0;
        for (var j = 0; j < this.orders[i].orderItems.length; j++) {
            this.orders[i].orderItems[j].total = (this.orders[i].orderItems[j].qty * this.orders[i].orderItems[j].unitPrice);
            this.orders[i].grandTotal += this.orders[i].orderItems[j].total;
        }
        this.orders[i].amtDue = this.orders[i].cashTendered - this.orders[i].grandTotal;
    };
    OrderComponent.prototype.saveOrder = function (i) {
        this.orderService.saveOrder(this.orders[i]).subscribe(function (data) { });
    };
    OrderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order',
            templateUrl: '../../components/order.component.html',
            providers: [order_service_1.OrderService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, order_service_1.OrderService])
    ], OrderComponent);
    return OrderComponent;
}());
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map