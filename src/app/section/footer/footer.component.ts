import { Component, OnInit } from '@angular/core';
import { TemplateConfig } from '../../template-settings/template-config';
import { FooterConfig } from '../../template-settings/footer-config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  config= TemplateConfig;
  footer= FooterConfig;
  constructor() { }

  ngOnInit() {
  }

}
