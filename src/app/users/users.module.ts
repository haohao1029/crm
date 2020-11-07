import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { UsersRoutes } from './users.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/Shared.module';
import { RolesComponent } from './roles/roles.component';



@NgModule({
  declarations: [UsersComponent, RolesComponent],
  imports: [
    RouterModule.forChild(UsersRoutes),
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule
]
})
export class UsersModule { }
