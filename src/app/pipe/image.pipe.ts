import { Pipe, PipeTransform } from '@angular/core';

// pipe to control images

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: any): any {
    if ( !img ) {
      return 'assets/img/noimage.png';
    }
    if ( img.length > 0 ) {
      return img;
    } else {
      return 'assets/img/noimage.png';
    }
  }

}
