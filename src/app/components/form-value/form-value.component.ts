import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-value',
  templateUrl: './form-value.component.html',
  styleUrls: ['./form-value.component.scss']
})
export class FormValueComponent implements OnInit {

  @Input() formValid: boolean;
  @Input() formInvalid: boolean;
  @Input() formSubmitted: boolean;
  @Input() value: object;

  constructor() { }

  ngOnInit(): void {
  }

}
