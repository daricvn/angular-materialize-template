import { Directive, AfterViewInit, OnDestroy, ElementRef, Input, OnChanges } from '@angular/core';

declare var M: any;

@Directive({
  selector: '[mat-menu]'
})
export class MenuDirective implements AfterViewInit, OnChanges, OnDestroy {

  @Input("mat-menu") target: string;
  @Input("width") width: number | string;
  @Input("top") top: any;
  @Input("right") right: any;
  @Input("left") left: any;
  @Input("bottom") bottom: any;
  @Input("hover") hover: any;
  private el: any;
  private instance: any;
  constructor(ref: ElementRef) {
    this.el=ref.nativeElement;
  }

  ngAfterViewInit(){
    if (this.target) this.el.dataset.target=this.target;
    this.instance=M.Dropdown.init(this.el,{
      alignment: this.position,
      constrainWidth: !this.width,
      hover: this.hover!=null
    })
  }
  ngOnChanges(){
    try{
      if (this.instance && this.instance.isOpen)
        this.instance.recalculateDimensions();
    }
    catch {}
  }
  ngOnDestroy(){
    try{
      if (this.instance)
        this.instance.destroy();
    }
    catch {}
  }

  get position(){
    if (this.top!=null)
      return 'top';
    else if (this.left!=null)
      return 'left';
    else if (this.right!=null)
      return 'right';
    return 'bottom';
  }
}
