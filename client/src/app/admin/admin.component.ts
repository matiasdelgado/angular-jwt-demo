import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public users$: Observable<any>;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.users$ = this.http.get('/api/admin');
  }
}
