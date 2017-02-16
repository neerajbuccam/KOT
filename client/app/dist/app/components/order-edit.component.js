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
var menu_service_1 = require('../services/menu.service');
var router_1 = require('@angular/router');
require('rxjs/add/operator/switchMap');
var EditOrderComponent = (function () {
    function EditOrderComponent(orderService, menuService, router, route) {
        this.orderService = orderService;
        this.menuService = menuService;
        this.router = router;
        this.route = route;
        this.editItem = {};
    }
    EditOrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.orderService.getOrder(params['id']); })
            .subscribe(function (order) {
            _this.editItem = order;
        });
    };
    EditOrderComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    };
    EditOrderComponent.prototype.calcTotals = function () {
        this.editItem.grandTotal = 0;
        for (var i = 0; i < this.editItem.orderItems.length; i++) {
            this.editItem.orderItems[i].total = (this.editItem.orderItems[i].qty * this.editItem.orderItems[i].unitPrice);
            this.editItem.grandTotal += this.editItem.orderItems[i].total;
        }
        this.editItem.amtDue = this.editItem.cashTendered - this.editItem.grandTotal;
    };
    EditOrderComponent.prototype.decQty = function (i) {
        var order = this.editItem.orderItems[i];
        if (order.qty > 1) {
            order.qty--;
            this.calcTotals();
        }
        this.formDirty();
    };
    EditOrderComponent.prototype.incQty = function (i) {
        var order = this.editItem.orderItems[i];
        order.qty++;
        this.calcTotals();
        this.formDirty();
    };
    EditOrderComponent.prototype.deleteItem = function (index) {
        for (var i = 0; i < this.editItem.orderItems.length; i++) {
            if (i == index) {
                this.editItem.orderItems.splice(i, 1);
            }
        }
        this.calcTotals();
    };
    EditOrderComponent.prototype.addRow = function () {
        this.editItem.orderItems.push({
            itemName: '',
            qty: 0,
            unitPrice: 0,
            total: 0,
            boxFocus: false
        });
    };
    EditOrderComponent.prototype.searchMenuItem = function (i) {
        var _this = this;
        if (this.editItem.orderItems[i].itemName != '') {
            this.menuService.searchMenuItem(this.editItem.orderItems[i].itemName).subscribe(function (menu) {
                _this.menuItems = menu;
                _this.editItem.orderItems[i].boxFocus = true;
            });
        }
        else {
            this.menuItems = [];
            this.editItem.orderItems[i].boxFocus = false;
        }
    };
    EditOrderComponent.prototype.selectMenu = function (i, j) {
        var itemUnique = true;
        for (var k = 0; k < this.editItem.orderItems.length; k++) {
            if (this.editItem.orderItems[k].itemName == this.menuItems[j].name)
                itemUnique = false;
        }
        if (itemUnique == true) {
            this.editItem.orderItems[i].itemName = this.menuItems[j].name;
            this.editItem.orderItems[i].qty = 1;
            this.editItem.orderItems[i].unitPrice = this.menuItems[j].price;
            this.calcTotals();
            this.editItem.orderItems[i].boxFocus = false;
        }
        else {
            this.msg = this.menuItems[j].name + " already exists, Change Qty of existing item";
            this.editItem.orderItems[i].itemName = '';
            this.editItem.orderItems[i].qty = 0;
            this.editItem.orderItems[i].unitPrice = 0;
            this.calcTotals();
            window.scrollTo(0, 0);
        }
    };
    EditOrderComponent.prototype.removeBoxFocus = function () {
        for (var i = 0; i < this.editItem.orderItems.length; i++) {
            this.editItem.orderItems[i].boxFocus = false;
        }
    };
    EditOrderComponent.prototype.saveAmtDue = function () {
        this.orderService.saveAmtDue(this.editItem).subscribe(function (data) { });
    };
    EditOrderComponent.prototype.closeOrder = function () {
        var _this = this;
        var datetime = this.getDate();
        this.editItem.dateClosed = {
            year: datetime.year,
            month: datetime.month,
            date: datetime.date,
            hour: datetime.hour,
            min: datetime.min,
            sec: datetime.sec
        };
        this.orderService.closeOrder(this.editItem).subscribe(function (data) {
            _this.router.navigate(['/']);
        });
    };
    EditOrderComponent.prototype.deleteOrder = function () {
        var _this = this;
        this.orderService.deleteOrder(this.editItem._id).subscribe(function (data) {
            _this.router.navigate(['/']);
        });
    };
    EditOrderComponent.prototype.saveOrder = function () {
        var _this = this;
        for (var k = 0; k < this.editItem.orderItems.length; k++) {
            if (this.editItem.orderItems[k].itemName == '')
                this.deleteItem(k);
        }
        $('#saveOrder').prop("disabled", true);
        this.calcTotals();
        this.orderService.saveOrder(this.editItem).subscribe(function (data) {
            if (data.msg) {
                _this.msg = data.msg;
            }
            else {
                _this.msg = "Order Saved!";
                _this.router.navigate(['/']);
            }
            $('#saveOrder').prop("disabled", false);
        });
    };
    EditOrderComponent.prototype.formDirty = function () {
        $('#saveOrder').prop("disabled", false);
    };
    EditOrderComponent.prototype.getDate = function () {
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
    EditOrderComponent.prototype.PrintBill = function () {
        var printContents, popupWin;
        printContents = document.getElementById('printDiv').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write("\n\t\t  <html>\n\t\t\t<head>\n\t\t\t  \t<link rel=\"stylesheet\" href=\"../../includes/styles.css\">\n    \t\t\t<link rel=\"stylesheet\" href=\"../../includes/font-awesome4.2.min.css\">\n    \t\t\t<link rel=\"stylesheet\" href=\"../../includes/bootstrap3.3.7.min.css\">\n\t\t\t</head>\n\t\t\t<body onload=\"window.print();\">" + printContents + "</body>\n\t\t  </html>");
        popupWin.document.close();
    };
    EditOrderComponent.prototype.getTimeNow = function () {
        //	remove invalid items
        for (var k = 0; k < this.editItem.orderItems.length; k++) {
            if (this.editItem.orderItems[k].itemName == '')
                this.deleteItem(k);
        }
        var d = new Date();
        var hours = d.getHours();
        var minutes = d.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        this.timeNow = hours + ':' + minutes + ' ' + ampm;
        this.dateNow = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    };
    EditOrderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'order-edit',
            templateUrl: '../../components/order-edit.component.html',
            providers: [order_service_1.OrderService, menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService, menu_service_1.MenuService, router_1.Router, router_1.ActivatedRoute])
    ], EditOrderComponent);
    return EditOrderComponent;
}());
exports.EditOrderComponent = EditOrderComponent;
//# sourceMappingURL=order-edit.component.js.map