import { Component, OnInit } from '@angular/core';
import { GlobalCounterService } from '../global-counter-service';

@Component({
  selector: 'app-local-counter-component',
  imports: [],
  providers: [ GlobalCounterService ], // this shadows the global service instance
  templateUrl: './local-counter-component.html',
  styleUrl: './local-counter-component.css',
})
export class LocalCounterComponent implements OnInit {

  constructor(private counter: GlobalCounterService) {}

  ngOnInit() {
    this.counter.increase();
    this.counter.increase();
    this.counter.increase();
    this.counter.increase();
    console.log(this.counter.getCounter());
  }
}
