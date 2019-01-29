import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.services';

@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  pedido: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public carritoService: CarritoProvider,
    private alertCtrl: AlertController
  ) {
      this.pedido = this.navParams.get('pedido');
  }

  borrarPedido(){
    this.carritoService.borrarPedido(this.pedido.id).subscribe((res: any) => {
      if (res.error) {
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Ha ocurrido un error elminando el pedido',
          buttons: ['OK']
        }).present();
      } else {
        this.navCtrl.pop();
      }
    });
  }
}
