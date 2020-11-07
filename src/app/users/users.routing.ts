import { Routes } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';


export const UsersRoutes: Routes = [
    {
      path: '',
      children: [ {
        path: 'users',
        component: UsersComponent
    },{
      path: 'roles',
      component: RolesComponent
  }, {
    path: '',
    redirectTo: '/users/users',
    pathMatch: 'full'
  }]
}
];