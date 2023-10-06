import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgConfirmModule } from 'ng-confirm-box';


import { AppComponent } from './app.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NavbarComponent } from './sharepage/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgConfirmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
