import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { CategoriesRoutingModule } from "./categories-routing.module";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CategoriesRoutingModule
  ],
  exports: [ListComponent]
})
export class CategoriesModule {}
