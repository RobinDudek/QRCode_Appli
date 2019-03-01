import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import qrcode from 'qrcode';
import {Camera, CameraOptions} from "@ionic-native/camera";
import jsQR from 'jsqr';

/*
  Generated class for the QrCodeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QrCodeProvider {

  constructor(public http: HttpClient,
    private camera: Camera,
    private barcodeScanner: BarcodeScanner) { }

  generate(text: string): Promise<string> {  
    return new Promise<string>((resolve, reject) => {    
      qrcode.toDataURL(text, { errorCorrectionLevel: 'H' }, function (err, url) {
        if (err) {
            reject(err);
        } else {
            resolve(url);
        }
      });
    });
  }

  async read(): Promise<string> {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    const imageData = await this.camera.getPicture(options);

    // imageData is either a base64 encoded string or a file URI
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    return await new Promise<string>((resolve, reject) => {
      const picture = new Image();
      picture.src = base64Image;
      picture.onload = () => {
        try {
          canvas.width = picture.width;
          canvas.height = picture.height;
          context.drawImage(picture, 0, 0);
        } catch (e) {
          reject(e);
        }
        const image = context.getImageData(0, 0, canvas.width, canvas.height);
        const result = jsQR(image.data, image.width, image.height);
        if (!result) {
          reject('Le QR Code est introuvable');
        } else {
          resolve(result.data);
        }

      };
      picture.onerror = () => {
        reject('Load failed');
      }
    });
  }
}
