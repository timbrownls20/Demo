import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.css']
})
export class SelectListComponent implements OnInit, ControlValueAccessor {

 
  @Input() Items: SelectListItem[];

  //@Input() 
  SelectedItem: number;

  //@Output() IsSelected: EventEmitter<number>;
  
  constructor() { 
    //this.IsSelected = new EventEmitter<number>();
  }
  
  ngOnInit() {
    
  }

  writeValue(value: any) {
    this.SelectedItem = value;
  }

  propagateChange = (_: any) => {};
  
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  registerOnTouched() {}

  change(event: any): void{
    this.propagateChange(this.SelectedItem);
  }

}

export class SelectListItem{
  value: number;
  description: string;

  constructor(value: number, description:string) {
      this.description = description;
      this.value = value;
      
  }
}
