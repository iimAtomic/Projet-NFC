import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

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
