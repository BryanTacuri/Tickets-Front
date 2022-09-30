import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesAdminRoutingModule } from './admin-routing.module';
import { AddComponent } from './pages-planes/add/add.component';
import { SlugifyPipe } from '../Pipes/slugify.pipe';

import { ListComponent } from './pages-planes/list/list.component';
import { NgZorroModule } from '../ngzorro/ngzorro.module';
import { BarraModule } from '../barra/barra.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages-planes/edit/edit.component';

@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent, SlugifyPipe],
  imports: [
    CommonModule,
    NgZorroModule,
    PlanesAdminRoutingModule,

    BarraModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SlugifyPipe],
  providers: [SlugifyPipe],
})
export class PlanesAdminModule {}
