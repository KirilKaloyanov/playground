import { Component, inject } from "@angular/core";
import { GlobalCounterService } from "../../shared/services/global-counter-service";

@Component({
    selector: 'app-global-counter',
    template: `
        <hr />
        <h1>Global counter injected </h1>
        Global Counter: {{currentCount}}
    `,
    styles: ''
})
export class GlobalCounterComponent {
    counter = inject(GlobalCounterService);

    currentCount = this.counter.getCounter();
}