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
var MenuService = (function () {
    function MenuService(http) {
        this.http = http;
        this.host = window.location.hostname;
        this.port = window.location.port;
    }
    MenuService.prototype.getMenu = function () {
        return this.http.get('http://' + this.host + ':' + this.port + '/menuApi/menu')
            .map(function (res) { return res.json(); });
    };
    MenuService.prototype.getMenuItem = function (itemId) {
        return this.http.get('http://' + this.host + ':' + this.port + '/menuApi/menu/' + itemId)
            .map(function (res) { return res.json(); });
    };
    MenuService.prototype.addMenuItems = function (items) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://' + this.host + ':' + this.port + '/menuApi/menu', JSON.stringify(items), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MenuService.prototype.deleteMenuItem = function (itemId) {
        return this.http.delete('http://' + this.host + ':' + this.port + '/menuApi/menu/' + itemId)
            .map(function (res) { return res.json(); });
    };
    MenuService.prototype.saveMenuItem = function (item) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://' + this.host + ':' + this.port + '/menuApi/menu/' + item._id, JSON.stringify(item), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MenuService.prototype.searchMenuItem = function (word) {
        return this.http.get('http://' + this.host + ':' + this.port + '/menuApi/menuSearch/' + word)
            .map(function (res) { return res.json(); });
    };
    MenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=menu.service.js.map