import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { ModalModule } from "ngx-bootstrap/modal";

import { ListsRoutingModule } from "./lists-routing.module";
import { ListComponent } from "./list/list.component";

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    ListsRoutingModule
  ]
})
export class ListsModule {}
