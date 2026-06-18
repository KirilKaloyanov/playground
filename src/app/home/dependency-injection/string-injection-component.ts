import { Component, inject } from "@angular/core";
import { API_URL } from "../../shared/services/non-class-provider-service";

@Component({
    selector: "app-string-injection",
    template: `
        {{apiUrl}}
    `,
    styles: ''
})
export class StringInjectionComponent {
    apiUrl = inject(API_URL)
}