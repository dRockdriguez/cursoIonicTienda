import { Pipe, PipeTransform } from '@angular/core';
import { URL_IMAGES } from '../../config/url.servicios'
@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  transform(codigo: string) {
    return URL_IMAGES + codigo + '.jpg';
  }
}
