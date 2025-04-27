import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    //uses http.get() to load data
    getUsers() {
        return this.http.get('http://localhost:8000/users');

    }

    //Uses http.post() to post data 
    /*addUsers(firstName: string) {
        this.http.post('http://localhost:8000/users', {firstName},)
            .subscribe((responseData) => {
                console.log(responseData);
            });
    }*/

    //Uses http.post() to post data 
    addUsers(firstName: string, lastName: string, street: string, city: string, state: string, zip: string, primaryNumber: string, secondaryNumber: string, primaryEmail: string, secondaryEmail: string) {
        this.http.post('http://localhost:8000/users', {firstName, lastName, street, city, state, zip, primaryNumber, secondaryNumber, primaryEmail, secondaryEmail},)
            .subscribe((responseData) => {
                console.log(responseData);
            });
    }

    updateUser(userId: string, firstName: string, lastName: string, street: string, city: string, state: string, zip: string, primaryNumber: string, secondaryNumber: string, primaryEmail: string, secondaryEmail: string) {
        //request path http://localhost:8000/users/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
        this.http.put("http://localhost:8000/users/" +
            userId, { firstName, lastName, street, city, state, zip, primaryNumber, secondaryNumber, primaryEmail, secondaryEmail })
            .subscribe(() => {
                console.log('Updated: ' + userId);
            });
    }
    //Uses http.get() to request data based on user id 
    getUser(userId: string) {
        return this.http.get('http://localhost:8000/users/' + userId);
        location.reload();
    }
    deleteUser(userId: string) {
        this.http.delete("http://localhost:8000/users/" + userId)
            .subscribe(() => {
                console.log('Deleted: ' + userId);
            });
        location.reload();
    }
    /////////////////MOOD//////////////////
    addMood(userId: string, mood: string) {
        this.http.post('http://localhost:8000/users' + userId, { mood })
            .subscribe((responseData) => {
                console.log(responseData);
            });
        location.reload();
    }
    updateMood(userId: string, mood: string) {
        this.http.put("http://localhost:8000/users/" + userId, { mood })
            .subscribe(() => {
                console.log('Updated: ' + userId);
            });
        location.reload();
    }
    getMood(userId: string) {
        return this.http.get('http://localhost:8000/users/' + userId);
    }

    deleteMood(userId: string, mood: string) {
        this.http.put("http://localhost:8000/users/" + userId, { mood })
            .subscribe(() => {
                console.log('Deleted: ' + mood);
            });
        location.reload();
    }
    //////////////////ACTOR///////////////////////////////
    addActor(actor: string) {
        this.http.post('http://localhost:8000/users/', { actor })
            .subscribe((responseData) => {
                console.log(responseData);
            });
        location.reload();
    }
    updateActor(userId: string, actor: string) {
        this.http.put("http://localhost:8000/users/" + userId, { actor })
            .subscribe(() => {
                console.log('Updated: ' + userId);
            });
        location.reload();
    }
    getActor(userId: string) {
        return this.http.get('http://localhost:8000/users/' + userId);
    }

    deleteActor(userId: string, actor: string) {
        this.http.put("http://localhost:8000/users/" + userId, { actor })
            .subscribe(() => {
                console.log('Deleted: ' + actor);
            });
        location.reload();
    }
    //////////////////GENRE///////////////////////////////
    addGenre(genre: string) {
        this.http.post('http://localhost:8000/users/', { genre })
            .subscribe((responseData) => {
                console.log(responseData);
            });
        location.reload();
    }
    updateGenre(userId: string, genre: string) {
        this.http.put("http://localhost:8000/users/" + userId, { genre })
            .subscribe(() => {
                console.log('Updated: ' + userId);
            });
        location.reload();
    }
    getGenre(userId: string) {
        return this.http.get('http://localhost:8000/users/' + userId);
    }

    deleteGenre(userId: string, genre: string) {
        this.http.put("http://localhost:8000/users/" + userId, { genre })
            .subscribe(() => {
                console.log('Deleted: ' + genre);
            });
        location.reload();
    }
}