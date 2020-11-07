import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactsRoutes } from './contacts.routing';

import { MaterialModule } from '../material.module';
import { CompaniesComponent } from './companies/companies.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SharedModule } from '../shared/Shared.module';

@NgModule({
    imports: [
        RouterModule.forChild(ContactsRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
        SharedModule
    ],
    declarations: [ContactsComponent,CompaniesComponent]
})

export class ContactsModule {}
