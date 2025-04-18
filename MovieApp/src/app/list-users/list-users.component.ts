import { Component, OnInit, ɵgetUnknownElementStrictMode } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-users',
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
  providers: [ UserService ],
  standalone: true
})
export class ListUsersComponent implements OnInit {
  //declare variable to hold response and make it public to be accessible from components.html
  public users: any;
  //initialize the call using UserService 
  constructor(private _myService: UserService) { }
  ngOnInit() {
    this.getUsers(); //call getUser() method to load data
  }
  //method called OnInit
  getUsers() {
    //uses http.get() to load data
    this._myService.getUsers().subscribe({
      //read data and assign to public variable users
      next: (data => { this.users = data }),
      error: (err => console.error(err)),
      complete: (() => console.log('finished loading'))
    });
  }
  onDelete(userId: string) {
    this._myService.deleteUser(userId);
  }
}
