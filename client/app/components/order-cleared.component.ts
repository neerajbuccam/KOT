import { Component } from '@angular/core';
import { GlobalComponent } from './global.component';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: '../../components/order-cleared.component.html',
    providers: [ OrderService ]
})

export class OrderClearedComponent {
    orders: order[];
    tables: string[];
    filter: search;
	searchDate: string;
    
    constructor(private router: Router, private orderService: OrderService){
        this.tables = new GlobalComponent().tables;
        this.filter = {
            table: '',
            tableTitle: '',
            date: {}
        };
        
        this.orderService.getClearedOrders().subscribe( order => {
			this.orders = Array.from(order) 
		});
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('#order_clearedTables').addClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    }
    
    editOrder(orderId){
        this.router.navigate(['/order', orderId]);
    }
	
	search(){
		if(typeof(this.searchDate) != 'undefined'){
			var date = this.searchDate.split("-");
			this.filter.date.year = Math.abs(date[0]);
			this.filter.date.month = Math.abs(date[1]);
			this.filter.date.date = Math.abs(date[2]);
		}
		
		this.orderService.filterOrders(this.filter).subscribe( orders => {
			this.orders = Array.from(orders);
		});
	}
}

interface order{
    table: number;
    tableTitle: string;
    orderItems: orderItems[];
    grandTotal: number;
    cashTendered: number;
    closeStatus: boolean;
}

interface orderItems{
    itemName: string;
    qty: number;
    unitPrice: number;
    total: number;
}

interface search{
    table: string;
    tableTitle: string;
    date: date;
}

interface date{
    year: number;
    month: number;
    date: number;
}