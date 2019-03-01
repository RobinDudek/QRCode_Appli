import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { QRCode } from '../../models/QRCode';
import {SocialSharing} from "@ionic-native/social-sharing";
import {QrCodeProvider} from "../../providers/qr-code/qr-code";
/**
 * Generated class for the CreateQrCodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-qr-code',
  templateUrl: 'create-qr-code.html',
})
export class CreateQrCodePage {

  public qrImg:string;
  public text:any;
  public tab = {};
  public history = [];

  constructor(public qrCodeProvider: QrCodeProvider, private socialSharing: SocialSharing) {
  }

  generateQRCode(){
    this.qrCodeProvider.generate(this.text).then
    ((data=>
    {this.qrImg=data;
    }));
    this.tab = {
        'date' : new Date(),
        'text' : this.text
    };
    // TODO: put in history
  }

  shareQRCode(): void {
    this.socialSharing.shareWithOptions({
      message: ' Voici mon nouveau QRCode "' + this.text + '"'
    });
  }
}
