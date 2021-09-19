import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {RegisterModel} from "../model/register.model";
import {LoginModel} from "../model/login.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public BASE_URL = 'http://localhost:8000/';
  private headersJson = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  /** Shop Owner Registration */
  register(request:RegisterModel){
    return this.httpClient.post(this.BASE_URL + 'api/register', request );
  }

  /** Shop Owner Login */
  login(request:LoginModel){
    return this.httpClient.post(this.BASE_URL + 'api/login', request );
  }
}
