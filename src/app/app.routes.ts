import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InsertarComponent } from './insertar/insertar.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [ 
    { path: 'mascotas', component: InicioComponent },
    { path: 'mascotas/agregar', component: InsertarComponent }];



    
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
