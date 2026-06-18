import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalCounterService } from '../../shared/services/global-counter-service';
import { RouterOutlet, RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-home-component',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
}
