import { Component } from '@angular/core';
import { OrderService } from '../services/order.service';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'order-edit',
    templateUrl: '../../components/order-edit.component.html',
    providers: [ OrderService, MenuService ]
})

export class EditOrderComponent  {
    msg: string;
    editItem: any = {};
    orderTitles: String[];
    titleBoxFocus: boolean;
    menuItems: menu[];
    dateNow: any;
	timeNow: any;
	
    constructor(private orderService: OrderService, private menuService: MenuService, private router: Router, private route: ActivatedRoute){

    }
    
    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.orderService.getOrder(params['id']))
        .subscribe(order => {
            this.editItem = order
        });
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    }
    
    calcTotals(){
        this.editItem.grandTotal = 0;
        
        for(var i=0; i<this.editItem.orderItems.length; i++){
            this.editItem.orderItems[i].total = (this.editItem.orderItems[i].qty * this.editItem.orderItems[i].unitPrice);
            this.editItem.grandTotal += this.editItem.orderItems[i].total;
        }
        
        this.editItem.amtDue = this.editItem.cashTendered - this.editItem.grandTotal;
    }
    
    decQty(i){
        var order = this.editItem.orderItems[i];
        
        if(order.qty > 1){
            order.qty--;
            this.calcTotals();
        }
        this.formDirty();
    }
    
    incQty(i){
        var order = this.editItem.orderItems[i];
        
        order.qty++;
        this.calcTotals();
        this.formDirty();
    }
    
    deleteItem(item){
        const index = this.editItem.orderItems.indexOf(item);
        this.editItem.orderItems.splice(index, 1);
        this.calcTotals();
    }
        
    addRow(){
        this.editItem.orderItems.push({
            itemName: '',
            qty: 0,
            unitPrice: 0,
            total: 0,
            boxFocus: false
        });
    }
    
    searchTitles(tableTitle){
        if(tableTitle.value != ''){
           this.orderService.searchOrderTitles(tableTitle.value).subscribe(titles => {
                this.orderTitles = titles;
                this.titleBoxFocus = true;
           });
        }
        else{
            this.orderTitles = [];
            this.titleBoxFocus = false;
        }
    }

    selectTitle(i){
        this.editItem.tableTitle = this.orderTitles[i];
    }

    searchMenuItem(i, itemName) {
        if(itemName.value != ''){
           this.menuService.searchMenuItem(itemName.value).subscribe(menu => {
                this.menuItems = menu;
                this.editItem.orderItems[i].boxFocus = true;
           });
        }
        else{
            this.menuItems = [];
            this.editItem.orderItems[i].boxFocus = false;
        }
    }
    
    selectMenu(i, j){
		var itemUnique = true;
		for(var k=0; k<this.editItem.orderItems.length; k++){
			if(this.editItem.orderItems[k].itemName == this.menuItems[j].name)
				itemUnique = false;
		}
		
		if(itemUnique == true){
			this.editItem.orderItems[i].itemName = this.menuItems[j].name;
			this.editItem.orderItems[i].qty = 1;
			this.editItem.orderItems[i].unitPrice = this.menuItems[j].price;
			this.calcTotals();
			this.editItem.orderItems[i].boxFocus = false;
		}
		else{
			this.msg = this.menuItems[j].name+" already exists, Change Qty of existing item";
			this.editItem.orderItems[i].itemName = '';
			this.editItem.orderItems[i].qty = 0;
			this.editItem.orderItems[i].unitPrice = 0;
			this.calcTotals();
			window.scrollTo(0,0);
		}
    }
    
    removeBoxFocus(){
        this.titleBoxFocus = false;
        for(var i=0; i<this.editItem.orderItems.length; i++){
            this.editItem.orderItems[i].boxFocus = false;
        }
    }
    
    saveAmtDue(){
        this.orderService.saveAmtDue(this.editItem).subscribe( data => {} );
    }
    
    closeOrder(){
        var datetime = this.getDate();
        
        this.editItem.dateClosed = {
            year: datetime.year,
            month: datetime.month,
            date: datetime.date,
            hour: datetime.hour,
            min: datetime.min,
            sec: datetime.sec
        };
        
        this.orderService.closeOrder(this.editItem).subscribe( data => {
            this.router.navigate(['/']);
        });
    }
    
    deleteOrder(){
        this.orderService.deleteOrder(this.editItem._id).subscribe( data => {
            this.router.navigate(['/']);
        });
    }
    
    saveOrder(){
		for(var k=0; k<this.editItem.orderItems.length; k++){
			if(this.editItem.orderItems[k].itemName == '')
				this.deleteItem(k);
		}
		
        $('#saveOrder').prop("disabled", true);
        this.calcTotals();
        
        this.orderService.saveOrder(this.editItem).subscribe(data => {
            if(data.msg){
                this.msg = data.msg;
            }
            else{
                this.msg = "Order Saved!";
                this.router.navigate(['/']);
            }
            $('#saveOrder').prop("disabled", false);
        });
    }
    
    formDirty(){
        $('#saveOrder').prop("disabled", false);
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
	
	PrintBill(){		
		let printContents, popupWin;
		printContents = document.getElementById('printDiv').innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		popupWin.document.open();
		popupWin.document.write(`
		  <html>
			<head>
			  	<link rel="stylesheet" href="../../includes/styles.css">
    			<link rel="stylesheet" href="../../includes/font-awesome4.2.min.css">
    			<link rel="stylesheet" href="../../includes/bootstrap3.3.7.min.css">
			</head>
			<body onload="window.print();">${printContents}</body>
		  </html>`
		);
		popupWin.document.close();
	}
	
	getTimeNow(){
		//	remove invalid items
		for(var k=0; k<this.editItem.orderItems.length; k++){
			if(this.editItem.orderItems[k].itemName == '')
				this.deleteItem(k);
		}
		
		var d = new Date();		
		var hours = d.getHours();
  		var minutes = d.getMinutes();
  		var ampm = hours >= 12 ? 'pm' : 'am';
  		
		hours = hours % 12;
  		hours = hours ? hours : 12;
  		minutes = minutes < 10 ? '0'+minutes : minutes;
  		
		this.timeNow = hours + ':' + minutes + ' ' + ampm;
		this.dateNow = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
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