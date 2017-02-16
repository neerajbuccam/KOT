import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'sidebar',
  templateUrl: '../../components/sidebar.component.html'
})

export class sidebarComponent {
    @Input() page: string;
}