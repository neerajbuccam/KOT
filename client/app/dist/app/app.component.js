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
var AppComponent = (function () {
    function AppComponent() {
        this.url = window.location.pathname;
        if (this.url === '/menu' || this.url === '/menu-create' || this.url === '/menu/*') {
            this.ordersActive = false;
            this.menuActive = true;
        }
        else if (this.url === '/' || this.url === '/order-create' || this.url === '/order/*') {
            this.ordersActive = true;
            this.menuActive = false;
        }
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <header>\n        <div class=\"logo-wrap\">\n            <div class=\"logo\">Magzika</div>\n            <div class=\"logo-tagline\">Kitchen Manager</div>\n        </div>\n        <nav>{{url}}\n            <a id=\"orders\" routerLink=\"/\" [class.active]=\"ordersActive==true\">Orders</a>\n            <a id=\"menu\" routerLink=\"/menu\" [class.active]=\"menuActive==true\">Menu</a>\n            <a id=\"reports\" routerLink=\"/reports\" [class.active]=\"reportActive==true\">Reports</a>\n        </nav>\n    </header>\n    \n    <router-outlet></router-outlet>\n  ",
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map