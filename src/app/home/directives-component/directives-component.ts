import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservablesDirective } from '../../directives/observables-directive';
import { RepeatDirective } from '../../directives/repeat-directive';
import { UnlessDirective } from '../../directives/unless-directive';
import { LocalCounterComponent } from '../../dInjection/local-counter-component/local-counter-component';
import { Observable } from 'rxjs';
import { GlobalCounterService } from '../../dInjection/global-counter-service';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-directives-component',
  imports: [LocalCounterComponent, UnlessDirective, RepeatDirective, ObservablesDirective, CommonModule],
  templateUrl: './directives-component.html',
  styleUrl: './directives-component.css',
})
export class DirectivesComponent implements OnInit{
 
  tasks$: Observable<any> = new Observable(observer => {
    observer.next("tasks")
    observer.complete()
  })

  documents$: Observable<any> = new Observable(observer => {
    observer.next('documents');
    observer.complete();
  });

  constructor(private counter: GlobalCounterService) {}

  ngOnInit() {
    console.log(this.counter.getCounter());
    this.counter.increase();
    console.log(this.counter.getCounter());
  }
  
}
