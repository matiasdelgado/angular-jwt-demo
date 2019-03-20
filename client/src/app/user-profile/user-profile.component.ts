import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public todos$: Observable<any>;

  constructor(private http: HttpClient,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.todos$ = this.http.get('/api/todo');
  }

  logout() {
    this.auth.logout();
    this.router.navigate(["/"]);
  }

}
