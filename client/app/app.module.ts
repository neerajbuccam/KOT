import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-highcharts';

import { AppComponent }  from './app.component';
import { routing } from './app.routing';
import { sidebarComponent }  from './components/sidebar.component';
import { OrderComponent }  from './components/order.component';
import { OrderClearedComponent }  from './components/order-cleared.component';
import { CreateOrderComponent }  from './components/order-create.component';
import { EditOrderComponent }  from './components/order-edit.component';
import { MenuComponent }  from './components/menu.component';
import { CreateMenuComponent }  from './components/menu-create.component';
import { EditMenuComponent }  from './components/menu-edit.component';
import { ReportsComponent }  from './components/reports.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, ChartModule.forRoot(require('highcharts')) ],
  declarations: [ AppComponent, sidebarComponent, OrderComponent, OrderClearedComponent, CreateOrderComponent, EditOrderComponent, MenuComponent, CreateMenuComponent, EditMenuComponent, ReportsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
