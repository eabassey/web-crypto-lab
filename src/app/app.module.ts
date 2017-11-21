import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StorageService } from './_lib/storage.service';
import { CryptoService } from './_lib/_crypto.service';
import { InjectionToken } from '@angular/core';
import { AES_CBC_KEY_NAME } from './_lib/config';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    StorageService,
    CryptoService,
    { provide: AES_CBC_KEY_NAME, useValue: '1010' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
