import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/index.services';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  correo: string = '';
  password: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public usuarioService: UsuarioProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ingresar(){
    const loader = this.loadingCtrl.create({
      content: "Espere...",
    });
    loader.present();
    this.usuarioService.ingresar(this.correo, this.password).subscribe(res => {
      loader.dismiss();
      if (this.usuarioService.activo()){
        this.viewCtrl.dismiss(true);
      }
    });
  }



}
