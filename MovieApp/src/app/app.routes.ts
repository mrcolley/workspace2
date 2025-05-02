import { Routes } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { MoodComponent } from './mood/mood.component';
import { GenreComponent } from './genre/genre.component';
import { ActorComponent } from './actor/actor.component';

export const routes: Routes = [
    {
        path: '',  //default component to display
        component: ListUsersComponent
    }, {
        path: 'addUser',  //when users added 
        component: UserFormComponent
    }, {
        path: 'editUser/:_id', //when users edited 
        component: UserFormComponent 
    }, {
        path: 'listUsers',  //when users listed
        component: ListUsersComponent
    },{
        path: 'mood/:_id',  //when users listed
        component: MoodComponent
    }, {
        path: 'listGenres',  //when genres listed
        component: GenreComponent
    },{
        path: 'genre/:_id',  //when users listed
        component: GenreComponent
    },{
        path: 'actor/:_id',  //when users listed
        component: ActorComponent
    },
];
