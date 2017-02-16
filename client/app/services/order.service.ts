import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService{
    host = window.location.hostname;
    port = window.location.port;

    constructor(private http: Http){ }
    
    getOrders(){
        return this.http.get('http://'+this.host+':'+this.port+'/orderApi/order')
            .map(res => res.json());
    }
    
    getActiveOrders(){
        return this.http.get('http://'+this.host+':'+this.port+'/orderApi/orderActive')
            .map(res => res.json());
    }
    
    getClearedOrders(){
        return this.http.get('http://'+this.host+':'+this.port+'/orderApi/orderCleared')
            .map(res => res.json());
    }
    
    getOrder(orderId){
        return this.http.get('http://'+this.host+':'+this.port+'/orderApi/order/'+orderId)
            .map(res => res.json());
    }
    
    addOrder(order){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://'+this.host+':'+this.port+'/orderApi/order', JSON.stringify(order), {headers: headers})
            .map(res => res.json());
    }
    
    saveAmtDue(order){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put('http://'+this.host+':'+this.port+'/orderApi/orderAmtDue/'+order._id, JSON.stringify(order), {headers: headers})
            .map(res => res.json());
    }
    
    saveOrder(order){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put('http://'+this.host+':'+this.port+'/orderApi/order/'+order._id, JSON.stringify(order), {headers: headers})
            .map(res => res.json());
    }
    
    closeOrder(order){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put('http://'+this.host+':'+this.port+'/orderApi/orderCloseOrder/'+order._id, JSON.stringify(order), {headers: headers})
            .map(res => res.json());
    }
    
    deleteOrder(orderId){
        return this.http.delete('http://'+this.host+':'+this.port+'/orderApi/order/'+orderId)
            .map(res => res.json());
    }
	
	filterOrders(filter){
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
	
		return this.http.post('http://'+this.host+':'+this.port+'/orderApi/search', JSON.stringify(filter), {headers: headers})
			.map(res => res.json());
	}
	
	getMonthlySales(){
		return this.http.get('http://'+this.host+':'+this.port+'/orderApi/monthlySales')
            .map(res => res.json());
	}
	
	getDailySales(){
		return this.http.get('http://'+this.host+':'+this.port+'/orderApi/dailySales')
            .map(res => res.json());
	}
}