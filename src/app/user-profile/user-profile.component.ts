import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('exampleModal') modal!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  userId: string = '1';


  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public router: Router
  ) {}

  formData: any = { id: '' };
  profileForm!: FormGroup;

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      userId: [''],
      firstName: [''],
      lastName: [''],
      addressType: [''],
      interest: [''],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: [''],
      age: [''],
      profileImage: ['']
    });

    this.route.paramMap.subscribe(params => {
      if (window.history.state.formData) {
        this.formData = { ...window.history.state.formData, id: '' };
        this.userId = this.formData.id;
        this.populateForm(this.formData);
      }
    });

    // Fetch data from server on page reload
    this.fetchDataFromServer();
  }

  populateForm(data: any) {
    this.profileForm.patchValue({
      userId: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      addressType: data.addressType,
      interest: data.interest,
      address1: data.address1,
      address2: data.address2,
      companyAddress1: data.companyAddress1,
      companyAddress2: data.companyAddress2,
      age: data.age,
      profileImage: data.profileImage
    });
  }


  ngAfterViewInit() {
    // You can now safely access the modal element
    console.log(this.modal.nativeElement);
  }

  saveDataToServer(userId: string) {
    this.http.post(`http://localhost:3000/profiles/${userId}`, this.profileForm.value)
      .subscribe(
        (res: any) => {
          console.log('Profile updated successfully:', res);
          alert('Profile updated successfully!');

          // Close the modal popup
          // Adjust the delay as needed
          setTimeout(() => {
            this.modal.nativeElement.querySelector('.modal-header .btn-close').click();
          }, 1000);

          this.fetchDataFromServer();
          this.saveDataToLocal(userId);
        },
        (error: any) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again later.');
        }
      );
  }







  saveDataToLocal(userId: string) {
    // Save data to local storage
    localStorage.setItem(userId, JSON.stringify(this.profileForm.value));
  }

  fetchDataFromServer() {
    // Fetch data from the server based on the user ID (if available)
    const userId = this.profileForm.get('userId')?.value;
    if (userId) {
      this.http.get(`http://localhost:3000/profiles/${userId}`)
        .subscribe(
          (res: any) => {
            this.populateForm(res); // Update the form with fetched data
          },
          (error: any) => {
            console.error('Error fetching profile data:', error);
          }
        );
    }
  }

  editPhoto() {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('File input element not found.');
    }
  }

  handleFileInput(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          this.profileForm.patchValue({
            profileImage: reader.result
          });
        };

        reader.readAsDataURL(file);
      }
    }
  }

  removeInterest(tag: string) {
    // Remove interest logic here
  }
}
