import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './componentes/login/login.component';
import { LogupComponent } from './componentes/logup/logup.component';
import { ProductosComponent } from './componentes/productos/productos.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'Registro', component: LogupComponent },
  { path: 'productos', component: ProductosComponent, canActivate: [ AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
