import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from '../_lib/storage.service';
import { CryptoService } from '../_lib/_crypto.service';
import { INIT_VECTOR, AES_CBC_KEY_NAME } from '../_lib/config';
import { Util } from '../_lib/_util';

@Component({
  selector: 'app-password-based',
  templateUrl: './password-based.component.html',
  styleUrls: ['./password-based.component.css']
})
export class PasswordBasedComponent implements OnInit {

  constructor(private db: StorageService,
    private crypto: CryptoService,
    @Inject(INIT_VECTOR) private ivName: any,
    @Inject(AES_CBC_KEY_NAME) private aesKeyName: string) { }

    ngOnInit() {
      // On Start, Check if Key already exists else create and store in localStorage
      if (!this.keyIsAvailable) {
        this.initialize('jskflwef');
      }
    }

    // ON EVERY STARTUP, PASSWORD CHANGE, DELETING KEY IN STORAGE
    initialize(pw: string) {
      // clear data in existing table(s)
      this.db.customers.clear();

      // recreate key and store in localStorage
      this.crypto.convertPassphraseToKey(pw)
        .then((aesKeyString) => {
          localStorage.setItem(this.aesKeyName, aesKeyString);

          const iv = window.crypto.getRandomValues(new Uint8Array(16));
          const ivHexString = Util.byteArrayToHexString(iv);
          localStorage.setItem(this.ivName, ivHexString);
        });
    }

      // Checking for key string in localStorage
  get keyIsAvailable(): boolean {
    return !!localStorage.getItem(this.aesKeyName) &&
      !!localStorage.getItem(this.ivName);
  }

}
