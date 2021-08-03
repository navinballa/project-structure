import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface Employee {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  listOfEmp: Employee[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  ds = new MatTableDataSource(this.listOfEmp);

  @ViewChild(MatSort) sort: MatSort = new MatSort();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.form = new FormGroup({
      searchString: new FormControl(null),
    });

    this.form.valueChanges.subscribe((values) => {
      this.ds.filter = values.searchString;
    });
  }

  ngAfterViewInit() {
    this.ds.sort = this.sort;
    this.ds.paginator = this.paginator;
  }

  onDelete(emp: Employee) {
    this.listOfEmp = this.listOfEmp.filter(
      (ob) => ob.position !== emp.position
    );

    this.ds = new MatTableDataSource(this.listOfEmp);
  }

  onSearch(value: string) {
    console.log(value);
  }
}
