import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-home-component',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
}
