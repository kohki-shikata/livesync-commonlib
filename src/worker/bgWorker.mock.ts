import { decrypt, encrypt } from "octagonal-wheels/encryption";
import { splitPieces2, splitPieces2V2 } from "../string_and_binary/chunks";

export function terminateWorker() {
    return;
}

export function splitPieces2Worker(dataSrc: Blob, pieceSize: number, plainSplit: boolean, minimumChunkSize: number, filename?: string, useSegmenter?: boolean) {
    return splitPieces2(dataSrc, pieceSize, plainSplit, minimumChunkSize, filename, useSegmenter ?? false);
}
export function splitPieces2WorkerV2(dataSrc: Blob, pieceSize: number, plainSplit: boolean, minimumChunkSize: number, filename?: string, useSegmenter?: boolean) {
    return splitPieces2V2(dataSrc, pieceSize, plainSplit, minimumChunkSize, filename, useSegmenter ?? false);
}

export function encryptWorker(input: string, passphrase: string, autoCalculateIterations: boolean): Promise<string> {
    return encrypt(input, passphrase, autoCalculateIterations);
}

export function decryptWorker(input: string, passphrase: string, autoCalculateIterations: boolean) {
    return decrypt(input, passphrase, autoCalculateIterations);
}
