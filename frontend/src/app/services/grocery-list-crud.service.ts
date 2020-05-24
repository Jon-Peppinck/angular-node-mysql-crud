import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { ErrorHandlerService } from "./error-handler.service";

import { Grocery } from "../models/Grocery";

@Injectable({
  providedIn: "root",
})
export class GroceryListCrudService {
  private url = "http://localhost:3000/groceries";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(
    private errorHandlerService: ErrorHandlerService,
    private http: HttpClient
  ) {}

  fetchAll(): Observable<Grocery[]> {
    return this.http
      .get<Grocery[]>(this.url, { responseType: "json" })
      .pipe(
        tap((_) => console.log("fetched groceries")),
        catchError(
          this.errorHandlerService.handleError<Grocery[]>("fetchAll", [])
        )
      );
  }

  post(item: Partial<Grocery>): Observable<any> {
    return this.http
      .post<Partial<Grocery>>(this.url, item, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("post")));
  }

  update(grocery: Grocery): Observable<any> {
    return this.http
      .put<Grocery>(this.url, grocery, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("update")));
  }

  delete(id: number): Observable<any> {
    const url = `http://localhost:3000/groceries/${id}`;

    return this.http
      .delete<Grocery>(url, this.httpOptions)
      .pipe(catchError(this.errorHandlerService.handleError<any>("delete")));
  }
}
