import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {QrCodeProvider} from "../../providers/qr-code/qr-code";
import {SocialSharing} from "@ionic-native/social-sharing";
import {QRCode} from "../../models/QRCode";

/**
 * Generated class for the QrCodePopupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-qr-code-popup',
  templateUrl: 'qr-code-popup.html',
})
export class QrCodePopupPage {
  generated: string = '';
  code: QRCode;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private socialSharing: SocialSharing,
    public qrCodeProvider: QrCodeProvider) {
      this.code = navParams.get('code');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrCodePopupPage');
  }

}
