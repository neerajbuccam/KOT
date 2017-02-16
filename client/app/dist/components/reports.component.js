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
var ReportsComponent = (function () {
    function ReportsComponent(router, orderService) {
        var _this = this;
        this.router = router;
        this.orderService = orderService;
        this.tables = new global_component_1.GlobalComponent().tables;
        this.filter = {
            table: '',
            tableTitle: '',
            date: {}
        };
        this.orderService.getOrders().subscribe(function (order) {
            _this.orders = Array.from(order);
            _this.getSumTotal();
        });
        this.getMonthlySales();
        this.getDailySales();
    }
    ReportsComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('#reports').addClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    };
    ReportsComponent.prototype.getMonthlySales = function () {
        var _this = this;
        this.monthlySalesData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.orderService.getMonthlySales().subscribe(function (data) {
            var data = Array.from(data);
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < 12; j++) {
                    if (data[i] && data[i]._id.month == j + 1) {
                        _this.monthlySalesData[j] = data[i].grandTotal;
                    }
                }
            }
            _this.monthlySalesChartOptions = {
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        enabled: true,
                        text: '<b>Rupees</b>'
                    }
                },
                title: {
                    text: '<b>Monthly Sales</b>',
                    style: { "fontSize": "14px" }
                },
                series: [{
                        name: 'Months',
                        data: _this.monthlySalesData,
                    }],
                credits: {
                    enabled: false
                }
            };
        });
    };
    ReportsComponent.prototype.getDailySales = function () {
        var _this = this;
        this.dailySalesData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.orderService.getDailySales().subscribe(function (data) {
            var data = Array.from(data);
            if (_this.filter.date.month)
                _this.chartDate = _this.filter.date;
            else {
                var d = new Date();
                _this.chartDate = {
                    year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    date: d.getDate()
                };
            }
            var month;
            switch (_this.chartDate.month) {
                case 1:
                    month = "January";
                    break;
                case 2:
                    month = "February";
                    break;
                case 3:
                    month = "March";
                    break;
                case 4:
                    month = "April";
                    break;
                case 5:
                    month = "May";
                    break;
                case 6:
                    month = "June";
                    break;
                case 7:
                    month = "July";
                    break;
                case 8:
                    month = "August";
                    break;
                case 9:
                    month = "September";
                    break;
                case 10:
                    month = "October";
                    break;
                case 11:
                    month = "November";
                    break;
                case 12:
                    month = "December";
                    break;
            }
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < 31; j++) {
                    if (data[i] &&
                        data[i]._id.year == _this.chartDate.year &&
                        data[i]._id.month == _this.chartDate.month &&
                        data[i]._id.date == j) {
                        _this.dailySalesData[j] = data[i].grandTotal;
                    }
                }
            }
            _this.dailySalesChartOptions = {
                xAxis: {
                    min: 1,
                    max: 31,
                    tickInterval: 1
                },
                yAxis: {
                    title: {
                        enabled: true,
                        text: '<b>Rupees</b>'
                    }
                },
                title: {
                    text: '<b>Daily Sales</b>',
                    style: { "fontSize": "14px" }
                },
                series: [{
                        name: month,
                        data: _this.dailySalesData
                    }],
                credits: {
                    enabled: false
                }
            };
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
            _this.getDailySales();
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
            templateUrl: '../../components/reports.component.html',
            providers: [order_service_1.OrderService]
        }), 
        __metadata('design:paramtypes', [router_1.Router, order_service_1.OrderService])
    ], ReportsComponent);
    return ReportsComponent;
}());
exports.ReportsComponent = ReportsComponent;
//# sourceMappingURL=reports.component.js.map