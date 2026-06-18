import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ObservablesDirective } from '../../shared/directives/observables-directive';
import { RepeatDirective } from '../../shared/directives/repeat-directive';
import { UnlessDirective } from '../../shared/directives/unless-directive';
import { GlobalCounterService } from '../../shared/services/global-counter-service';
import { Observable } from 'rxjs';
import { LocalCounterComponent } from '../dependency-injection/local-counter-component';

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
