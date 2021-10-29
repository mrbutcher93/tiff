import { readFileSync } from 'fs';
import { join } from 'path';

import { decode } from '..';

// We can decompress images using 'convert' from imagemagick
// convert image-lzw.tif -define colorspace:auto-grayscale=false -type truecolor image.tif

describe('decode lzw', () => {
  it('image', () => {
    const lzwBuffer = readFileSync(join(__dirname, '../../img/image-lzw.tif'));
    const imageLzw = decode(lzwBuffer);
    const buffer = readFileSync(join(__dirname, '../../img/image.tif'));
    const image = decode(buffer);
    expect(
      dataEqual(imageLzw[0].data as Uint8Array, image[0].data as Uint8Array),
    ).toBe(true);
  });
  it('color8', () => {
    const lzwBuffer = readFileSync(join(__dirname, '../../img/color8-lzw.tif'));
    const imageLzw = decode(lzwBuffer);
    const buffer = readFileSync(join(__dirname, '../../img/color8.tif'));
    const image = decode(buffer);
    expect(
      dataEqual(imageLzw[0].data as Uint8Array, image[0].data as Uint8Array),
    ).toBe(true);
  });
});

function dataEqual(data1: Uint8Array, data2: Uint8Array): boolean {
  if (data1.length !== data2.length) return false;
  for (let i = 0; i < data1.length; i++) {
    if (data1[i] !== data2[i]) {
      return false;
    }
  }
  return true;
}
