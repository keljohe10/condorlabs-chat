import { ProfileService } from '../../providers/profile.service';
import { LoginService } from '../../providers/login.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';

/*
Author: Kelvin José Hernandez Cabrera
@Desc: user profile component
--------------------------------------
	Variables:
	@Name:fileLoad
	@Desc: file entered in the input

  @Name:load
	@Desc: flag to know if there is an image in the input

  @Name:imgUrl
	@Desc: user image

  @Name:imgTemp
	@Desc: temporary image

--------------------------------------
	Function:

  @Name: upLoadFile
	@Desc: shows temporary image selected

  @Name: changeImg
	@Desc: update the profile image
*/

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

fileLoad: File;
load = false;
imgUrl: any;
imgTemp: string;
@ViewChild('searchInput') searchInput: ElementRef;

  constructor(private _loginServices: LoginService, private _profile: ProfileService) { }

  ngOnInit() {
    // Get url of the image
      this._profile.showImg().subscribe( () => {
          if (this._profile.img.length <= 0) {
              return;
          } else {
              this.imgUrl = this._profile.img[0].url;
          }
      });
  }
  // Shows selected image
  upLoadFile(file: File) {
   if (!file) {
      return;
    }
    if (file.type.indexOf('image') < 0) {
      this.fileLoad = null;
      this.searchInput.nativeElement.value = '';
      swal('The file is not an image', '', 'error');
      return;
    }
    this.fileLoad = file;

    let reader = new FileReader();
    let urlTemporal = reader.readAsDataURL( file );

    reader.onloadend = () => this.imgTemp = reader.result.toString();

  }
  // Update image
  changeImg() {
    this.load = true;
   this._profile.loadImg(this.fileLoad);
  }


}
