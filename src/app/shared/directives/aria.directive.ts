import { Directive, ElementRef, Input, HostListener, OnInit, inject } from '@angular/core';

/**
 * Directive pour améliorer l'accessibilité avec les attributs ARIA
 */
@Directive({
  selector: '[appAria]',
  standalone: true,
})
export class AriaDirective implements OnInit {
  private readonly el = inject(ElementRef);

  @Input() appAria: string = '';
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() ariaExpanded?: boolean;
  @Input() ariaControls?: string;

  @HostListener('click')
  onClick(): void {
    // Mettre à jour les attributs ARIA dynamiquement
    if (this.ariaExpanded !== undefined) {
      this.el.nativeElement.setAttribute('aria-expanded', this.ariaExpanded);
    }
  }

  ngOnInit(): void {
    // Appliquer les attributs ARIA
    if (this.ariaLabel) {
      this.el.nativeElement.setAttribute('aria-label', this.ariaLabel);
    }
    if (this.ariaDescribedBy) {
      this.el.nativeElement.setAttribute('aria-describedby', this.ariaDescribedBy);
    }
    if (this.ariaControls) {
      this.el.nativeElement.setAttribute('aria-controls', this.ariaControls);
    }
  }
}
