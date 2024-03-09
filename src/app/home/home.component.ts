import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isTransparent = true;
  isScrolled = false;
  isPopupVisible: boolean = false;
  profileForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      addressType: ['home'],
      interest: ['', Validators.required],
      interests: [[]],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      companyAddress1: [''],
      companyAddress2: [''],
      age: [0, Validators.required], // Assuming the age range starts from 0
      about: ['', Validators.required], // Assuming the age range starts from 0
      profileImage: [null, Validators.required] // Add this line for the image control
    });

    // Subscribe to changes in the addressType control
    this.profileForm.get('addressType')?.valueChanges.subscribe((value) => {
      const address1Control = this.profileForm.get('address1');
      const address2Control = this.profileForm.get('address2');
      const companyAddress1Control = this.profileForm.get('companyAddress1');
      const companyAddress2Control = this.profileForm.get('companyAddress2');

      // Clear validators for all address fields
      address1Control?.clearValidators();
      address2Control?.clearValidators();
      companyAddress1Control?.clearValidators();
      companyAddress2Control?.clearValidators();

      // Set validators based on selected address type
      if (value === 'home') {
        address1Control?.setValidators(Validators.required);
        address2Control?.setValidators(Validators.required);
      } else if (value === 'company') {
        companyAddress1Control?.setValidators(Validators.required);
        companyAddress2Control?.setValidators(Validators.required);
      }

      // Update validation status
      address1Control?.updateValueAndValidity();
      address2Control?.updateValueAndValidity();
      companyAddress1Control?.updateValueAndValidity();
      companyAddress2Control?.updateValueAndValidity();
    });
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  submitForm() {
    if (this.profileForm.valid) {
      // Generate UUID for the profile data
      const profileId = uuidv4();

      // Add the generated ID to the form data
      this.profileForm.patchValue({
        id: profileId
      });

      // Perform form submission logic
      this.http.post('http://localhost:3000/profiles', this.profileForm.value).subscribe(res => {
        alert('Data posted successfully');

        // Navigate to profile page with form data and ID
        this.router.navigate(['./profile'], { state: { formData: this.profileForm.value, profileId: profileId } });
      });
    } else {
      // If the form is invalid, display a message to the user
      alert('Please fill in all required fields.');
    }
  }


  handleFileInput(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file) {
        // Create a FileReader instance
        const reader = new FileReader();

        // Set up a listener for the load event, which fires when file reading is complete
        reader.onload = () => {
          // Set the value of profileImage form control to the data URL
          this.profileForm.patchValue({
            profileImage: reader.result // reader.result contains the data URL
          });
        };

        // Read the file as a data URL
        reader.readAsDataURL(file);
      }
    }
  }

  preventClosing(event: Event) {
    event.stopPropagation();
  }

  removeInterest(tag: string) {
    // Remove interest logic here
  }
}
