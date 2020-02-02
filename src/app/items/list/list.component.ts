import { Component, OnInit, TemplateRef } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { ItemsService } from "../items.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  categorieId: number;
  listId: number;
  listName: string;
  editItem: Object;
  noRegister: boolean = true;

  itemsTodo: Array<any> = [];
  itemsDone: Array<any> = [];

  modalRef: BsModalRef;

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private modalService: BsModalService
  ) {
    this.categorieId = this.activatedRoute.snapshot.params["categorieId"];
    this.listId = this.activatedRoute.snapshot.params["id"];
    this.listName = this.activatedRoute.snapshot.params["listName"];
  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.itemsService.list(this.categorieId, this.listId).subscribe(res => {
      if (Object.entries(res).length > 0) {
        this.noRegister = false;
        this.itemsDone = [];
        this.itemsTodo = [];

        console.log(Object.entries(res).length);

        Object.entries(res).map(item => {
          if (item[1].done) {
            this.itemsDone.push(item[1]);
          } else {
            this.itemsTodo.push(item[1]);
          }
        });
      } else {
        this.noRegister = true;
      }
    });
  }

  addItem(newItem, form) {
    this.itemsService
      .create(this.categorieId, this.listId, { name: newItem, done: false })
      .subscribe(
        res => {
          if (res["id"]) {
            console.log("Item criado com sucesso");
            this.loadItems();
            form.reset();
          } else {
            console.log("Houve um problema ao criar o novo Item na lista.");
          }
        },
        err => {
          console.log(err);
          alert("Houve um problema ao criar o novo Item na lista.");
        }
      );
  }

  updateItem(done: boolean, item: Object, newName?: string) {
    let body: Object;

    body = done ? { done: !item["done"] } : { name: newName };

    this.itemsService
      .update(this.categorieId, this.listId, item["id"], body)
      .subscribe(
        res => {
          if (res["id"] === item["id"]) {
            console.log("Item atualizado com sucesso.");
            this.loadItems();
          } else {
            console.log("Houve um problema ao atualiza o Item.");
          }
        },
        err => {
          console.log(err);
          alert("Houve um problema ao atualizar o Item.");
        }
      );
  }

  handleDelete(item) {
    this.itemsService.delete(this.categorieId, this.listId, item).subscribe(
      res => {
        if (res["id"] == item) {
          console.log("Item excluido com sucesso.");
          this.loadItems();
        } else {
          console.log("Houve um problema ao excluir o Item da lista.");
        }
      },
      err => {
        console.log(err);
        alert("Houve um problema ao excluir o Item da lista.");
      }
    );
  }

  handleBack() {
    this.location.back();
  }

  openModal(template: TemplateRef<any>, item) {
    this.editItem = item;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirmUpdate(newName): void {
    if (this.editItem["name"] !== newName) {
      this.updateItem(false, this.editItem, newName);
    }
    this.modalRef.hide();
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}
