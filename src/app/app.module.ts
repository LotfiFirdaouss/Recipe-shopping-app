import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // RecipesModule, // to import the module eagerly , once we load it using lazy loading we can omit this line
    // ShoppingListModule,
    SharedModule,
    CoreModule, // to have all our core services
    // AuthModule
  ],
  providers: [
    LoggingService
    // ShoppingListService, 
    // RecipeService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  // entryComponents: [ // for older versions of angular - in order to render components dynamically
  //   AlertComponent
  // ]
})
export class AppModule { }
