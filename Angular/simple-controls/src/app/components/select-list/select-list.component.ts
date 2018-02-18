import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit {

  constructor() { }

  @Input() Items: SelectListItem[];

  @Input() SelectedItem: string;

  ngOnInit() {
  
  }

}

export class SelectListItem{
  value: string;
  description: string;

  constructor(value: string, description:string) {
      this.description = description;
      this.value = value;
      
  }
}
