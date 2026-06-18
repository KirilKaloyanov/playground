import { Component } from "@angular/core";
import { StringInjectionComponent } from "./string-injection-component";
import { GlobalCounterComponent } from "./global-counter.component";
import { LocalCounterComponent } from "./local-counter-component";

@Component({
    selector: "app-depenedency-injection",
    template: `
        <app-string-injection />
        <app-global-counter />
        <app-local-counter-component />
    `,
    styles: "",
    imports: [StringInjectionComponent, GlobalCounterComponent, LocalCounterComponent]
})
export class DependencyInjectionComponent {}