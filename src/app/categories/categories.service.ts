import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class CategoriesService {
  baseURL = environment.baseUrl;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${this.baseURL}categories`);
  }

  create(body) {
    return this.http.post(`${this.baseURL}categories`, body);
  }

  update(categorieId: string, body: Object) {
    return this.http.put(`${this.baseURL}categories/${categorieId}`, body);
  }

  delete(id) {
    return this.http.delete(`${this.baseURL}categories/${id}`);
  }
}
