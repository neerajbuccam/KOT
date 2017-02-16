import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'menu-create',
    templateUrl: '../../components/menu-create.component.html',
    providers: [ MenuService ]
})

export class CreateMenuComponent  {
    itemRows: itemRow[];
    msg: string;
    
    constructor(private menuService: MenuService, private router: Router){
        this.resetForm();
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('#menu_addMenuItems').addClass("active");
        $('nav a').removeClass("active");
        $('#menu').addClass("active");
    }
    
    resetForm(){
        this.itemRows = [{
            name: '',
            price: null,
            prepareTime: null
        }];
    }
    
    addRow(){
        this.itemRows.push({
            name: '',
            price: null,
            prepareTime: null
        });
    }
    
    addMenuItems(){
        $('#addMenu').prop("disabled", true);
        
        this.menuService.addMenuItems(this.itemRows).subscribe(data => {
            if(data.msg){
                this.msg = data.msg;
            }
            else{
                this.msg = "";
                this.router.navigate(['/menu']);
            }
            $('#addMenu').prop("disabled", false);
        });
    }
    
    formDirty(){
        $('#addMenu').prop("disabled", false);
    }
}

interface itemRow{
    name: string;
    price: number;
    prepareTime: number;
}