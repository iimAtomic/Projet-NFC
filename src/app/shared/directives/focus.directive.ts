import { Directive, ElementRef, HostListener, inject } from '@angular/core';

/**
 * Directive pour améliorer l'accessibilité avec la gestion du focus
 */
@Directive({
  selector: '[appFocus]',
  standalone: true,
})
export class FocusDirective {
  private readonly el = inject(ElementRef);

  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  onKeyDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    // Permettre l'activation avec Enter ou Space
    if (keyboardEvent.target === this.el.nativeElement) {
      keyboardEvent.preventDefault();
      this.el.nativeElement.click();
    }
  }

  @HostListener('focus')
  onFocus(): void {
    // Améliorer la visibilité du focus
    this.el.nativeElement.style.outline = '2px solid #A020F0';
    this.el.nativeElement.style.outlineOffset = '2px';
  }

  @HostListener('blur')
  onBlur(): void {
    // Restaurer l'état normal
    this.el.nativeElement.style.outline = '';
    this.el.nativeElement.style.outlineOffset = '';
  }
}
