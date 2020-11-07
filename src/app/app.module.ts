import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {MatNativeDateModule} from '@angular/material/core';

import { AppComponent } from './app.component';

import { SharedModule } from './shared/Shared.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';

import { AppRoutes } from './app.routing';
import { DataTablesModule } from 'angular-datatables';
import { MaterialModule } from './material.module';
import { ServiceModule } from './service.module';


@NgModule({
    imports:      [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        HttpClientModule,
        MaterialModule,
        DataTablesModule,
        SharedModule,
        ServiceModule
    ],
    declarations: [
      AppComponent,
      AdminLayoutComponent,
      AuthLayoutComponent
    ],
    providers : [
      MatNativeDateModule
    ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }
