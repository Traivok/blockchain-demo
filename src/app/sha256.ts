export default async function sha256(data: string | object): Promise<string> {
    const enc = new TextEncoder();
    const dec = new TextDecoder(enc.encoding);

    if (typeof data === 'object')
        data = JSON.stringify(data);

    const encoded     = enc.encode(data);
    const arrayBuffer = await window.crypto.subtle.digest('SHA-256', encoded);
    return bufferToHex(arrayBuffer);
};

function bufferToHex(hashBuffer: ArrayBuffer): string {
    // convert buffer to byte array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    // convert bytes to hex string
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
