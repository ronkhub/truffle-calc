import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
  private breakpoint = inject(BreakpointObserver);
  isDesktop = signal(false);

  constructor() {
    this.breakpoint.observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .subscribe(state => {
        this.isDesktop.set(state.matches);
      });
  }
  title = 'TruffleCalc';

  navItems = [
    { path: '/calculator', label: 'Calcolatore', icon: 'calculate' },
    { path: '/catalog', label: 'Catalogo', icon: 'eco' },
    // size-tiers and history were removed from main navigation per admin UX
    { path: '/admin', label: 'Admin', icon: 'admin_panel_settings' }
  ];
}
