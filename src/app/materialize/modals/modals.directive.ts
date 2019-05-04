import { Directive, ElementRef, AfterViewInit, Input, OnDestroy, OnChanges } from '@angular/core';

declare var M: any;

@Directive({
  selector: '[mat-modal]'
})
export class ModalsDirective implements AfterViewInit, OnChanges, OnDestroy {
  private el: any;
  private instance: any;
  @Input("persistent") persistent: boolean | string;
  @Input("width") width: number | string;
  @Input("modal") modal: boolean=false;
  @Input("fixed") fixed: boolean | string;
  @Input("bottom") bottom: boolean | string;
  constructor(ref: ElementRef) { 
    this.el=ref.nativeElement;
  }

  ngAfterViewInit(){
    this.el.className+=' modal';
    if (this.width)
      this.el.style.width=this.width+"px";
    if (this.fixed!=null)
      this.el.className+=" modal-fixed-footer";
    else
      if (this.bottom!=null)
        this.el.className+=" bottom-sheet";
    this.instance=M.Modal.init(this.el,{
      dismissible: this.persistent==null || this.persistent === 'undefined'
    });
  }

  ngOnChanges(){
    try{
      if (this.modal && !this.instance.isOpen)
      {
        this.instance.open();
      }
      else if (!this.modal && this.instance.isOpen){
        this.instance.close();
      }
    }
    catch {}
  }

  ngOnDestroy(){
    try{
      if (this.instance) this.instance.destroy();
    }
    catch {}
  }
}
