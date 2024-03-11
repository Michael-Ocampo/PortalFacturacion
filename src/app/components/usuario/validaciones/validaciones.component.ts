import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';



@Component({
  selector: 'app-validaciones',
  templateUrl: './validaciones.component.html',
  styleUrls: ['./validaciones.component.css']
})
export class ValidacionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

export const firstNameAndLastname:string = '([a-zA-Z]+) ([a-zA-Z]+)';
