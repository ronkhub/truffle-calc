import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TruffleCalc';
  
  navItems = [
    { path: '/calculator', label: 'Calculator', icon: 'calculate' },
    { path: '/catalog', label: 'Catalog', icon: 'eco' },
    { path: '/size-tiers', label: 'Size Tiers', icon: 'straighten' },
    { path: '/history', label: 'Price History', icon: 'history' }
  ];
}
