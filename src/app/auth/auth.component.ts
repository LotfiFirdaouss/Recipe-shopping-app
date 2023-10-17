import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent {
    isLoading = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    isLoginMode  = true;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        this.isLoading = true; 

        if( !form.valid ){
            return;
        }
        const email = form.value['email'];
        const pwd = form.value['password'];

        let authObs: Observable<AuthResponseData>;
        
        if(this.isLoginMode){
            authObs = this.authService.login(email,pwd);
        }else{
            authObs = this.authService.signUp(email, pwd);
        }

        authObs.subscribe(
            (response) => {
                console.log(response);
                this.isLoading = false;
                this.router.navigate(['/Recipes'])
            }, errorRes => {
                this.error = errorRes;
                this.isLoading = false;
            }
        );

        form.reset();
    }
}