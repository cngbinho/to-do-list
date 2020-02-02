import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ListsService {
  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  list(categorieId) {
    return this.http.get(`${this.baseURL}categories/${categorieId}/lists`);
  }

  create(categorieId, body) {
    return this.http.post(
      `${this.baseURL}categories/${categorieId}/lists`,
      body
    );
  }

  update(categorieId: number, listId: number, body: Object) {
    return this.http.put(
      `${this.baseURL}categories/${categorieId}/lists/${listId}`,
      body
    );
  }

  delete(categorieId, listId) {
    return this.http.delete(
      `${this.baseURL}categories/${categorieId}/lists/${listId}`
    );
  }
}
