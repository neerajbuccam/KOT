import { Component } from '@angular/core';
import { GlobalComponent } from './global.component';
import { OrderService } from '../services/order.service';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'order-create',
    templateUrl: '../../components/order-create.component.html',
    providers: [ OrderService, MenuService ]
})

export class CreateOrderComponent {
    order: order;
    menuItems: menu[];
    msg: string;
    tables: string[];
    
    constructor(private orderService: OrderService, private menuService: MenuService, private router: Router){
        this.resetForm();
        this.tables = new GlobalComponent().tables;
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('#order_newOrder').addClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    }
    
    resetForm(){
        this.order = {
            table: null,
            tableTitle: '',
            orderItems: [
                {
                    itemName: '',
                    qty: 0,
                    unitPrice: 0,
                    total: 0,
                    boxFocus: false
                }
            ],
            grandTotal: 0,
            cashTendered: 0,
            amtDue: 0,
            closeStatus: false
        };
    }
    
    calcTotals(){
        this.order.grandTotal = 0;
        
        for(var i=0; i<this.order.orderItems.length; i++){
            this.order.orderItems[i].total = (this.order.orderItems[i].qty * this.order.orderItems[i].unitPrice);
            this.order.grandTotal += this.order.orderItems[i].total;
        }
        
        this.calcAmtDue();
    }
    
    calcAmtDue(){
        this.order.amtDue = this.order.cashTendered - this.order.grandTotal;
    }
    
    decQty(i){
        var order = this.order.orderItems[i];
        
        if(order.qty > 1){
            order.qty--;
            this.calcTotals();
        }
        this.formDirty();
    }
    
    incQty(i){
        var order = this.order.orderItems[i];
        
        order.qty++;
        this.calcTotals();
        this.formDirty();
    }
        
    addRow(){
        this.order.orderItems.push({
            itemName: '',
            qty: 0,
            unitPrice: 0,
            total: 0,
            boxFocus: false
        });
    }
    
    searchMenuItem(i) {
        if(this.order.orderItems[i].itemName != ''){
           this.menuService.searchMenuItem(this.order.orderItems[i].itemName).subscribe(menu => {
                this.menuItems = menu;
                this.order.orderItems[i].boxFocus = true;
           });
        }
        else{
            this.menuItems = [];
            this.order.orderItems[i].boxFocus = false;
        }
    }
    
    selectMenu(i, j){
		var itemUnique = true;
		for(var k=0; k<this.order.orderItems.length; k++){
			if(this.order.orderItems[k].itemName == this.menuItems[j].name)
				itemUnique = false;
		}
		
		if(itemUnique == true){
			this.order.orderItems[i].itemName = this.menuItems[j].name;
			this.order.orderItems[i].qty = 1;
			this.order.orderItems[i].unitPrice = this.menuItems[j].price;
			this.calcTotals();
			this.order.orderItems[i].boxFocus = false;
		}
		else{
			this.msg = this.menuItems[j].name+" already exists, Change Qty of existing item";
			this.order.orderItems[i].itemName = '';
			this.order.orderItems[i].qty = 0;
			this.order.orderItems[i].unitPrice = 0;
			this.calcTotals();
			window.scrollTo(0,0);
		}
    }
    
    removeBoxFocus(){
        for(var i=0; i<this.order.orderItems.length; i++){
            this.order.orderItems[i].boxFocus = false;
        }
    }
    
    deleteItem(index){
        for(var i=0; i<this.order.orderItems.length; i++){
            if(i == index){
                this.order.orderItems.splice(i, 1);
            }
        }
        this.calcTotals();
    }
    
    addOrder(){
		for(var k=0; k<this.order.orderItems.length; k++){
			if(this.order.orderItems[k].itemName == '')
				this.deleteItem(k);
		}
        
        var datetime = this.getDate();
        
        this.order.dateCreated = {
            year: datetime.year,
            month: datetime.month,
            date: datetime.date,
            hour: datetime.hour,
            min: datetime.min,
            sec: datetime.sec
        };
        
        this.order.dateClosed = {};
    
        $('#addOrder').prop("disabled", true);
        this.calcTotals();
        this.order.cashTendered = 0;
        this.order.closeStatus = false;
        
        this.orderService.addOrder(this.order).subscribe(data => {
            if(data.msg){
                this.msg = data.msg;
                $('#addOrder').prop("disabled", false);
            }
            else{
                this.msg = "";
                this.router.navigate(['/']);
            }
        });
    }
    
    formDirty(){
        $('#addOrder').prop("disabled", false);
    }
    
    getDate(){
        var datetime = {};
        var d = new Date();
        
        datetime.year = d.getFullYear();
        datetime.month = d.getMonth() + 1;
        datetime.date = d.getDate();
        datetime.hour = d.getHours();
        datetime.min = d.getMinutes();
        datetime.sec = d.getSeconds();
        
        return datetime;
    }
}

interface order{
    table: string;
    tableTitle: string;
    orderItems: orderItems[];
    grandTotal: number;
    cashTendered: number;
    amtDue: number;
    closeStatus: boolean;
    dateCreated: date;
    dateClosed: date;
}

interface orderItems{
    itemName: string;
    qty: number;
    unitPrice: number;
    total: number;
    boxFocus: boolean;
}

interface menu{
    name: string;
    price: number;
    prepareTime: number;
}

interface date{
    year: number;
    month: number;
    date: number;
    hour: number;
    min: number;
    sec: number;
}