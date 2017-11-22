import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { StorageService } from './_lib/storage.service';
import { CryptoService } from './_lib/_crypto.service';
import { InjectionToken } from '@angular/core';
import { AES_CBC_KEY_NAME, INIT_VECTOR } from './_lib/config';
import { SingleKeyComponent } from './single-key/single-key.component';
import { PasswordBasedComponent } from './password-based/password-based.component';
import { KeyPairComponent } from './key-pair/key-pair.component';




@NgModule({
  declarations: [
    AppComponent,
    SingleKeyComponent,
    PasswordBasedComponent,
    KeyPairComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/single-key'},
      { path: 'single-key',  component: SingleKeyComponent },
      { path: 'password-based', component: PasswordBasedComponent }
    ])
  ],
  providers: [
    StorageService,
    CryptoService,
    { provide: AES_CBC_KEY_NAME, useValue: '1010' },
    { provide: INIT_VECTOR, useValue: '1030' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
