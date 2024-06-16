import { Component, signal, Input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

export type MenuItem = {
  icon: string;
  label: string;
  route?: any;
}
@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.scss'
})
export class CustomSidenavComponent {

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  } 
  menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard', label: 'Dashboard', route: 'dashboard'
    },
    {
      icon: 'comments', label: 'Comments', route: 'comments'
    },
    {
      icon: 'analytics', label: 'Analytics', route: 'analytics'
    },
    {
      icon: 'settings', label: 'Settings', route: 'settings'
    }
  ]); 

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
