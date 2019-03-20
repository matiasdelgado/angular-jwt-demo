import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  message = "";
  loading = false;
  loginForm: FormGroup;
  returnUrl: string;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'profile';
  }

  public async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const { email, password } = this.loginForm.value;
    try {
      const res = await this.auth.login(email, password);
      if (res) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.message = 'Email or password are incorrect.';
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  }

  isFieldInvalid(name) {
    return this.submitted && this.loginForm.controls[name].errors;
  }
}
