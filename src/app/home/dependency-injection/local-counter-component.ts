import { Component, inject, OnInit } from '@angular/core';
import { GlobalCounterService } from '../../shared/services/global-counter-service';
import { API_URL } from '../../shared/services/non-class-provider-service';

@Component({
  selector: 'app-local-counter-component',
  providers: [ GlobalCounterService ], // this shadows the global service instance

  template: `
    <hr />
    <h1>Global counter injected </h1>
    Local Counter: {{ currentCount }}
    after calling counter.increase() four times.
`,
  styles: '',
})
export class LocalCounterComponent implements OnInit {

  apiUrl = inject(API_URL);

  counter = inject(GlobalCounterService);
  
  currentCount!: number;

  ngOnInit() {
    this.counter.increase();
    this.counter.increase();
    this.counter.increase();
    this.counter.increase();
    console.log(this.counter.getCounter());
    this.currentCount = this.counter.getCounter();
  }
}
