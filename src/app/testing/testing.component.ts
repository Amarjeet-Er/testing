import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent {
  actionBtn: string = 'Submit';
  heading = 'Enquery Form';
  enquiry_form!: FormGroup;
  @Output() refreshData = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private _http: HttpClient,

  ) { }

  ngOnInit(): void {
    this.enquiry_form = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // onSubmit(): void {
  //   console.log(this.enquiry_form.value);
  //   if (this.enquiry_form.valid) {
  //     emailjs.send("service_yrn0ryw", "template_x5nsfko", this.enquiry_form) {
  //       from_name: "ram",
  //         to_name: "kr",
  //           message: "test",
  //             reply_to: "ok",
  //     });
  //   };
  // }



  onSubmit(): void {
    console.log(this.enquiry_form.value);

    if (this.enquiry_form.valid) {
      emailjs.send("service_yrn0ryw", "template_qacq2dt", this.enquiry_form.value, "05OQYxm-TZIwnsRpo")
        .then(
          (response) => {
            console.log("Email sent successfully!", response.status, response.text);
            alert("Email sent successfully!");
          },
          (error) => {
            console.error("Failed to send email.", error);
            alert("Failed to send email.");
          }
        );
    }
  }
}
