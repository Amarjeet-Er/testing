import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnrollmentService } from '../enrollment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actionBtn: string = 'Submit';
  heading = 'Enrollment Form';
  studentForm!: FormGroup;
  dataChanged: any;

  constructor(
    private _service: EnrollmentService,
    private fb: FormBuilder,
    private _router: Router,
    private matref: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public edit_std: any
  ) {

  }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      fatherName: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      class: ['', Validators.required]
    });

    if (this.edit_std) {
      this.studentForm.patchValue(this.edit_std);
      this.actionBtn = 'Update';
      this.heading = 'Enrollment Update';
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.actionBtn === 'Submit') {
        this._service.post_std(this.studentForm.value).subscribe(
          (res: any) => {
            alert('Enrollment Successfully...');
            this._router.navigate(['dashboard'])
            this.matref.close();
          },
          (error: any) => {
            console.error('Error occurred:', error);
          }
        );
        this.studentForm.reset();
      } else {
        this.onUpdate();
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onUpdate(): void {
    if (this.edit_std) {
      this._service.put_std(this.edit_std.id, this.studentForm.value).subscribe(
        (res: any) => {
          alert('Enrollment Updated');
          this._router.navigate(['/dashboard'])
          this.studentForm.reset();
          this.matref.close();
        },
        (error: any) => {
          console.error('Error occurred:', error);
        }
      );
    } else {
      console.log('No record to update');
    }
  }
}
