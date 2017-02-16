import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MenuService{
    host = window.location.hostname;
    port = window.location.port;

    constructor(private http: Http){ }
    
    getMenu(){
        return this.http.get('http://'+this.host+':'+this.port+'/menuApi/menu')
            .map(res => res.json());
    }
    
    getMenuItem(itemId){
        return this.http.get('http://'+this.host+':'+this.port+'/menuApi/menu/'+itemId)
            .map(res => res.json());
    }
    
    addMenuItems(items){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.post('http://'+this.host+':'+this.port+'/menuApi/menu', JSON.stringify(items), {headers: headers})
            .map(res => res.json());
    }
    
    deleteMenuItem(itemId){
        return this.http.delete('http://'+this.host+':'+this.port+'/menuApi/menu/'+itemId)
            .map(res => res.json());
    }
    
    saveMenuItem(item){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        
        return this.http.put('http://'+this.host+':'+this.port+'/menuApi/menu/'+item._id, JSON.stringify(item), {headers: headers})
            .map(res => res.json());
    }
    
    searchMenuItem(word){
        return this.http.get('http://'+this.host+':'+this.port+'/menuApi/menuSearch/'+word)
            .map(res => res.json());
    }
}