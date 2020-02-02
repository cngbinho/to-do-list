import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";

import { CategoriesService } from "../categories.service";

@Component({
  selector: "list-categories",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit {
  noRegister: boolean = true;
  editCategorie: Object;
  result: any;

  modalRef: BsModalRef;

  constructor(
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService
  ) {
    console.log(this.activatedRoute.snapshot);
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesService.list().subscribe(
      res => {
        if (Object.entries(res).length > 0) {
          this.noRegister = false;
          this.result = res;
        } else {
          this.noRegister = true;
        }
      },
      err => {
        console.log(err);
        alert(
          "Houve um problema com a sua solicitação, por favor tente novamente mais tarde."
        );
      }
    );
  }

  addList(newCategorie, form) {
    this.categoriesService.create({ name: newCategorie }).subscribe(
      res => {
        if (res["id"]) {
          console.log("Lista criada com sucesso");
          this.loadCategories();
          form.reset();
        } else {
          console.log("Houve um problema ao criar a nova categoria.");
        }
      },
      err => {
        console.log(err);
        alert("Houve um problema ao criar a nova categoria.");
      }
    );
  }

  updateItem(categoriaId: string, newName: string) {
    let body: Object = { name: newName };

    this.categoriesService.update(categoriaId, body).subscribe(
      res => {
        if (res["id"] === categoriaId) {
          console.log("Categoria atualizada com sucesso.");
          this.loadCategories();
        } else {
          console.log("Houve um problema ao atualizar a Categoria.");
        }
      },
      err => {
        console.log(err);
        alert("Houve um problema ao atualizar a Categoria.");
      }
    );
  }

  handleDelete(item) {
    this.categoriesService.delete(item).subscribe(
      res => {
        console.log(res);

        if (res["id"] == item) {
          console.log("Categoria excluida com sucesso.");
          this.loadCategories();
        } else {
          console.log("Houve um problema ao excluir a categoria.");
        }
      },
      err => {
        console.log(err);
        alert("Houve um problema ao excluir a categoria.");
      }
    );
  }

  openModal(template: TemplateRef<any>, item) {
    this.editCategorie = item;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirmUpdate(newName): void {
    if (this.editCategorie["name"] !== newName) {
      this.updateItem(this.editCategorie["id"], newName);
    }
    this.modalRef.hide();
  }

  closeModal(): void {
    this.modalRef.hide();
  }
}
