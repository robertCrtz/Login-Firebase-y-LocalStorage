import { Injectable, Injector } from '@angular/core';
import { Dato } from '../models/datos.models';

@Injectable()
export class DataService {
  datos: Dato[];

  constructor(){
    this.datos = [];
  }

  getDatos(): Dato[] {
    if (localStorage.getItem('datos') === null) {
      return this.datos;
    } else {
      this.datos = JSON.parse(localStorage.getItem('datos')); // convirtiendo de texto a objeto JSON
      return this.datos;
    }
  }

  addDatos(dato: Dato){
    this.datos.push(dato);
    let datos: Dato[] = [];
    if (localStorage.getItem('datos') === null) {
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos));
    } else {
      datos = JSON.parse(localStorage.getItem('datos')); 
      datos.push(dato);
      localStorage.setItem('datos', JSON.stringify(datos)); // convirtiendo de JSON a cadena de texto
    }
  }

  deleteDatos(dato: Dato){
    for (let i = 0; i < this.datos.length; i++) {
      if (dato == this.datos[i]) {
        this.datos.splice(i, 1);
        localStorage.setItem('datos', JSON.stringify(this.datos));
      }
    }
  }
}
