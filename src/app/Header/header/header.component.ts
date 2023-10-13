import { Component } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService){}

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchDate(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

}
