import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {
  token: string;
  id: string;

  constructor(public http: HttpClient) {
    
  }

}
