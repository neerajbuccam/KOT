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
var angular2_google_chart_directive_1 = require('angular2-google-chart/directives/angular2-google-chart.directive');
var ReportsComponent = (function () {
    function ReportsComponent(router, orderService) {
        var _this = this;
        this.router = router;
        this.orderService = orderService;
        this.line_ChartData = [
            ['Year', 'Sales', 'Expenses'],
            ['2004', 1000, 400],
            ['2005', 1170, 460],
            ['2006', 660, 1120],
            ['2007', 1030, 540]];
        this.tables = new global_component_1.GlobalComponent().tables;
        this.filter = {
            table: '',
            tableTitle: '',
            date: {}
        };
        this.orderService.getClearedOrders().subscribe(function (order) {
            _this.orders = Array.from(order);
            _this.getSumTotal();
        });
    }
    ReportsComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#reports').addClass("active");
    };
    ReportsComponent.prototype.getMonthlySales = function () {
        var _this = this;
        this.router.getMonthlySales().subscribe(function (data) {
            for (var i = 1; i <= 12; i++) {
                if (data._id.month == i) {
                    _this.monthlySales.push(data.grandTotal);
                }
                else {
                    _this.monthlySales.push(0);
                }
            }
        });
    };
    ReportsComponent.prototype.editOrder = function (orderId) {
        this.router.navigate(['/order', orderId]);
    };
    ReportsComponent.prototype.search = function () {
        var _this = this;
        if (typeof (this.searchDate) != 'undefined') {
            var date = this.searchDate.split("-");
            this.filter.date.year = Math.abs(date[0]);
            this.filter.date.month = Math.abs(date[1]);
            this.filter.date.date = Math.abs(date[2]);
        }
        this.orderService.filterOrders(this.filter).subscribe(function (orders) {
            _this.orders = Array.from(orders);
            _this.getSumTotal();
        });
    };
    ReportsComponent.prototype.getSumTotal = function () {
        this.sumTotal = 0;
        for (var k = 0; k < this.orders.length; k++) {
            this.sumTotal += this.orders[k].grandTotal;
        }
    };
    ReportsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order',
            directives: [angular2_google_chart_directive_1.GoogleChart],
            templateUrl: '../../components/reports.component.html',
            providers: [order_service_1.OrderService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, order_service_1.OrderService])
    ], ReportsComponent);
    return ReportsComponent;
}());
exports.ReportsComponent = ReportsComponent;
//# sourceMappingURL=reports.component.js.map