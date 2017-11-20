
// Various tools to convert string formats to and from
// byte arrays (that is, Uint8Array), since the Web Crypto
// API likes byte arrays, and web pages like strings.
export class Util {
    
        static byteArrayToHexString(byteArray) {
            let hexString = '';
            let nextHexByte;
            for (var i = 0; i < byteArray.byteLength; i++) {
                nextHexByte = byteArray[i].toString(16);    // Integer to base 16
                if (nextHexByte.length < 2) {
                    nextHexByte = "0" + nextHexByte;        // Otherwise 10 becomes just a instead of 0a
                }
                hexString += nextHexByte;
            }
            return hexString;
        }
    
    
        static hexStringToByteArray(hexString: string) {
            if (hexString.length % 2 !== 0) {
                throw "Must have an even number of hex digits to convert to bytes";
            }
            var numBytes = hexString.length / 2;
            var byteArray = new Uint8Array(numBytes);
            for (var i = 0; i < numBytes; i++) {
                byteArray[i] = parseInt(hexString.substr(i * 2, 2), 16);
            }
            return byteArray;
        }
    
    
        static byteArrayToBase64(byteArray) {
            var binaryString = "";
            for (var i = 0; i < byteArray.byteLength; i++) {
                binaryString += String.fromCharCode(byteArray[i]);
            }
            var base64String = window.btoa(binaryString);
            return base64String;
        }
    
    
        static base64ToByteArray(base64String: string) {
            var binaryString = window.atob(base64String);
            var byteArray = new Uint8Array(binaryString.length);
            for (var i = 0; i < binaryString.length; i++) {
                byteArray[i] += binaryString.charCodeAt(i);
            }
            return byteArray;
        }
    
    
        static byteArrayToString(byteArray) {
            if ("TextDecoder" in window) {
               const decoder = new window['TextDecoder'];
                return decoder.decode(byteArray);
            }
    
            // Otherwise, fall back to 7-bit ASCII only
            var result = "";
            for (var i = 0; i < byteArray.byteLength; i++) {
                result += String.fromCharCode(byteArray[i])
            }
            return result;
        }
    
    
        static stringToByteArray(s: string) {
            if ("TextEncoder" in window) {
                const encoder = new window['TextEncoder'];
                return encoder.encode(s);
            }
    
            // Otherwise, fall back to 7-bit ASCII only
            var result = new Uint8Array(s.length);
            for (var i = 0; i < s.length; i++) {
                result[i] = s.charCodeAt(i);
            }
            return result;
        }
    
    }