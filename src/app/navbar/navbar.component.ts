import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private _dialog: MatDialog
  ) { }
  newStd() {
    this._dialog.open(HomeComponent)
  }
}
