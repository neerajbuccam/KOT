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
var menu_service_1 = require('../services/menu.service');
var router_1 = require('@angular/router');
var CreateOrderComponent = (function () {
    function CreateOrderComponent(orderService, menuService, router) {
        this.orderService = orderService;
        this.menuService = menuService;
        this.router = router;
        this.resetForm();
        this.tables = new global_component_1.GlobalComponent().tables;
    }
    CreateOrderComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('#order_newOrder').addClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    };
    CreateOrderComponent.prototype.resetForm = function () {
        this.order = {
            table: null,
            tableTitle: '',
            orderItems: [
                {
                    itemName: '',
                    qty: 0,
                    unitPrice: 0,
                    total: 0,
                    boxFocus: false
                }
            ],
            grandTotal: 0,
            cashTendered: 0,
            amtDue: 0,
            closeStatus: false
        };
    };
    CreateOrderComponent.prototype.calcTotals = function () {
        this.order.grandTotal = 0;
        for (var i = 0; i < this.order.orderItems.length; i++) {
            this.order.orderItems[i].total = (this.order.orderItems[i].qty * this.order.orderItems[i].unitPrice);
            this.order.grandTotal += this.order.orderItems[i].total;
        }
        this.calcAmtDue();
    };
    CreateOrderComponent.prototype.calcAmtDue = function () {
        this.order.amtDue = this.order.cashTendered - this.order.grandTotal;
    };
    CreateOrderComponent.prototype.decQty = function (i) {
        var order = this.order.orderItems[i];
        if (order.qty > 1) {
            order.qty--;
            this.calcTotals();
        }
        this.formDirty();
    };
    CreateOrderComponent.prototype.incQty = function (i) {
        var order = this.order.orderItems[i];
        order.qty++;
        this.calcTotals();
        this.formDirty();
    };
    CreateOrderComponent.prototype.addRow = function () {
        this.order.orderItems.push({
            itemName: '',
            qty: 0,
            unitPrice: 0,
            total: 0,
            boxFocus: false
        });
    };
    CreateOrderComponent.prototype.searchMenuItem = function (i) {
        var _this = this;
        if (this.order.orderItems[i].itemName != '') {
            this.menuService.searchMenuItem(this.order.orderItems[i].itemName).subscribe(function (menu) {
                _this.menuItems = menu;
                _this.order.orderItems[i].boxFocus = true;
            });
        }
        else {
            this.menuItems = [];
            this.order.orderItems[i].boxFocus = false;
        }
    };
    CreateOrderComponent.prototype.selectMenu = function (i, j) {
        var itemUnique = true;
        for (var k = 0; k < this.order.orderItems.length; k++) {
            if (this.order.orderItems[k].itemName == this.menuItems[j].name)
                itemUnique = false;
        }
        if (itemUnique == true) {
            this.order.orderItems[i].itemName = this.menuItems[j].name;
            this.order.orderItems[i].qty = 1;
            this.order.orderItems[i].unitPrice = this.menuItems[j].price;
            this.calcTotals();
            this.order.orderItems[i].boxFocus = false;
        }
        else {
            this.msg = this.menuItems[j].name + " already exists, Change Qty of existing item";
            this.order.orderItems[i].itemName = '';
            this.order.orderItems[i].qty = 0;
            this.order.orderItems[i].unitPrice = 0;
            this.calcTotals();
            window.scrollTo(0, 0);
        }
    };
    CreateOrderComponent.prototype.removeBoxFocus = function () {
        for (var i = 0; i < this.order.orderItems.length; i++) {
            this.order.orderItems[i].boxFocus = false;
        }
    };
    CreateOrderComponent.prototype.deleteItem = function (index) {
        for (var i = 0; i < this.order.orderItems.length; i++) {
            if (i == index) {
                this.order.orderItems.splice(i, 1);
            }
        }
        this.calcTotals();
    };
    CreateOrderComponent.prototype.addOrder = function () {
        var _this = this;
        for (var k = 0; k < this.order.orderItems.length; k++) {
            if (this.order.orderItems[k].itemName == '')
                this.deleteItem(k);
        }
        var datetime = this.getDate();
        this.order.dateCreated = {
            year: datetime.year,
            month: datetime.month,
            date: datetime.date,
            hour: datetime.hour,
            min: datetime.min,
            sec: datetime.sec
        };
        this.order.dateClosed = {};
        $('#addOrder').prop("disabled", true);
        this.calcTotals();
        this.order.cashTendered = 0;
        this.order.closeStatus = false;
        this.orderService.addOrder(this.order).subscribe(function (data) {
            if (data.msg) {
                _this.msg = data.msg;
                $('#addOrder').prop("disabled", false);
            }
            else {
                _this.msg = "";
                _this.router.navigate(['/']);
            }
        });
    };
    CreateOrderComponent.prototype.formDirty = function () {
        $('#addOrder').prop("disabled", false);
    };
    CreateOrderComponent.prototype.getDate = function () {
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
    CreateOrderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order-create',
            templateUrl: '../../components/order-create.component.html',
            providers: [order_service_1.OrderService, menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, menu_service_1.MenuService, router_1.Router])
    ], CreateOrderComponent);
    return CreateOrderComponent;
}());
exports.CreateOrderComponent = CreateOrderComponent;
//# sourceMappingURL=order-create.component.js.map