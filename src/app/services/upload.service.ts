import { Injectable } from '@angular/core';
import { Global } from './global';



@Injectable()
export class UploadService {
public url: string;
  constructor() {
  this.url = Global.url;
   }
makefilerequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string ) {
return new Promise(function(resolve, reject) {
// Define o formula un formulario
  let formData: any = new FormData();
let xhr = new XMLHttpRequest();
 for ( let i = 0; i < files.length; i++) {
   formData.append(name, files[i], files[i].name);
 }
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
 if (xhr.status === 200) {
   resolve(JSON.parse(xhr.response));
 } else {
   reject(xhr.response);
 }
  }
};
xhr.open('POST', url, true);
// adjuntar cabecera de autorizacion
xhr.setRequestHeader('Authorization', token);
xhr.send(formData);
});
}

}
