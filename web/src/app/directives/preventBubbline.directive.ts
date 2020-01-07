import { Directive, HostListener } from '@angular/core';


@Directive({
  selector: '[appPreventBubbling]'
})
export class PreventBubblingDirective {
  @HostListener('click', ['$event'])
  public onClick(event) {
    event.stopPropagation();
  }
}
