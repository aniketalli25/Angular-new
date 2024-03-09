import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent {
  // profileForm!: FormGroup;

  // constructor(private formBuilder: FormBuilder,public http:HttpClient, private  router:Router) {}

  // ngOnInit() {
  //   this.profileForm = this.formBuilder.group({
  //     firstName: ['', Validators.required],
  //     lastName: ['', Validators.required],
  //     addressType: ['home'],
  //     interest: [''],
  //     interests: [[]],
  //     address1: [''],
  //     address2: [''],
  //     companyAddress1: [''],
  //     companyAddress2: [''],
  //     age: [0], // Assuming the age range starts from 0
  //     about: [''] // Assuming the age range starts from 0

  //   });
  // }

  // submitForm() {
  //   if (this.profileForm.valid) {
  //     console.log(this.profileForm.value);
  //     // You can perform form submission logic here
  //     this.http.post('http://localhost:3000/profiles', this.profileForm.value).subscribe(res => {
  //       alert('Data posted successfully');
  //       // Navigate to profile page with form data
  //       this.router.navigate(['./profile'], { state: { formData: this.profileForm.value } });
  //     });
  //   }
  // }


  // handleFileInput(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput && fileInput.files && fileInput.files.length > 0) {
  //     const file = fileInput.files[0];
  //     if (file) {
  //       this.profileForm!.patchValue({  // Here we use the non-null assertion operator
  //         profileImage: file
  //       });
  //       this.profileForm!.get('profileImage')!.updateValueAndValidity();  // Also using the non-null assertion operator
  //     }
  //   }
  // }



  // removeInterest(tag: string) {
  //   // Remove interest logic here
  // }



}

