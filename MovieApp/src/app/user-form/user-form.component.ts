import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any //user ID
  private user: any //user object

  //initialize the call using UserService 
  constructor(private _myService: UserService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; /*request had a parameter _id */
            this.id = paramMap.get('_id');

            //request student info based on the id
            this._myService.getUser(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable user
                    this.user = data;
                    //populate the firstName and lastName on the page
                    this.userForm.patchValue({
                        firstName: this.user.firstName,
                        lastName: this.user.lastName,
                        address: {
                            street: this.user.street,
                            city: this.user.city,
                            state: this.user.state,
                            zip: this.user.zip
                        },
                        phoneNumbers: {
                            primaryNumber: this.user.primaryNumber,
                            secondaryNumber: this.user.secondaryNumber
                        },
                        emailAddresses: {
                            primaryEmail: this.user.primaryEmail,
                            secondaryEmail: this.user.secondaryEmail
                        }
                    })
                }),

                error: (err => console.error(err)),
                complete: (() => console.log('finished loading'))
            });
        }
        else {
            this.mode = 'Add';
            this.id = null;
        }
    });
}

  private formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    phoneNumbers: this.formBuilder.group({
      primaryNumber: ['', Validators.required],
      secondaryNumber: [''],
    }),
    emailAddresses: this.formBuilder.group({
      primaryEmail: ['', Validators.email],
      secondaryEmail: ['', Validators.email],
    }),
    //aliases: this.formBuilder.array([this.formBuilder.control('')]),
  });

  /*get aliases() {
    return this.userForm.get('aliases') as FormArray;
  }

  //constructor(private formBuilder: FormBuilder) {}

  updateProfile() {
    this.userForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: '123 Drew Street',
      },
    });
  }

  addAlias() {
    this.aliases.push(this.formBuilder.control(''));
  }*/

  /*onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.userForm.value);
  }*/
  onSubmit() {
    let firstName = this.userForm.get('firstName')?.value ?? "";
    let lastName = this.userForm.get('lastName')?.value ?? "";
    let street = this.userForm.get('address.street')?.value ?? "";
    let city = this.userForm.get('address.city')?.value ?? "";
    let state = this.userForm.get('address.state')?.value ?? "";
    let zip = this.userForm.get('address.zip')?.value ?? "";
    let primaryNumber = this.userForm.get('phoneNumbers.primaryNumber')?.value ?? "";
    let secondaryNumber = this.userForm.get('phoneNumbers.secondaryNumber')?.value ?? "";
    let primaryEmail = this.userForm.get('emailAddresses.primaryEmail')?.value ?? "";
    let secondaryEmail = this.userForm.get('emailAddresses.secondaryEmail')?.value ?? "";
    console.log("You submitted: " + firstName + " " + lastName + " " + street + " " + city + " " + state + " " + zip + " " + primaryNumber + " " + secondaryNumber + " " + primaryEmail + " " + secondaryEmail)

    if (this.mode == 'Add')
      this._myService.addUsers(firstName, lastName, street, city, state, zip, primaryNumber, secondaryNumber, primaryEmail, secondaryEmail);
  if (this.mode == 'Edit')
      this._myService.updateUser(this.id, firstName, lastName, street, city, state, zip, primaryNumber, secondaryNumber, primaryEmail, secondaryEmail);

    this.router.navigate(['/listUsers']);
  }

  /*ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('_id')) {
            this.mode = 'Edit'; //request had a parameter _id
            this.id = paramMap.get('_id');

            this._myService.getUser(this.id).subscribe({
                next: (data => {
                    //read data and assign to private variable user
                    this.user = data;
                    //populate the firstName and lastName on the page
                    this.userForm.patchValue({
                        firstName: this.user.firstName,
                    })
                }),

                error: (err => console.error(err)),
                complete: (() => console.log('finished loading'))
            });
        }
        else {
            this.mode = 'Add';
            this.id = null;
        }
    });
}

  public formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    firstName: [''],
  });

  onSubmit() {
    let firstName = this.userForm.get('firstName')?.value ?? "";
  
  
    console.log("You submitted: " + firstName + " ")

    if (this.mode == 'Add')
      this._myService.addUsers(firstName);
    if (this.mode == 'Edit')
      this._myService.updateUser(this.id, firstName);
    this.router.navigate(['/listUsers']);
  }*/
}