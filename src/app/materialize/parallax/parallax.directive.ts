import { Directive, ElementRef, AfterViewInit, OnDestroy, Input } from '@angular/core';

declare var M: any;

@Directive({
  selector: '[mat-parallax]'
})
export class ParallaxDirective implements AfterViewInit, OnDestroy {
  @Input("src") src: string;
  @Input("height") height: number | string;
  private el: any;
  private parallax: any;
  private img: any;
  private instance: any;
  constructor(ref: ElementRef) {
    this.el=ref.nativeElement;
  }

  ngAfterViewInit(){
    this.el.className="parallax-container";
    if (this.height) this.el.style.height=this.height+"px";
    this.el.innerHTML="";
    this.parallax=document.createElement("div");
    this.parallax.className="parallax";
    this.img=document.createElement("img");
    this.img.src=this.src;
    this.parallax.appendChild(this.img);
    this.el.appendChild(this.parallax);
    this.instance=M.Parallax.init(this.parallax,{});
  }
  ngOnDestroy(){
    try {
      if (this.instance)
        this.instance.destroy();
    }
    catch {}
  }
}
