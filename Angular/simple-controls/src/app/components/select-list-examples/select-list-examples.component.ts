import { Component, OnInit } from '@angular/core';
import { SelectListItem, SelectListComponent } from '../select-list/select-list.component';

@Component({
  selector: 'app-/select-list-examples',
  templateUrl: './/select-list-examples.component.html',
  styleUrls: ['./select-list-examples.component.css']
})
export class SelectListExamplesComponent implements OnInit {

  model: SelectListExamplesViewModel;

  constructor() { 
    this.model = new SelectListExamplesViewModel();
  }

  ngOnInit() {
   
  }


  // test1(event: any){
  
  //   debugger;
  
  //}
  

}

class SelectListExamplesViewModel {

  Countries: SelectListItem[];

  Country1: number;

  Country2: number;

  Country3: number;
 
  constructor() {
    
    this.Countries = new Array<SelectListItem>();
    this.Countries.push(new SelectListItem(1, "UK"));
    this.Countries.push(new SelectListItem(2, "USA"));
    this.Countries.push(new SelectListItem(3, "India")); 
    
    this.Country1 = 1;
    this.Country2 = 2;
    this.Country3 = 3;
  }

}