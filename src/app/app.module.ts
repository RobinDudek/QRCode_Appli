import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import {QrCodePopupPage} from "../pages/qr-code-popup/qr-code-popup";
import {CreateQrCodePage} from "../pages/create-qr-code/create-qr-code";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QrCodeProvider } from '../providers/qr-code/qr-code';
import { HttpClientModule } from '@angular/common/http';

import {SocialSharing} from "@ionic-native/social-sharing";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    QrCodePopupPage,
    CreateQrCodePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    QrCodePopupPage,
    CreateQrCodePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialSharing,
    QrCodeProvider,
    BarcodeScanner,
    Camera
  ]
})
export class AppModule {}
