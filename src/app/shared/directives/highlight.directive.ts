import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'bg-accent');
    this.renderer.addClass(this.el.nativeElement, 'text-white');
    this.renderer.addClass(this.el.nativeElement, 'transition-colors');
    this.renderer.addClass(this.el.nativeElement, 'duration-200');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'bg-accent');
    this.renderer.removeClass(this.el.nativeElement, 'text-white');
    this.renderer.removeClass(this.el.nativeElement, 'transition-colors');
    this.renderer.removeClass(this.el.nativeElement, 'duration-200');
  }
}
