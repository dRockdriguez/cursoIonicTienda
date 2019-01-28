import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';

@Injectable()
export class ProductosProvider {
  pagina: number = 0;
  productos: any [] = [];

  constructor(public http: HttpClient) {
    this.cargarTodos();
  }

  cargarTodos() {
    return new Promise((resolve, reject) => {
      let url = URL_SERVICIOS + 'productos/todos/' + this.pagina;

      this.http.get(url).subscribe((res: any) => {
        if (!res.error) {
          let n = this.agrupar(res.productos, 2);
          this.productos.push(...n);
          this.pagina ++;
          if (res.productos.length === 0) {
            resolve(false);
          } else {
            resolve(true);
          }
        } else {
          reject();
        }
      });
  
    });
  }

  private agrupar(arr: any, tam: number){
    let arrNuevo = [];

    for (let i = 0; i < arr.length; i += tam) {
      arrNuevo.push(arr.slice(i, i+tam));
    }

    return arrNuevo;
  }

}
