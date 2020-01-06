import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
  OnChanges,
  SimpleChanges
} from '@angular/core';


@Directive({
  selector: '[appHoverElevation]'
})
export class HoverElevationDirective implements OnChanges {
  @Input() defaultElevation = 2;
  @Input() hoverElevation = 6;

  constructor(private parent: ElementRef, private renderer: Renderer2) {
    this.setElevation(this.defaultElevation);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.setElevation(this.defaultElevation);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setElevation(this.hoverElevation);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setElevation(this.defaultElevation);
  }

  setElevation(elevation: number) {
    const classesToRemove = Array.from((this.parent.nativeElement as HTMLElement).classList)
      .filter(c => c.startsWith('mat-elevation-z'));

    classesToRemove.forEach(c =>
      this.renderer.removeClass(this.parent.nativeElement, c));

    const classToAdd = 'mat-elevation-z' + elevation;
    this.renderer.addClass(this.parent.nativeElement, classToAdd);
  }
}
