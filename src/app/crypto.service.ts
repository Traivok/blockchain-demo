import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    public async hash(data: string): Promise<string> {
        const enc = new TextEncoder();
        const dec = new TextDecoder(enc.encoding);

        const encoded     = enc.encode(data);
        const arrayBuffer = await window.crypto.subtle.digest('SHA-256', encoded);
        return this.bufferToHex(arrayBuffer);
    };

    protected bufferToHex(hashBuffer: ArrayBuffer): string {
        // convert buffer to byte array
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        // convert bytes to hex string
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
}
