import { NgModule } from "@angular/core";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ShoppingListService } from "./shopping-list.service";
import { LoggingService } from "../logging.service";

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [
        // CommonModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent },
        ]),
        FormsModule,
        SharedModule // we get the common module from here
    ],
    providers: [
        LoggingService
    ]
})
export class ShoppingListModule {}