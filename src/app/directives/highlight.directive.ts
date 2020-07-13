import { Directive,ElementRef,Renderer2,HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef,private ren:Renderer2) 
  {

  
  }
 @HostListener('mouseenter') onmouseenter()
 {
   this.ren.addClass(this.el.nativeElement,'highlight');
 } 

 @HostListener('mouseleave') onmouseleave(){

  this.ren.removeClass(this.el.nativeElement,'highlight');
 }
}
