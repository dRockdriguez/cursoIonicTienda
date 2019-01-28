import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Injectable()
export class CarritoProvider {
  items: any[] = [];

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform
  ) {
    this.cargarStorage();
  }


  addCarrito(itemP: any) {
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
    this.guardarStorage();
  }

  private guardarStorage() {
    if (this.platform.is('cordova')) {
      this.storage.set('items', this.items);
    } else {
      localStorage.setItem('items', JSON.stringify(this.items))
    }
  }

  cargarStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.storage.ready().then(() => {
          this.storage.get('items').then((items) => {
            if (items) {
              this.items = items;
            }
            resolve();
          });
        });
      } else {
        if (localStorage.getItem('items')) {
          this.items = JSON.parse(localStorage.getItem('items'));
          resolve();
        }
      }
    });
    
  }

}
