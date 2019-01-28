import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.services';
import { ProductoPage } from '../producto/producto';

@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  blockInfiniteScroll: boolean = true;
  categoria: any;
  productoPage = ProductoPage; 
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productosService: ProductosProvider
  ) {
    this.categoria = this.navParams.get('categoria');
    this.productosService.cargarPorCategoria(this.categoria.id);
  }

  siguientePagina(e){
    this.productosService.cargarPorCategoria(this.categoria.id).then((mas: boolean) => {
      this.blockInfiniteScroll = mas;
      e.complete();
    }).catch(() => {

    });
  }

}
