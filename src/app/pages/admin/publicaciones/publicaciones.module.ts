import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionesComponent } from './publicaciones.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { ModalModule } from 'ngx-bootstrap/modal';

const routes: Routes = [
  { path: '', component: PublicacionesComponent }
];

@NgModule({
  declarations: [
    PublicacionesComponent,
    PublicacionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PublicacionesModule { }
