import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isLoggedIn = false;
  private userSub: Subscription;
 
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => {
      this.isLoggedIn = !user ? false : true; // we can also use !!user      
    });
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchDate(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
