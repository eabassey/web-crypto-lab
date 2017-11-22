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
        // Yield a Promise of a 256-bit AES-CBC CryptoKey
     convertPassphraseToKey(passphraseString) {
        const iterations = 1000000;   // Longer is slower... hence stronger
        const saltString = 'This is my salt. I need more pepper and tomatoes to spice up..';
        const saltBytes = Util.stringToByteArray(saltString);
        const passphraseBytes = Util.stringToByteArray(passphraseString);

        // deriveKey needs to be given a base key. This is just a
        // CryptoKey that represents the starting passphrase.
        return window.crypto.subtle.importKey(
            'raw',
            passphraseBytes,
            {name: 'PBKDF2'}
            ,
            false,
            ['deriveKey']
        )
        .then((baseKey) => {
            return window.crypto.subtle.deriveKey(
                // Firefox currently only supports SHA-1 with PBKDF2
                {name: 'PBKDF2', salt: saltBytes, iterations: iterations, hash: 'SHA-1'},
                baseKey,
                {name: 'AES-CBC', length: 256}, // Resulting key type we want
                true,
                ['encrypt', 'decrypt']
            );
        })
        .then(aesCbcKey => {
            // Export to ArrayBuffer
            return window.crypto.subtle.exportKey(
                'raw',
                aesCbcKey
            );
        })
        .then((buf) => {
            // Cast to a byte array, place in Key field
            const byteArray = new Uint8Array(buf);
            return Util.byteArrayToHexString(byteArray);
        });
    }

        // password based encryption
    encryptWithPassword(password: string) {
    }


    // 3. Using Private & Public Keys with Server Communication



    /////////////////// API FOR 1///////////////////



}
