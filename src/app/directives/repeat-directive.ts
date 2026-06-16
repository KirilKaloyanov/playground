import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export interface RepeatContext {
  $implicit: number;
  count: number;
}

@Directive({
  selector: '[appRepeat]',
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<RepeatContext>,
    private viewContainer: ViewContainerRef,
  ) {}

  @Input() set appRepeat(count: number) {
    this.viewContainer.clear();
    for (let i = 0; i < count; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,
        count,
      });
    }
  }
}
