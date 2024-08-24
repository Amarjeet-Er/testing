import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EnrollmentService } from '../enrollment.service';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from '../home/home.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'class', 'address', 'edit'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _service: EnrollmentService,
    private _dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadData();
    this._dialog.afterAllClosed.subscribe(() => {
      this.loadData();
    });
  }

  loadData() {
    this._service.get_std().subscribe(
      (res: any) => {
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  onUpdate(row: any) {
    const dialogRef = this._dialog.open(HomeComponent, {
      data: row,
      disableClose: true
    });

    dialogRef.componentInstance.refreshData.subscribe(() => {
      this.loadData();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
