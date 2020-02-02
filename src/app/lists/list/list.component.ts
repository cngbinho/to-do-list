import { Component, OnInit, TemplateRef } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ListsService } from "../lists.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  categorieId: number;
  categorieName: string;
  editList: Object;
  noRegister: boolean = true;
  result: any;

  modalRef: BsModalRef;

  constructor(
    private listsService: ListsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService
  ) {
    console.log(this.activatedRoute.snapshot.params["name"]);
    this.categorieId = this.activatedRoute.snapshot.params["id"];
    this.categorieName = this.activatedRoute.snapshot.params["name"];
  }

  ngOnInit() {
    this.loadLists();
  }

  loadLists() {
    this.listsService.list(this.categorieId).subscribe(res => {
      if (Object.entries(res).length > 0) {
        this.noRegister = false;
        console.log(res);
        this.result = res;
      } else {
        this.noRegister = true;
      }
    });
  }

  addList(newList, form) {
    this.listsService.create(this.categorieId, { name: newList }).subscribe(
      res => {
        if (res["id"]) {
          console.log("Lista criada com sucesso");
          this.loadLists();
          form.reset();
        } else {
          console.log("Houve um problema ao criar a nova lista.");
        }
      },
      err => {
        console.log(err);
        alert("Houve um problema ao criar a nova lista.");
      }
    );
  }

  updateList(listId: string, newName: string) {
    let body: Object;

    body = { name: newName };

    this.listsService
      .update(this.categorieId, this.editList["id"], body)
      .subscribe(
        res => {
          if (res["id"] === listId) {
            console.log("list atualizado com sucesso.");
            this.loadLists();
          } else {
            console.log(res);
            console.log("Houve um problema ao atualiza a Lista.");
          }
        },
        err => {
          console.log(err);
          alert("Houve um problema ao atualizar a Lista.");
        }
      );
  }

  handleDelete(listId) {
    this.listsService.delete(this.categorieId, listId).subscribe(
      res => {
        if (res["id"] == listId) {
          console.log("Lista excluida com sucesso.");
          this.loadLists();
        } else {
          console.log("Houve um problema ao excluir a Lista.");
        }
      },
      err => {
        console.log(err);
        alert("Houve um problema ao excluir a Lista.");
      }
    );
  }

  handleBack() {
    this.location.back();
  }

  openModal(template: TemplateRef<any>, item) {
    this.editList = item;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirmUpdate(newName): void {
    if (this.editList["name"] !== newName) {
      this.updateList(this.editList["id"], newName);
    }
    this.modalRef.hide();
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}
