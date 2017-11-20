import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { StorageService } from './_lib/storage.service';
import { CryptoService } from './_lib/_crypto.service';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [StorageService, CryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
