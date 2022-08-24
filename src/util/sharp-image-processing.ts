import sharp from 'sharp';

interface sharpingImages {
    imagePath : string; 
    target : string;
    width : number;
    height : number;
    
}

/**
    @param {sharpingImages} params 
    @param {string} params.imagePath 
    @param {string} params.target
    @param {number} params.width 
    @param {number} params.height 
    @return {null|string} 
*/

const processingImage = async (
    params: sharpingImages
): Promise <null | string> => {
    try {
        await sharp(params.imagePath)
          .resize( params.width, params.height)
          .toFormat('jpeg')
          .toFile(params.target);
        return null;
      } catch {
        return 'Image could not be processed.';
      }
};

export default processingImage;