import { Injectable } from '@angular/core';
import { Util } from './_util';



@Injectable()
export class CryptoService {

    constructor() { }

    // 1. Using RandomValue to Generate CryptoKey 
        // -- generate key
    generateAesCbcKey() {
        // Create a CryptoKey
       return window.crypto.subtle.generateKey(
            { name: "AES-CBC", length: 256 },
            true,
            ["encrypt", "decrypt"]
        )
        .then((key) => {
            // Export to ArrayBuffer
            return window.crypto.subtle.exportKey(
                "raw",
                key
            );
        })
        .then((buf) => {
            // Cast to a byte array, place in Key field
            var byteArray = new Uint8Array(buf);
            return Util.byteArrayToHexString(byteArray);
        });

    }
        // -- encrypt data


        // -- decrypt data

    // 2. Using Password to Generate CryptoKey



    // 3. Using Private & Public Keys with Server Communication



    ///////////////////API FOR 1///////////////////



}