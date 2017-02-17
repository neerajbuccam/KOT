import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: '../../components/order.component.html',
    providers: [ OrderService ]
})

export class OrderComponent  {
    orders: order[];
    
    constructor(private router: Router, private orderService: OrderService){        
        this.orderService.getActiveOrders()
            .subscribe( order => { this.orders = Array.from(order) });
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    }
    
    editOrder(orderId){
        this.router.navigate(['/order', orderId]);
    }
    
    getDate(){
        var datetime = {};
        var d = new Date();
        
        datetime = {
			year: d.getFullYear(),
        	month: d.getMonth() + 1,
        	date: d.getDate(),
        	hour: d.getHours(),
        	min: d.getMinutes(),
        	sec: d.getSeconds()
        };
		
        return datetime;
    }
    
    closeOrder(orderId, i){
        var datetime = this.getDate();
        
        this.orders[i].dateClosed = {
            year: datetime.year,
            month: datetime.month,
            date: datetime.date,
            hour: datetime.hour,
            min: datetime.min,
            sec: datetime.sec
        };
        
        this.orderService.closeOrder(this.orders[i]).subscribe( data => {
            for(var i=0; i<this.orders.length; i++){
                if(this.orders[i]._id == orderId){
                    this.orders.splice(i, 1);
                }
            }
        });
    }
    
    decQty(i, j){
        var order = this.orders[i].orderItems[j];
        
        if(order.qty > 1){
            order.qty--;
            order.total = order.unitPrice * order.qty;
            this.calcTotals(i);
            this.saveOrder(i);
        }
    }
    
    incQty(i, j){
        var order = 
		this.orders[i].orderItems[j];
        
        order.qty++;
        order.total = order.unitPrice * order.qty;
        this.calcTotals(i);
        this.saveOrder(i);
    }
    
    calcTotals(i){
        this.orders[i].grandTotal = 0;
        
        for(var j=0; j<this.orders[i].orderItems.length; j++){
            this.orders[i].orderItems[j].total = (this.orders[i].orderItems[j].qty * this.orders[i].orderItems[j].unitPrice);
            this.orders[i].grandTotal += this.orders[i].orderItems[j].total;
        }
        
        this.orders[i].amtDue = this.orders[i].cashTendered - this.orders[i].grandTotal;
    }
    
    saveOrder(i){
        this.orderService.saveOrder(this.orders[i]).subscribe(data => { });
    }
}

interface order{
    table: number;
    tableTitle: string;
    orderItems: orderItems[];
    grandTotal: number;
    cashTendered: number;
    closeStatus: boolean;
    dateCreated: date;
    dateClosed: date;
}

interface orderItems{
    itemName: string;
    qty: number;
    unitPrice: number;
    total: number;
}