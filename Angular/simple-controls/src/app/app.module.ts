import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SelectListComponent } from './components/select-list/select-list.component';
import { SelectListExamplesComponent } from './components/select-list-examples/select-list-examples.component';

const routes: Routes = [
  { path:'select-boxes', component: SelectListExamplesComponent},
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent }
] 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SelectListComponent,
    SelectListExamplesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
