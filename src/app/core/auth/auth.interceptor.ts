import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {OnInit} from "@angular/core";

export class AuthInterceptor implements HttpInterceptor, OnInit {

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req.headers.append('', '');
    return next.handle(req);
  }
}
