import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideMenuComponent } from './alone/components/side-menu/side-menu.component';

const routes: Routes = [
  {
    path: 'maps',
    loadChildren: () => import('./maps/maps.module').then((m) => m.MapsModule),
  },
  {
    // enrutamiento de un standalone component
    path: 'alone',
    loadComponent: () =>
      import('./alone/pages/alone-page/alone-page.component').then(
        (m) => m.AlonePageComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'maps',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
