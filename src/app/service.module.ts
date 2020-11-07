import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacadeService } from './facade.service';
import { DatatablesService } from './shared/datatables/datatables.service';
import { FormService } from './shared/form/form.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    FacadeService,
    DatatablesService,
    FormService
  ]
})
export class ServiceModule { }
