import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDirectives]'
})
export class DirectivesDirective {

  constructor(element: ElementRef) {

  }

}
