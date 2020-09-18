import { Component, OnInit } from '@angular/core';
import { UsuarioModels } from '../../models/usuario.models';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styleUrls: ['./logup.component.css']
})
export class LogupComponent implements OnInit {

  usuario: UsuarioModels;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModels();
    console.log(this.usuario.email);
   }

  onSubmit(form: NgForm){

    if (form.invalid){
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario)
    .subscribe( resp => {
      console.log(resp);
      Swal.close();

      if (this.recordarme){
        localStorage.setItem('email', this.usuario.email);
      }

      this.router.navigateByUrl('/')
    }, (err) => {
      Swal.fire({
        title: 'Error al autenticar',
        icon: 'error',
        text: err.error.error.message,
        allowOutsideClick: false
      });
    });
   }
 }
