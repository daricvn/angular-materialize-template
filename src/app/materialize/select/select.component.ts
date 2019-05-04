import { Component, OnInit, Input, OnChanges, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'mat-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers:[
    { provide: NG_VALUE_ACCESSOR, useExisting:SelectComponent, multi: true }
  ]
})
export class SelectComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy, ControlValueAccessor {
  private _value: any;
  private _changeRef: any=[];
  private _items: Array<any>;
  private _itemText: string;
  private _itemValue: string;
  private _class: string;
  private instance: any;
  private el: any;
  @Input("multiple") multiple: boolean;
  @Input("width") width: number | string;
  @Input("items") items: Array<any>;

  @Input("item-text") itemText: string;
  @Input("item-value") itemValue: string;
  @Input("class") class: string;
  @ViewChild("select") ref: ElementRef;
  constructor(ref: ElementRef) { 
    ref.nativeElement.className="";
  }

  ngOnInit() {
    this.sync(true);
    this.el=this.ref.nativeElement;
  }

  ngAfterViewInit(){
    this.renderSelect();
  }

  ngOnChanges(){
    if (this.instance)
      setTimeout(()=>{
        if (this.detectChanges)
          this.renderSelect();
      },100);
  }

  private sync(arr: boolean=false){
    if (arr)
      this._items=JSON.parse(JSON.stringify(this.items));
    this._itemText=this.itemText;
    this._itemValue=this.itemValue;
    this._class=this.class;
  }

  private renderSelect(){
    try{
      if (this.instance)
        this.instance.destroy();
    }
    catch {}
    this.el.innerHTML="";
    for (let i=0; i< this.items.length; i++)
      {
        let option=document.createElement("option");
        option.value=this.getValue(this.items[i]);
        if (this.items[i].disabled)
          option.disabled=true;
        if (this.compareValue(this.items[i]))
          option.selected=true;
        this.el.appendChild(option);
        if (this.itemText)
          option.innerHTML=this.items[i][this.itemText];
        else option.innerHTML=this.items[i];
      }
      this.instance=M.FormSelect.init(this.el,{
        classes: this.class
      });
    if (this.width)
      this.el.parentNode.style.width=this.width+"px";
  }

  get value(){
    return this._value;
  }
  set value(val: any){
    if (this._value!=val){
      this._value=val;
      if (this._changeRef)
        this._changeRef.forEach(f => f(val));
    }
  }

  writeValue(val: any){
    if (!this._value){
      setTimeout(()=>
      this.renderSelect(),1);
    }
    this._value=val;
  }
  registerOnChange(fn: any){
    this._changeRef.push(fn);
  }

  registerOnTouched(fn: any){}

  ngOnDestroy(){
    try{
      if (this.instance)
        this.instance.destroy();
    }
    catch {}
  }

  getValue(item: any){
    return this.itemValue?item[this.itemValue]:item;
  }
  compareValue(item: any){
    if (this.itemValue){
      return this._value==item[this.itemValue];
    }
    else{
        return this._value==item;
    }
  }

  get detectChanges(){
    if (this._itemText!= this.itemText){
      this.sync()
      return true;
    }
    if (this._itemValue!= this.itemValue)
    {
      this.sync()
      return true;
    }
    if (this._class!= this.class){
      this.sync()
      return true;
    }
    if (this._items && this.items){
      if (this._items.length != this.items.length){
        this.sync(true);
        return true;
      }
      try{
        for (let i=0; i< this.items.length; i++)
          if (!this.compare(this.items[i], this._items[i]))
          {
            this.sync(true);
            return true;
          }
      }
      catch {}
    }
    return false;
  }

  private compare(source: any, target: any): boolean{
    if (typeof source != typeof target) return false;
    switch (typeof source)
    {
      case 'object':
        if (source.constructor===Array){
          if (source.constructor!==target.constructor) return false;
          if (source.length!= target.length) return false;
          for (let i=0; i< source.length; i++)
            if (!this.compare(source[i],target[i]))
              return false;
        }
        else
        if (Object.keys(source).length>0)
        {
          if (Object.keys(source).length!=Object.keys(target).length) return false;
          for (let key in Object.keys(source))
            if (!target[key]) return false;
            else
              if (!this.compare(source[key], target[key]))
                return false;
        }
        else return source==target;
        return true;
      default:
        return source==target;
    }
  }
}
