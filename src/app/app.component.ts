import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopTemplate';
  data=[
    { id: 0, text:"Option 1"},
    { id: 1, text:"Option 2"},
    { id: 2, text:"Option 3"}
  ];
  selectedValue=1;
}
