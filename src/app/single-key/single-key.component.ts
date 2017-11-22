import { Component, OnInit, Inject } from '@angular/core';
import { StorageService } from '../_lib/storage.service';
import { CryptoService } from '../_lib/_crypto.service';
import { AES_CBC_KEY_NAME, INIT_VECTOR } from '../_lib/config';
import { Util } from '../_lib/_util';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';

@Component({
  selector: 'app-single-key',
  templateUrl: './single-key.component.html',
  styleUrls: ['./single-key.component.css']
})
export class SingleKeyComponent implements OnInit {

  customers = [];

  constructor(private db: StorageService,
    private crypto: CryptoService,
    @Inject(INIT_VECTOR) private ivName: any,
    @Inject(AES_CBC_KEY_NAME) private aesKeyName: string) { }

  ngOnInit() {
    // On Start, Check if Key already exists else create and store in localStorage
    if (!this.keyIsAvailable) {
      this.crypto.generateAesCbcKey()
        .then((aesKey) => {
          localStorage.setItem(this.aesKeyName, aesKey);

          const iv = window.crypto.getRandomValues(new Uint8Array(16));
          const ivHexString = Util.byteArrayToHexString(iv);
          localStorage.setItem(this.ivName, ivHexString);
        });
    }
  }

  // Checking for key string in localStorage
  get keyIsAvailable(): boolean {
    return !!localStorage.getItem(this.aesKeyName) &&
      !!localStorage.getItem(this.ivName);
  }

  onResetOrChangePassword() {
    // delete both AES Key in localStorage and the whole IndexedDB database.
    // generate new AES Key and store in localStorage
    // Refetch all data into IndexedDB encrypted with AES Key.
  }

  // COMPONENT FUNCTIONS
  addCustomer() {
    const customer = { id: 3, firstName: `Johnny ${new Date()}`, lastName: 'Walker' };
    this.crypto.encryptWithAesCbcKey(customer)
      .then((cipher) => {
        this.db.customers.add({ cipher: cipher });
      });
  }

  showCustomers() {
    this.db.customers.toArray()
      .then((array) => {
        const arr = [];
        for (const c of array) {
          arr.push(c);
        }
        return arr;
      })
      .then((cipherBuffer) => {
        for (const buf of cipherBuffer) {
          const plaintextBytes = new Uint8Array(buf);
          const plaintextString = Util.byteArrayToHexString(plaintextBytes);
          const parsedObject = JSON.parse(plaintextString);
          this.customers.push(parsedObject);
        }
        // const plaintextBytes = new Uint8Array(cipherBuffer);
        // const plaintextString = Util.byteArrayToString(plaintextBytes);
        // const parsedObject = JSON.parse(plaintextString);
        // this.customers.push(parsedObject);
      });

  }

  showCustomers2() {
    this.db.customers.each(obj => {
      const valuer = this.crypto.decryptWithAesCbcKey(obj.cipher);
      console.log(valuer);
      this.customers.push(valuer);
    });
  }

}




// showCustomers() {
//   this.db.customers.toArray()
//   .then((array) => {
//     const arr = [];
//     for (const c of array) {
//       arr.push(c);
//     }
//     return arr;
//   })
//   .then((cipherBuffer) => {
//     for (const buf of cipherBuffer) {
//       const plaintextBytes = new Uint8Array(buf);
//       const plaintextString = Util.byteArrayToString(plaintextBytes);
//       const parsedObject = JSON.parse(plaintextString);
//       this.customers.push(parsedObject);
//     }
//     // const plaintextBytes = new Uint8Array(cipherBuffer);
//     // const plaintextString = Util.byteArrayToString(plaintextBytes);
//     // const parsedObject = JSON.parse(plaintextString);
//     // this.customers.push(parsedObject);
//    });

// }
