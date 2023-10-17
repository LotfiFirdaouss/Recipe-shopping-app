import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ){}

    signUp(email: string, pwd: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDqZh2aDfSFl3WWR2jjsI2mEBAiCm-ohm8',

            {
                email: email,
                password: pwd,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError), 
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                );
            })
        )
    }

    login(email: string, pwd: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDqZh2aDfSFl3WWR2jjsI2mEBAiCm-ohm8',
            {
               email: email,
               password: pwd,
               returnSecureToken: true 
            }
        ).pipe(
            catchError(this.handleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email, 
                    resData.localId, 
                    resData.idToken, 
                    +resData.expiresIn
                );
            })
        );
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser= new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            // in milliseconds
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
        
        
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        // localStorage.clear();
        localStorage.removeItem('userData'); // clear the data from localStorage once logged out
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        },expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number ){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email, 
            userId, 
            token, 
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user))
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage ='An unknown error occured!'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        console.log(errorRes.error.error.message);
        
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
            case 'INVALID_LOGIN_CREDENTIALS':    
                errorMessage = 'The email or password is not correct';
        }
        return throwError(errorMessage);
    }

}