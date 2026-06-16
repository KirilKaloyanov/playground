import { Component } from '@angular/core';
import { API_URL } from '../non-class-provider-service';

@Component({
  selector: 'app-non-class-injection',
  imports: [],
  providers: [ {provide: API_URL, useValue: "https://swapi.info"} ],
  templateUrl: './non-class-injection.html',
  styleUrl: './non-class-injection.css',
})
export class NonClassInjection {}
