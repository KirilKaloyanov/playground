import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styles: `body {background-color: #3a3a3a; color: lightgray; padding: 14px}`,
  encapsulation: ViewEncapsulation.None
})
export class App {
  
}
