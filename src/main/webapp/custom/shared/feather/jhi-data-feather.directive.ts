import { Directive, ElementRef, Input, Inject, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';

import * as Feather from 'feather-icons';

@Directive({
  selector: '[jhiDataFeather]',
})
export class JhiDataFeatherDirective implements OnChanges {
  @Input('jhiDataFeather') name!: string;
  @Input() class!: string;
  @Input() size!: string;
  @Input() inner!: boolean;

  // Private
  private _nativeElement: any;

  /**
   * Constructor
   *
   * @param {ElementRef} _elementRef
   */
  constructor(@Inject(ElementRef) private _elementRef: ElementRef, @Inject(ChangeDetectorRef) private _changeDetector: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Get the native element
    this._nativeElement = this._elementRef.nativeElement;

    // SVG parameter
    try {
      this.name = changes.name.currentValue;
    } catch {
      this.name = '';
    }

    try {
      this.size = changes.size.currentValue;
    } catch {
      this.size = '14';
    }

    try {
      this.class = changes.class.currentValue;
    } catch {
      this.class = '';
    }

    // Create SVG
    // @ts-ignore
    const svg = Feather.icons[this.name].toSvg({
      class: this.class,
      width: this.size,
      height: this.size,
    });

    // Set SVG
    if (this.inner) {
      this._nativeElement.innerHTML = svg;
    } else {
      this._nativeElement.outerHTML = svg;
    }
    this._changeDetector.markForCheck();
  }
}
