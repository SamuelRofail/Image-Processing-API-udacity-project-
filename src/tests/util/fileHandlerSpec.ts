import fileHandler from '../../util/fileHandler';
import { promises as fs } from 'fs';
import path from 'path';


describe('Test image processing with sharp', (): void => {
  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await fileHandler.createImage({
      filename: 'boo',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('raises an error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await fileHandler.createImage({
      filename: 'boo',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('succeeds to write resized thumb file (existing file, valid size values)', async (): Promise<void> => {
    await fileHandler.createImage({ filename: 'fjord', width: '250', height: '250' });

    const resizedImagePath: string = path.resolve(
        fileHandler.imagesThumbsPath,'fjord-250x250.jpg');
    let errorFile: null | string = '';

    try {
      await fs.access(resizedImagePath);
      errorFile = null;
    } catch {
      errorFile = 'File was not created';
    }

    expect(errorFile).toBeNull();
  });
});

// Erase test files.
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    fileHandler.imagesThumbsPath,
    'fjord-250x250.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // do nothing
  }
});
