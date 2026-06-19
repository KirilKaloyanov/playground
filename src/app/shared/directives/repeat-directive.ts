import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface RepeatContext {
  $implicit: number;
  count: number;
}

@Directive({
  selector: '[appRepeat]',
})
export class RepeatDirective {
  templateRef = inject(TemplateRef<RepeatContext>);
  viewContainerRef = inject(ViewContainerRef);

  @Input() set appRepeat(count: number) {
    this.viewContainerRef.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: i,
        count,
      });
    }
  }
}
