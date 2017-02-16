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
require('rxjs/add/operator/switchMap');
var EditMenuComponent = (function () {
    function EditMenuComponent(menuService, router, route) {
        this.menuService = menuService;
        this.router = router;
        this.route = route;
        this.editItem = {};
    }
    EditMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.menuService.getMenuItem(params['id']); })
            .subscribe(function (menu) {
            _this.editItem = menu;
        });
    };
    EditMenuComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#menu').addClass("active");
    };
    EditMenuComponent.prototype.deleteItem = function (itemId) {
        this.menuService.deleteMenuItem(itemId).subscribe(function (data) { });
        this.router.navigate(['/menu']);
    };
    EditMenuComponent.prototype.saveItem = function (item) {
        var _this = this;
        $('#saveMenu').prop("disabled", true);
        this.menuService.saveMenuItem(item).subscribe(function (data) {
            if (data.msg) {
                _this.msg = data.msg;
            }
            else {
                _this.msg = "";
                _this.router.navigate(['/menu']);
            }
            $('#saveMenu').prop("disabled", false);
        });
    };
    EditMenuComponent.prototype.formDirty = function () {
        $('#saveMenu').prop("disabled", false);
    };
    EditMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu-edit',
            templateUrl: '../../components/menu-edit.component.html',
            providers: [menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, router_1.Router, router_1.ActivatedRoute])
    ], EditMenuComponent);
    return EditMenuComponent;
}());
exports.EditMenuComponent = EditMenuComponent;
//# sourceMappingURL=menu-edit.component.js.map