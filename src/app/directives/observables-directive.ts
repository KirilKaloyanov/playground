import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

export class ObservablesContext {
  [key: string]: any;
}

@Directive({
  selector: '[appObservablesDirective]',
})
export class ObservablesDirective implements OnInit {
  constructor(
    private templateRef: TemplateRef<ObservablesContext>,
    private viewContainer: ViewContainerRef,
  ) {}

  private _context = new ObservablesContext();

  // You can create a custom domain specific language with the pattern "[selector]Keyword",
  // which maps to an Input.
  // "appObservablesDirectiveFrom" for example can then be used 
  // like *appObservablesDirective="let ... from { ... } 

  @Input() set appObservablesDirectiveFrom(value: any){
    Object.assign(this._context, value);
  }

  ngOnInit() {
    this.viewContainer.createEmbeddedView(this.templateRef, this._context);
  }
}
