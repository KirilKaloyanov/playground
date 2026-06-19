import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // omit if automatic provision is not needed
})
export class GlobalCounterService {
  count = 0;

  increase() {
    this.count++;
  }

  decrease() {
    this.count--;
  }

  getCounter() {
    return this.count;
  }
}
