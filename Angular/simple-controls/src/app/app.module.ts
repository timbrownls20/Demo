import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule, Component, Input, forwardRef } from '@angular/core';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR  } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SelectListComponent } from './components/select-list/select-list.component';
import { SelectListExamplesComponent } from './components/select-list-examples/select-list-examples.component';

const routes: Routes = [
  { path:'select-boxes', component: SelectListExamplesComponent},
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent }
];

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = { 
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectListComponent),
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectListComponent,
    SelectListExamplesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  bootstrap: [AppComponent]
})
export class AppModule { }
