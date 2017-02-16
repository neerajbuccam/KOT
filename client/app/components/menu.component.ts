import { Component, Input } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'menu-list',
    templateUrl: '../../components/menu.component.html',
    providers: [ MenuService ]
})

export class MenuComponent {
    menuItems: menuItem[];
    
    constructor(private menuService: MenuService, private router: Router){
        this.menuService.getMenu().subscribe( menu => { this.menuItems = menu });
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#menu').addClass("active");
    }
    
    editMenuItem(itemId){
        this.router.navigate(['/menu', itemId]);
    }
    
    deleteItem(itemId){
        this.menuService.deleteMenuItem(itemId).subscribe(data => {
            for(var i=0; i<this.menuItems.length; i++){
                if(this.menuItems[i]._id == itemId){
                    this.menuItems.splice(i, 1);
                }
            }
        });
    }
}

interface menuItem{
    id: number;
    name: string;
    price: number;
    prepareTime: number;
}