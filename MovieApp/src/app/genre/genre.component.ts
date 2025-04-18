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
  selector: 'genre-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [ UserService],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent implements OnInit {
  public mode = 'Add'; //default mode
  private id: any //user ID
  private user: any //user object
  
  selectedGenre = " ";


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
                    this.selectedGenre = this.user.genre
                    this.userForm.patchValue({
                        genre: this.user.genre,
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
  this.selectedGenre = " ";
  this._myService.deleteGenre(this.id, this.selectedGenre);
}

  public formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    genre: [''],
  });

  onSubmit() {
    let genre = this.userForm.get('genre')?.value ?? "";
  
  
    console.log("You submitted: " + genre + " ")

    if (this.mode == 'Add'){
      this._myService.addGenre(genre);
      console.log("You Added: " + genre + " ")
    }
    if (this.mode == 'Edit'){
      this._myService.updateGenre(this.id, genre);
      console.log("You Updated: " + genre + " ")
    }
  }
}
