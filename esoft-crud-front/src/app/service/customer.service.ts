import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders,HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CustomerModel} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // @ts-ignore
  private headers;
  public BASE_URL = 'http://localhost:8000/';
  private headersJson = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  /** Get All Customer Details */
  getAllCustomers(): Observable<Object> {
    let parameters = new HttpHeaders();
    var token=localStorage.getItem("current_user");
    parameters = parameters.set('Authorization', "Bearer " + token);
    return this.httpClient.get(this.BASE_URL + 'api/customer',  {headers: parameters});
  }

  /** Search Customer Details By Id */
  searchCustomer(id: number): Observable<Object> {
    let parameters = new HttpHeaders();
    var token=localStorage.getItem("current_user");
    parameters = parameters.set('Authorization', "Bearer " + token);
    return this.httpClient.get(this.BASE_URL + 'api/customer/'+id,  {headers: parameters});
  }

  /** Delete Customer Details By Id */
  deleteCustomer(id: number): Observable<Object> {
    let parameters = new HttpHeaders();
    var token=localStorage.getItem("current_user");
    parameters = parameters.set('Authorization', "Bearer " + token);
    return this.httpClient.delete(this.BASE_URL + 'api/customer/' + id, { headers: parameters });
  }

  /** Update Customer Details */
  updateCustomer(dto: CustomerModel) {
    let parameters = new HttpHeaders();
    var token=localStorage.getItem("current_user");
    parameters = parameters.set('Authorization', "Bearer " + token);
    return this.httpClient.put(this.BASE_URL + 'api/customer', dto , { headers: parameters });
  }

  /** Save Customer Details */
  saveCustomer(dto: CustomerModel) {
    let parameters = new HttpHeaders();
    var token=localStorage.getItem("current_user");
    parameters = parameters.set('Authorization', "Bearer " + token);

    return this.httpClient.post(this.BASE_URL + 'api/customer', dto , { headers: parameters });
  }
}
