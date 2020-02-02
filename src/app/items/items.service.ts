import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ItemsService {
  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  list(categorieId, listId) {
    return this.http.get(
      `${this.baseURL}categories/${categorieId}/lists/${listId}/items`
    );
  }

  create(categorieId, listId, body) {
    return this.http.post(
      `${this.baseURL}categories/${categorieId}/lists/${listId}/items`,
      body
    );
  }

  update(categorieId: number, listId: number, itemId: string, body: Object) {
    return this.http.put(
      `${this.baseURL}categories/${categorieId}/lists/${listId}/items/${itemId}`,
      body
    );
  }

  delete(categorieId, listId, itemId) {
    return this.http.delete(
      `${this.baseURL}categories/${categorieId}/lists/${listId}/items/${itemId}`
    );
  }
}
