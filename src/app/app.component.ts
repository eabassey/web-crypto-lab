import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from './_lib/storage.service';
import { CryptoService } from './_lib/_crypto.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { AES_CBC_KEY_NAME } from './_lib/config';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private db: StorageService,
              private crypto: CryptoService,
              @Inject(AES_CBC_KEY_NAME) private aesKeyName: string) { }

  ngOnInit() {
    // On Start, Check if Key already exists else create and store in localStorage
    if (!this.keyIsAvailable) {
      this.crypto.generateAesCbcKey()
        .then((aesKey) => {
           window.localStorage.setItem(this.aesKeyName, aesKey);
        });
    }
  }

  // Checking for key string in localStorage
  get keyIsAvailable(): boolean {
    return !!window.localStorage.getItem(this.aesKeyName);
  }

  onResetOrChangePassword() {
    // delete both AES Key in localStorage and the whole IndexedDB database.
    // generate new AES Key and store in localStorage
    // Refetch all data into IndexedDB encrypted with AES Key.
  }


}