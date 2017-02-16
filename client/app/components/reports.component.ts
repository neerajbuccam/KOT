import { Component } from '@angular/core';
import { GlobalComponent } from './global.component';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'order',
    templateUrl: '../../components/reports.component.html',
    providers: [ OrderService ]
})

export class ReportsComponent {
    orders: order[];
    tables: string[];
    filter: search;
	searchDate: string;
	sumTotal: number;
	chartDate: date;
	monthlySalesChartOptions: Object;
	dailySalesChartOptions: Object;
	monthlySalesData: number[];
	dailySalesData: number[];
    
    constructor(private router: Router, private orderService: OrderService){        
		this.tables = new GlobalComponent().tables;
        this.filter = {
            table: '',
            tableTitle: '',
            date: {}
        };
        
        this.orderService.getOrders().subscribe( order => {
			this.orders = Array.from(order);
			this.getSumTotal();
		});
		
		this.getMonthlySales();		
		this.getDailySales();		
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('#reports').addClass("active");
        $('nav a').removeClass("active");
        $('#orders').addClass("active");
    }
	
	getMonthlySales(){
		this.monthlySalesData = [0,0,0,0,0,0,0,0,0,0,0,0];
		
		this.orderService.getMonthlySales().subscribe( data => {
			var data = Array.from(data);
			for(var i=0; i<data.length; i++){
				for(var j=0; j<12; j++){
					if(data[i] && data[i]._id.month == j+1){
						this.monthlySalesData[j] = data[i].grandTotal;
					}
				}
			}
			
			this.monthlySalesChartOptions = {
				xAxis: {
					categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
				},
				yAxis: {
					title: {
						enabled: true,
						text: '<b>Rupees</b>'
					}
				},
				title : {
					text : '<b>Monthly Sales</b>',
					style: { "fontSize": "14px" }
				},
				series: [{
					name: 'Months',
					data: this.monthlySalesData,
				}],
				credits: {
					enabled: false
				}
			};
		});
	}
	
	getDailySales(){
		this.dailySalesData = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
		
		this.orderService.getDailySales().subscribe( data => {
			var data = Array.from(data);
			
			if(this.filter.date.month)
				this.chartDate = this.filter.date;
			else{
				var d = new Date();
				this.chartDate = {
					year: d.getFullYear(),
					month: d.getMonth()+1,
					date: d.getDate()
				};
			}
			
			var month;
			switch (this.chartDate.month) {
				case 1:
					month = "January"; break;
				case 2:
					month = "February"; break;
				case 3:
					month = "March"; break;
				case 4:
					month = "April"; break;
				case 5:
					month = "May"; break;
				case 6:
					month = "June"; break;
				case 7:
					month = "July"; break;
				case 8:
					month = "August"; break;
				case 9:
					month = "September"; break;
				case 10:
					month = "October"; break;
				case 11:
					month = "November"; break;
				case 12:
					month = "December"; break;
			}
			
			for(var i=0; i<data.length; i++){
				for(var j=0; j<31; j++){
					if(data[i] && 
						data[i]._id.year == this.chartDate.year && 
						data[i]._id.month == this.chartDate.month && 
						data[i]._id.date == j){
						this.dailySalesData[j] = data[i].grandTotal;
					}
				}
			}
			
			this.dailySalesChartOptions = {
				xAxis: {
					min: 1,
					max: 31,
					tickInterval: 1
				},
				yAxis: {
					title: {
						enabled: true,
						text: '<b>Rupees</b>'
					}
				},
				title : {
					text : '<b>Daily Sales</b>',
					style: { "fontSize": "14px" }
				},
				series: [{
					name: month,
					data: this.dailySalesData
				}],
				credits: {
					enabled: false
				}
			};
		});
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
			this.getDailySales();
			this.orders = Array.from(orders);
			this.getSumTotal();
		});
	}
	
	getSumTotal(){
		this.sumTotal = 0;
		
		for(var k=0; k<this.orders.length; k++){
			this.sumTotal += this.orders[k].grandTotal;
		}
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