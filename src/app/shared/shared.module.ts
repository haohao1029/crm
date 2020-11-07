import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DatatablesComponent } from './datatables/datatables.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FixedpluginComponent } from './fixedplugin/fixedplugin.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DatatableComponent } from './datatable/datatable.component';

@NgModule({
    imports: [ RouterModule, CommonModule, DataTablesModule, FormsModule, ReactiveFormsModule, MaterialModule ],
    declarations: [ DatatablesComponent, FormComponent, NavbarComponent, FooterComponent, FixedpluginComponent, SidebarComponent, DatatableComponent ],
    exports: [ DatatablesComponent, FormComponent, NavbarComponent, FooterComponent, FixedpluginComponent, SidebarComponent, DatatableComponent ]
})

export class SharedModule {}
