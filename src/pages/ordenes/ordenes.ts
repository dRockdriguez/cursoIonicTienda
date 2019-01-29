import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';
import { OrdenesDetallePage } from '../ordenes-detalle/ordenes-detalle';

@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  ordenesDetalle = OrdenesDetallePage;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carritoService: CarritoProvider
  ) {
  }

  ionViewWillEnter() {
    this.carritoService.cargarPedidos();
  }

}
