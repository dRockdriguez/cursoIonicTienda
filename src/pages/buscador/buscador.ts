import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/index.services';
import { ProductoPage } from '../producto/producto';

@Component({
  selector: 'page-buscador',
  templateUrl: 'buscador.html',
})
export class BuscadorPage {
  productoPage: any = ProductoPage;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productosService: ProductosProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscadorPage');
  }

  getItems(e){
    const term = e.target.value;

    if (term && term.trim() != '' && term.length >= 3) {
        this.productosService.cargarBuscador(term);
    }
  }
}
