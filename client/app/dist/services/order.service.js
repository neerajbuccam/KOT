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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
        this.host = window.location.hostname;
        this.port = window.location.port;
    }
    OrderService.prototype.getOrders = function () {
        return this.http.get('http://' + this.host + ':' + this.port + '/orderApi/order')
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.getActiveOrders = function () {
        return this.http.get('http://' + this.host + ':' + this.port + '/orderApi/orderActive')
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.getClearedOrders = function () {
        return this.http.get('http://' + this.host + ':' + this.port + '/orderApi/orderCleared')
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.getOrder = function (orderId) {
        return this.http.get('http://' + this.host + ':' + this.port + '/orderApi/order/' + orderId)
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.addOrder = function (order) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://' + this.host + ':' + this.port + '/orderApi/order', JSON.stringify(order), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.saveAmtDue = function (order) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://' + this.host + ':' + this.port + '/orderApi/orderAmtDue/' + order._id, JSON.stringify(order), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.saveOrder = function (order) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://' + this.host + ':' + this.port + '/orderApi/order/' + order._id, JSON.stringify(order), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.closeOrder = function (order) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://' + this.host + ':' + this.port + '/orderApi/orderCloseOrder/' + order._id, JSON.stringify(order), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.deleteOrder = function (orderId) {
        return this.http.delete('http://' + this.host + ':' + this.port + '/orderApi/order/' + orderId)
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.filterOrders = function (filter) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://' + this.host + ':' + this.port + '/orderApi/search', JSON.stringify(filter), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.getMonthlySales = function () {
        return this.http.get('http://' + this.host + ':' + this.port + '/orderApi/monthlySales')
            .map(function (res) { return res.json(); });
    };
    OrderService.prototype.getDailySales = function () {
        return this.http.get('http://' + this.host + ':' + this.port + '/orderApi/dailySales')
            .map(function (res) { return res.json(); });
    };
    OrderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map