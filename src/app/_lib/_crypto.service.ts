import { Injectable, Inject } from '@angular/core';
import { Util } from './_util';
import { AES_CBC_KEY_NAME, INIT_VECTOR } from './config';



@Injectable()
export class CryptoService {

    constructor(
        @Inject(AES_CBC_KEY_NAME) private aesKey: string,
        @Inject(INIT_VECTOR) private ivName: any
    ) { }

    // 1. Using RandomValue to Generate CryptoKey
    // -- generate key
    generateAesCbcKey() {
        // Create a CryptoKey
        return window.crypto.subtle.generateKey(
            { name: 'AES-CBC', length: 256 },
            true,
            ['encrypt', 'decrypt']
        )
            .then((key) => {
                // Export to ArrayBuffer
                return window.crypto.subtle.exportKey(
                    'raw',
                    key
                );
            })
            .then((buf) => {
                // Cast to a byte array, place in Key field
                const byteArray = new Uint8Array(buf);
                return Util.byteArrayToHexString(byteArray);
            });

    }
    // -- encrypt data
    encryptWithAesCbcKey(object: any) {
        // Start by getting Key and Plaintext into byte arrays
        const keyString = localStorage.getItem(this.aesKey);
        const keyBytes = Util.hexStringToByteArray(keyString);

        const objectString = JSON.stringify(object);
        const objectBytes = Util.stringToByteArray(objectString);

        // Make a CryptoKey from the Key string
      return  window.crypto.subtle.importKey(
            'raw',
            keyBytes,
            { name: 'AES-CBC', length: 256 },
            false,
            ['encrypt']
        )
        .then((key) => {
            const ivString = localStorage.getItem(this.ivName);
            const ivBytes = Util.hexStringToByteArray(ivString);
            // Use the CryptoKey to encrypt the plaintext
            return window.crypto.subtle.encrypt(
                { name: 'AES-CBC', iv: ivBytes },
                key,
                objectBytes
            );
        })
        .then((cipherBuffer) => {
            // Encode cipherBuffer to base 64 to be put in IndexedDB
            const cipherBytes = new Uint8Array(cipherBuffer);
            const base64Ciphertext = Util.byteArrayToBase64(cipherBytes);
            return base64Ciphertext;
        });
    }

    // -- decrypt data
     decryptWithAesCbcKey(cipherText) {
        // Start by getting Key, IV, and Ciphertext into byte arrays
        // key conversion
       const keyString = localStorage.getItem(this.aesKey);
       const keyBytes = Util.hexStringToByteArray(keyString);

       // cipher conversion
       const cipherBytes = Util.base64ToByteArray(cipherText);

        // iv conversion
       const ivString = localStorage.getItem(this.ivName);
        const ivBytes = Util.hexStringToByteArray(ivString);

        // Make a CryptoKey from the Key string
      return window.crypto.subtle.importKey(
            'raw',
            keyBytes,
            {name: 'AES-CBC', length: 256},
            false,
            ['decrypt']
        ).then((key) => {
            // Use the CryptoKey and IV to decrypt the cipher
            return window.crypto.subtle.decrypt(
                {name: 'AES-CBC', iv: ivBytes},
                key,
                cipherBytes
            );
        })
        .then((cipherBuffer) => {
           const plaintextBytes = new Uint8Array(cipherBuffer);
           const plaintextString = Util.byteArrayToString(plaintextBytes);
           // const parsedObject = JSON.parse(plaintextString);
           return plaintextString;
        });
    }

    // 2. Using Password to Generate CryptoKey



    // 3. Using Private & Public Keys with Server Communication



    /////////////////// API FOR 1///////////////////



}
