import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController, Platform } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Injectable()
export class UsuarioProvider {
  token: string;
  id: string;

  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private platform: Platform,
    private storage: Storage
  ) {
    this.cargarStorage();
  }
  activo(): boolean {
    if (this.token) {
      return true;
    } else {
      return false;
    }
  }

  ingresar(correo: string, pass: string ) {
    /*let data = new URLSearchParams();
    data.append('correo', correo);
    data.append('pass', pass);*/
    let data = {
      correo: correo,
      pass: pass
    }
    let url = URL_SERVICIOS + 'login';
    return this.http.post(url, data).pipe(map((res: any) => {
      if (res.error) {
        this.alertCtrl.create({
          title: 'Error login',
          subTitle: res.mensaje,
          buttons: ['OK']
        }).present();
      } else {
        this.token = res.token;
        this.id = res.id;
        this.guardarStorage();
      }
    }));
  }

  cerrarSesion(){
    this.token = null;
    this.id = null;
    this.guardarStorage();
  }

  private guardarStorage() {
    if (this.platform.is('cordova')) {
      if (this.token && this.id) {
        this.storage.set('token', this.token);
        this.storage.set('id', this.id);
      } else if (this.token === null && this.id === null) {
        this.storage.remove('token');
        this.storage.remove('id');
      } 
    } else {
      if (this.token && this.id) {
        localStorage.setItem('token', this.token);
        localStorage.setItem('id', this.id);
      } else if (this.token === null && this.id === null) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
      }
    }
  }

  cargarStorage() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        this.storage.ready().then(() => {
          this.storage.get('token').then((token) => {
            if (token) {
              this.token = token;
            }
            resolve();
          });
          this.storage.get('id').then((id) => {
            if (id) {
              this.id = id;
            }
            resolve();
          });
        });
      } else {
        if (localStorage.getItem('token') && localStorage.getItem('id')) {
          this.token = localStorage.getItem('token');
          this.id =  localStorage.getItem('id');
          resolve();
        }
      }
    });
    
  }
}
