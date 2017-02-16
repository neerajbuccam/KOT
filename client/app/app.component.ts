import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <header>
        <div class="logo-wrap">
            <div class="logo">Magzika</div>
            <div class="logo-tagline">Kitchen Manager</div>
        </div>
        <nav>{{url}}
            <a id="orders" routerLink="/" [class.active]="ordersActive==true">Orders</a>
            <a id="menu" routerLink="/menu" [class.active]="menuActive==true">Menu</a>
        </nav>
    </header>
    
    <router-outlet></router-outlet>
  `,
})

export class AppComponent  {
    url: string;
    ordersActive: boolean;
    menuActive: boolean;

    constructor(){
        this.url = window.location.pathname;
        
        if(this.url === '/menu' || this.url === '/menu-create' || this.url === '/menu/*'){
            this.ordersActive = false;
            this.menuActive = true;
        }
        else if(this.url === '/' || this.url === '/order-create' || this.url === '/order/*'){
            this.ordersActive = true;
            this.menuActive = false;
        }
    }

}