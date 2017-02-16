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
var CreateMenuComponent = (function () {
    function CreateMenuComponent(menuService, router) {
        this.menuService = menuService;
        this.router = router;
        this.resetForm();
    }
    CreateMenuComponent.prototype.ngAfterViewInit = function () {
        $('li').removeClass("active");
        $('#menu_addMenuItems').addClass("active");
        $('nav a').removeClass("active");
        $('#menu').addClass("active");
    };
    CreateMenuComponent.prototype.resetForm = function () {
        this.itemRows = [{
                name: '',
                price: null,
                prepareTime: null
            }];
    };
    CreateMenuComponent.prototype.addRow = function () {
        this.itemRows.push({
            name: '',
            price: null,
            prepareTime: null
        });
    };
    CreateMenuComponent.prototype.addMenuItems = function () {
        var _this = this;
        $('#addMenu').prop("disabled", true);
        this.menuService.addMenuItems(this.itemRows).subscribe(function (data) {
            if (data.msg) {
                _this.msg = data.msg;
            }
            else {
                _this.msg = "";
                _this.router.navigate(['/menu']);
            }
            $('#addMenu').prop("disabled", false);
        });
    };
    CreateMenuComponent.prototype.formDirty = function () {
        $('#addMenu').prop("disabled", false);
    };
    CreateMenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menu-create',
            templateUrl: '../../components/menu-create.component.html',
            providers: [menu_service_1.MenuService]
        }), 
        __metadata('design:paramtypes', [menu_service_1.MenuService, router_1.Router])
    ], CreateMenuComponent);
    return CreateMenuComponent;
}());
exports.CreateMenuComponent = CreateMenuComponent;
//# sourceMappingURL=menu-create.component.js.map