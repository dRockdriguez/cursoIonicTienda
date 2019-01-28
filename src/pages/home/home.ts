import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.services';
import { ProductoPage } from '../producto/producto';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  blockInfiniteScroll: boolean = true;
  productoPage = ProductoPage;

  constructor(
    public navCtrl: NavController,
    private productoService: ProductosProvider
    ) {

  }

  siguientePagina(e){
    this.productoService.cargarTodos().then((mas: boolean) => {
      this.blockInfiniteScroll = mas;
      e.complete();
    }).catch(() => {

    });
  }

}
