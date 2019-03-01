import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QRCode } from '../../models/QRCode';
import {ModalController, ToastController} from 'ionic-angular';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {QrCodeProvider} from "../../providers/qr-code/qr-code";
import {QrCodePopupPage} from "../qr-code-popup/qr-code-popup";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private barcodeScanner: BarcodeScanner,
    private qrCodeProvider: QrCodeProvider,
    private popup: ModalController,
    private notif: ToastController) {

  }
  
  scanQRCodeFromCamera() {
    this.barcodeScanner.scan()
      .then(qrcodeData => {
        if (!qrcodeData.cancelled) {
          this.textPopup(qrcodeData.text)
        }
      }).catch(this.errorPopup.bind(this));
  }

  scanQRCodeFromFiles() {
    this.qrCodeProvider.read()
      .then((text) => {
        this.textPopup(text)
      }).catch(this.errorPopup.bind(this));
  }

  errorPopup(error): void {
    const notif = this.notif.create({
      message: error.message,
      duration: 3000
    });
    notif.present();
  }

  textPopup(text: string) {
    const qrCodePopup = this.popup.create(QrCodePopupPage, {
      code: new QRCode(text)
    });
    qrCodePopup.present();
  }

}
