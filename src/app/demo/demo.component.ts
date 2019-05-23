import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatInput } from '@angular/material';
import { MatSnackBar } from '@angular/material';

export interface TypeAhead {
  name: string;
  code: string;
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {

  title = 'evaluationtest';

  userTextvalue = '';



  startDate: Date;
  endDate: Date;

  @ViewChild('startInput', {
    read: MatInput
  }) startInput: MatInput;

  @ViewChild('endInput', {
    read: MatInput
  }) endInput: MatInput;


  userCtrl = new FormControl();
  filteredUsers: Observable<TypeAhead[]>;

  users: TypeAhead[] = [
    {
      name: 'Leslie Kyles',
      code: 'JT8GG'
    },
    {
      name: 'John Doe',
      code: 'TFQUN'

    },
    {
      name: 'Jermanine Marshall',
      code: 'P33J5'
    }
  ];

  constructor(private snackBar: MatSnackBar) {

    this.filteredUsers = this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        map(user => user ? this._filterUsers(user) : this.users.slice())
      );

  }



  private _filterUsers(value: string): TypeAhead[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
  }



  startDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
    if (this.startDate > this.endDate) {

      this.openSnackBar("Start date should be lesser than end date", "OK");
      this.startDate = null;
      this.startInput.value = "";
    }

  }

  endDateChangeEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.endDate = event.value;
    if (this.startDate > this.endDate) {

      this.openSnackBar("End date should not be lesser than start date", "OK");
      this.endDate = null;
      this.endInput.value = "";
    }


  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnInit() {
  }

}
