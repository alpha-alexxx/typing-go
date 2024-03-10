export function dataURItoBlob(dataURI: string, mimeType: string): Blob {
  const byteString = atob(dataURI.split(",")[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
}
