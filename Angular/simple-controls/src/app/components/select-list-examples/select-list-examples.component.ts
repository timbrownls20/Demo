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

}

class SelectListExamplesViewModel {

  Items: SelectListItem[];
 
  constructor() {
    
    this.Items = new Array<SelectListItem>();
    this.Items.push(new SelectListItem("1", "UK"));
    this.Items.push(new SelectListItem("2", "USA"));
    this.Items.push(new SelectListItem("3", "India"));
    
    
  }

}