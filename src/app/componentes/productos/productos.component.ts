import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Dato } from '../../models/datos.models';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  datos: Dato[];

  constructor(public dataService: DataService,
              public router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.datos = this.dataService.getDatos();
  }

  addDato(nuevoNombre, nuevaMarca, nuevoModelo, nuevaDescripcion, nuevoPrecio, nuevasUnidades, nuevoTipo) {
    this.dataService.addDatos({
      nombre: nuevoNombre.value,
      marca: nuevaMarca.value,
      modelo: nuevoModelo.value,
      descripcion: nuevaDescripcion.value,
      precio: nuevoPrecio.value,
      unidad: nuevasUnidades.value,
      tipo: nuevoTipo.value
    });
    nuevoNombre.value = '';
    nuevaDescripcion.value = '';
    nuevaMarca.value = '';
    nuevoModelo.value = '';
    nuevoPrecio.value = '';
    nuevasUnidades.value = '';
    nuevoNombre.focus();
    return false;
  }

  deleteDatos(dato: Dato){
    this.dataService.deleteDatos(dato);
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
