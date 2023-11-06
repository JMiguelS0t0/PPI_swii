import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { apiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
  });

  showError = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private apiService: apiService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.apiService
        .getAdmin(
          this.loginForm.value.correo as string,
          this.loginForm.value.contrasena as string
        )
        .subscribe({
          next: (response) => {
            if (response.length > 0) {
              this.router.navigateByUrl('/admin');
              this.loginForm.reset();
              this.toastr.success('Inicio de sesión exitoso');
            } else {
              this.showError = true;
              this.errorMessage = 'Correo/Contraseña Incorrectos';
            }
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get correo() {
    return this.loginForm.controls.correo;
  }

  get contrasena() {
    return this.loginForm.controls.contrasena;
  }
}
