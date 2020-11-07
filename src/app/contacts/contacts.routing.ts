import { Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { ContactsComponent } from './contacts/contacts.component';


export const ContactsRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'contacts',
        component: ContactsComponent
    }, {
        path: 'companies',
        component: CompaniesComponent
    }, {
    path: '',
    redirectTo: '/contacts/contacts',
    pathMatch: 'full'
  }]
}
];