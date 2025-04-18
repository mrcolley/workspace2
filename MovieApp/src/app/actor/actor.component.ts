import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';

@Component({
  selector: 'actor-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ UserService],
  templateUrl: './actor.component.html',
  styleUrl: './actor.component.css'
})
export class ActorComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any //user ID
  private user: any //user object
  
  selectedActor = " ";


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
                    this.selectedActor = this.user.actor
                    this.userForm.patchValue({
                      actor: this.user.actor,
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

onDelete() {
  this.selectedActor = " ";
  this._myService.deleteActor(this.id, this.selectedActor);
}

  public formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    actor: [''],
  });

  onSubmit() {
    let actor = this.userForm.get('actor')?.value ?? "";
  
  
    console.log("You submitted: " + actor + " ")

    if (this.mode == 'Add'){
      this._myService.addActor(actor);
      console.log("You Added: " + actor + " ")
    }
    if (this.mode == 'Edit'){
      this._myService.updateActor(this.id, actor);
      console.log("You Updated: " + actor + " ")
    }
  }
}
