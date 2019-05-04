import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mat-button',
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit, OnChanges, AfterViewInit {
  @Input("class") class: string;
  @Input("dark") dark: string;
  @Input("style") style: string;
  @Input("type") type: string;
  @Input("flat") flat: any;
  @Input("floating") floating: any;
  @Input("no-ripple") noRipple: any;
  @Input("large") large: any;
  @Input("small") small: any;
  @Output("click") onClick= new EventEmitter<any>();
  @ViewChild("btn") ref: ElementRef;
  private el: any;
  private classList: string[]=[];
  constructor(ref: ElementRef) { 
    ref.nativeElement.className="";
  }

  ngOnInit() {
    this.el=this.ref.nativeElement;
  }
  ngAfterViewInit(){
    this.renderClass();
  }

  private renderClass(){
    if (!this.el) return;
    this.classList=[];
    if (this.dark==null){
      this.elClass="waves-light";
    }
    if (this.noRipple==null)
      this.elClass="waves-effect";
    else this.elClass="black-text";
    if (this.flat!=null)
      this.elClass="btn-flat";
    else if (this.floating!=null)
      this.elClass="btn-floating"
    else this.elClass="btn";
    if (this.large!=null)
      this.elClass="btn-large";
    else if (this.small!=null)
      this.elClass="btn-small";
    for (let i=0; i<this.classList.length; i++)
      if (this.el.className.indexOf(this.classList[i])>=0){
        this.el.className=this.el.className.replace(this.classList[i],"");
      }
    this.el.className=this.el.className.trim();
    this.el.className+=" "+this.elClass;
  }

  ngOnChanges(){
    this.renderClass();
  }

  private get elClass(){
    return this.classList.join(" ");
  }

  private set elClass(val: string){
    if (this.classList.indexOf(val)<0)
      this.classList.push(val);
  }

  onClicked(e: any){
    this.onClick.emit(e);
  }
}
