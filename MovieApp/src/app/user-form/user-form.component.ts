import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
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
  }
}
