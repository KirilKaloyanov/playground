import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
 
  tasks$ = new Observable<string>(observer => {
    observer.next("tasks")
    observer.complete()
  })

  documents$ = new Observable<string>(observer => {
    observer.next('documents');
    observer.complete();
  });

  counter = inject(GlobalCounterService)

  ngOnInit() {
    console.log(this.counter.getCounter());
    this.counter.increase();
    console.log(this.counter.getCounter());
  }
  
}
