import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbdModalBasic } from './auth/login/modal-basic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-CRUD-using-Routing';

  constructor(public router: Router) {

  }
}
