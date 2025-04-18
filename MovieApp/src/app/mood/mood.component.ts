import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from '../user.service';


@Component({
   selector: 'mood-form',
   standalone: true,
   imports: [ MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterModule ],
   templateUrl: './mood.component.html',
   styleUrl: './mood.component.css',
   providers: [ UserService],
 })
export class MoodComponent implements OnInit{

   public mode = 'Add'; //default mode
   private id: any //user ID
   private user: any //user object
 

  //clicked = false;
  button1Name = 'Happy';
  button2Name = 'Sad';
  button3Name = 'Nervous';
  button4Name = 'Confused';
  button5Name = 'Sleepy';
  button6Name = 'Hungry';
  button7Name = 'Angry';
  button8Name = 'Silly';
  button9Name = 'Relaxed';

  selectedMood = " ";
 

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
                   this.selectedMood = this.user.mood;
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
   this.selectedMood = " ";
   this._myService.deleteMood(this.id, this.selectedMood);
 }

   button1Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Happy';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Happy';
      this._myService.updateMood(this.id, this.selectedMood);
   }

   button2Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Sad';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Sad';
      this._myService.updateMood(this.id, this.selectedMood);
   }

   button3Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Nervous';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Nervous';
      this._myService.updateMood(this.id, this.selectedMood);
   }

   button4Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Confused';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Confused';
      this._myService.updateMood(this.id, this.selectedMood);
   }
   
   button5Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Sleepy';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Sleepy';
      this._myService.updateMood(this.id, this.selectedMood);
   }
   button6Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Hungry';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Hungry';
      this._myService.updateMood(this.id, this.selectedMood);
   }

   button7Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Angry';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Angry';
      this._myService.updateMood(this.id, this.selectedMood);
   }

   button8Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Silly';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Silly';
      this._myService.updateMood(this.id, this.selectedMood);
   }

   button9Clicked(){
      if (this.selectedMood == " "){
      this.selectedMood = 'Relaxed';
      this._myService.addMood(this.id, this.selectedMood);
      }
      else
      this.selectedMood = 'Relaxed';
      this._myService.updateMood(this.id, this.selectedMood);
   }
}