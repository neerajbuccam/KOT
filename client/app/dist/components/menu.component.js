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
var menu_service_1 = require('../services/menu.service');
var router_1 = require('@angular/router');
var MenuComponent = (function () {
    function MenuComponent(menuService, router) {
        var _this = this;
        this.menuService = menuService;
        this.router = router;
        this.menuService.getMenu().subscribe(function (menu) { _this.menuItems = menu; });
    }
    MenuComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#menu').addClass("active");
    };
    MenuComponent.prototype.editMenuItem = function (itemId) {
        this.router.navigate(['/menu', itemId]);
    };
    MenuComponent.prototype.deleteItem = function (itemId) {
        var _this = this;
        this.menuService.deleteMenuItem(itemId).subscribe(function (data) {
            for (var i = 0; i < _this.menuItems.length; i++) {
                if (_this.menuItems[i]._id == itemId) {
                    _this.menuItems.splice(i, 1);
                }
            }
        });
    };
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu-list',
            templateUrl: '../../components/menu.component.html',
            providers: [menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, router_1.Router])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map