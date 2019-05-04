import { Directive, ElementRef, AfterViewInit, OnDestroy, Input, OnChanges } from '@angular/core';

declare var M: any;

@Directive({
  selector: '[mat-tooltip]'
})
export class TooltipsDirective implements AfterViewInit, OnChanges, OnDestroy {

  @Input("mat-tooltip") html: string;
  @Input("top") top: any;
  @Input("left") left: any;
  @Input("right") right: any;
  @Input("bottom") bottom: any;
  private el: any;
  private instance: any;
  private timer: any;
  constructor(ref: ElementRef) { 
    this.el=ref.nativeElement;
  }
  ngAfterViewInit(){
    this.instance=M.Tooltip.init(this.el,{
      html: this.html,
      position: this.position
    });
  }
  ngOnChanges(){
    try{
      if (this.instance){
        if (this.instance.isOpen)
        {
          if (!this.timer)
            this.timer=setTimeout(()=>{
              this.instance.close();
              clearTimeout(this.timer);
              this.timer=null;
            },5000);
        }
      }
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

  private get position():string{
    if (this.top!=null)
      return 'top';
    else if (this.left!=null)
      return 'left';
    else if (this.right!=null)
      return 'right';
    return 'bottom';
  }
}
