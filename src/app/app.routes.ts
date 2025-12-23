import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'calculator',
    pathMatch: 'full'
  },
  {
    path: 'calculator',
    loadComponent: () => import('./components/calculator/calculator.component')
      .then(m => m.CalculatorComponent),
    title: 'TruffleCalc - Calculator'
  },
  {
    path: 'catalogo',
    redirectTo: 'catalog',
    pathMatch: 'full'
  },
  {
    path: 'catalog',
    loadComponent: () => import('./components/truffle-catalog/truffle-catalog.component')
      .then(m => m.TruffleCatalogComponent),
    title: 'TruffleCalc - Catalog'
  },
  {
    path: 'size-tiers',
    loadComponent: () => import('./components/size-tiers/size-tiers.component')
      .then(m => m.SizeTiersComponent),
    title: 'TruffleCalc - Size Tiers'
  },
  {
    path: 'history',
    loadComponent: () => import('./components/price-history/price-history.component')
      .then(m => m.PriceHistoryComponent),
    title: 'TruffleCalc - Price History'
  },
  {
    path: 'admin',
    loadComponent: () => import('./components/admin/truffle-admin.component')
      .then(m => m.TruffleAdminComponent),
    title: 'TruffleCalc - Admin'
  },
  {
    path: '**',
    redirectTo: 'calculator'
  }
];
