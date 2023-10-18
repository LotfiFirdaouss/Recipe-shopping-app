import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
        private componentFactpryResolver: ComponentFactoryResolver
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
                this.showErrorAlert(errorRes);
                this.isLoading = false;
            }
        );

        form.reset();
    }

    onHandleError(){
        this.error = null;
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string) {
        // create the component dynamically
        const alertCmpFactory = this.componentFactpryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();
        hostViewContainerRef.createComponent(alertCmpFactory);

        // adding the message (property binding)
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
        componentRef.instance.message = message;
        // adding the close functionnality (event binding)
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}