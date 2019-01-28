import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class CarritoProvider {
  items: any [] = [];

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController
  ) {
    console.log('Hello CarritoProvider Provider');
  }


  addCarrito(itemP: any){
    for (let item of this.items) {
      if (item.codigo === itemP.codigo) {
        this.alertCtrl.create({
          title: 'Item existente',
          subTitle: itemP.producto + ' ya se encuentra en el carrito',
          buttons: ['OK']
        }).present();
        return;
      }
    }
    this.items.push(itemP);
  }

}
