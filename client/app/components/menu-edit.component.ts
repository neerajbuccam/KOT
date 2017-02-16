import { Component } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'menu-edit',
    templateUrl: '../../components/menu-edit.component.html',
    providers: [ MenuService ]
})

export class EditMenuComponent  {
    editItem: any = {};
    msg: string;
    
    constructor(private menuService: MenuService, private router: Router, private route: ActivatedRoute){
    
    }
    
    ngOnInit() {
        this.route.params
        .switchMap((params: Params) => this.menuService.getMenuItem(params['id']))
        .subscribe(menu => {
            this.editItem = menu
        });
    }
    
    ngAfterViewInit(){
        $('li').removeClass("active");
        $('nav a').removeClass("active");
        $('#menu').addClass("active");
    }
    
    deleteItem(itemId){        
        this.menuService.deleteMenuItem(itemId).subscribe(data => {});
        this.router.navigate(['/menu']);
    }
    
    saveItem(item){
        $('#saveMenu').prop("disabled", true);
        
        this.menuService.saveMenuItem(item).subscribe(data => {
            if(data.msg){
                this.msg = data.msg;
            }
            else{
                this.msg = "";
                this.router.navigate(['/menu']);
            }
            $('#saveMenu').prop("disabled", false);
        });
    }
    
    formDirty(){
        $('#saveMenu').prop("disabled", false);
    }
}

interface menuItem{
    id: number;
    name: string;
    price: number;
    prepareTime: number;
}