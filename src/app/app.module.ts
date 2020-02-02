import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { ModalModule } from "ngx-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { CategoriesModule } from "./categories/categories.module";
import { ListsModule } from "./lists/lists.module";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CategoriesModule,
    ListsModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
