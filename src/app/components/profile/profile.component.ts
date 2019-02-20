import { ProfileService } from '../../providers/profile.service';
import { LoginService } from '../../providers/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileItem } from '../../models/img.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

fileLoad: File;
imgUrl: any;
imgTemp: string;
@ViewChild('searchInput') searchInput: ElementRef;

  constructor(private _loginServices: LoginService, private _profile: ProfileService) { }

  ngOnInit() {
      this._profile.showImg().subscribe( () => {
          if (this._profile.img.length <= 0) {
              return;
          } else {
              this.imgUrl = this._profile.img[0].url;
          }
      });
  }
  upLoadFile(file: File) {
   if (!file) {
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.fileLoad = null;
      this.searchInput.nativeElement.value = '';
      console.log('el archivo no es una imagen');
      return;
    }
    this.fileLoad = file;

    let reader = new FileReader();
    let urlTemporal = reader.readAsDataURL( file );

    reader.onloadend = () => this.imgTemp = reader.result.toString();

  }
  changeImg() {
   this._profile.loadImg(this.fileLoad);
  }


}
