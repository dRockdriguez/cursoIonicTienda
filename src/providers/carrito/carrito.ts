import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UsuarioProvider } from '../usuario/usuario';
import { LoginPage, CarritoPage } from '../../pages/index.paginas';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { map } from 'rxjs/operators';

@Injectable()
export class CarritoProvider {
  items: any[] = [];
  totalCarrito: number = 0;
  itemsPedidos: any [] = [];
  constructor(
    public http: HttpClient,
    private alertCtrl: AlertController,
    private storage: Storage,
    private platform: Platform,
    private usuarioService: UsuarioProvider,
    private modalCtrl: ModalController
  ) {
    this.cargarStorage();
    this.actualizartotal();
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
    this.actualizartotal();
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

  verCarrito(){
    let modal: any;
    if (this.usuarioService.token){
      // Mostrar carrito
      modal = this.modalCtrl.create(CarritoPage);
    } else {
      // login
      modal = this.modalCtrl.create(LoginPage);
    }
    modal.present();
    modal.onDidDismiss((abrirCarrito: boolean) => {
      if (abrirCarrito) {
        this.modalCtrl.create(CarritoPage).present();
      }
    });
  }

  
  actualizartotal() {
    this.totalCarrito = 0;
    for (let item of this.items) {
      this.totalCarrito += Number(item.precio_compra);
    }
  }


  eliminarItem(i: number) {
    this.items.splice(i, 1);
    this.guardarStorage()
    this.actualizartotal();
  }

  finalizarPedido(){
    let codigos = [];
    for(let item of this.items) {
      codigos.push(item.codigo);
    }
    let data = {
      items: codigos.join(',')
    };
    let url = URL_SERVICIOS + 'pedidos/realizar_orden/' + this.usuarioService.token + '/' + this.usuarioService.id;
    this.http.post(url, data).subscribe((res: any) => {
      if (res.error) {
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Ha ocurrido un error realizando el pedido, intentelo de nuevo.',
          buttons: ['OK']
        }).present();
      } else {
        this.items = [];
        this.actualizartotal();
        this.guardarStorage();
        this.alertCtrl.create({
          title: 'Pedido realizado',
          subTitle: 'Pedido realizado correctamente',
          buttons: ['OK']
        }).present();
      }
    });
  }

  cargarPedidos(){
    let url = URL_SERVICIOS + 'pedidos/obtener_pedidos/' + this.usuarioService.token + '/' + this.usuarioService.id;
    this.http.get(url).subscribe((res: any) => {
      if (res.error) {
        this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Ha ocurrido un error obteniendo sus pedidos.',
          buttons: ['OK']
        }).present();
      } else {
        this.itemsPedidos = res.ordenes;
      }
    });
  }

  borrarPedido(pedidoId: number){
    let url = URL_SERVICIOS + 'pedidos/borrar_pedidos/' + this.usuarioService.token + '/' + this.usuarioService.id + '/' + pedidoId;
    return this.http.delete(url);
  }
}
