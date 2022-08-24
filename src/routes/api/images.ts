import express from 'express';
import fileHandler from '../../util/fileHandler';


interface imageparams {
  filename?: string;
  width?: string;
  height?: string;
}

/**
 * @param {imageparams} query 
 * @return {null|string} 
 */


const paramsValidator = async (query: imageparams): Promise<null | string> => {
  if (!(await fileHandler.checkAvailableImages(query.filename))) {
    const availableImageNames: string = (
      await fileHandler.getAvailableImages()
    ).join(', ');
    return `<h3>Pass a valid filename.</h3> <strong>Available filenames are:</strong> ${availableImageNames}. <br>
    <strong>Try </strong> <ul>
    <li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li>
    <li><a href="/api/images?filename=palmtunnel&width=900&height=800">/api/images?filename=palmtunnel&width=900&height=800</a></li> 
    <li><a href="/api/images?filename=santamonica&width=2000&height=2000">/api/images?filename=santamonica&width=2000&height=2000</a></li> 
    <li><a href="/api/images?filename=encenadaport&width=5000&height=500">/api/images?filename=encenadaport&width=5000&height=500</a></li>  
    <li><a href="/api/images?filename=icelandwaterfall&width=1000&height=1000">/api/images?filename=icelandwaterfall&width=1000&height=1000</a></li>  
    </ul>
    `;
  }

  if (!query.width && !query.height) {
    return null; 
  }

  const width: number = parseInt(query.width || '');
  if (Number.isNaN(width) || width < 1) {
    return 'Pass a positive numerical value for the width query parameter.';
  }

  const height: number = parseInt(query.height || '');
  if (Number.isNaN(height) || height < 1) {
    return 'Pass a positive numerical value for the height query parameter.';
  }

  return null;
};

const images: express.Router = express.Router();

images.get('/',async (request: express.Request,response: express.Response): Promise<void> => {
    const validationMessage: null | string = await paramsValidator(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    if (!(await fileHandler.checkThumbAvailable(request.query))) {
      error = await fileHandler.createImage(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const path: null | string = await fileHandler.imagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened :-D What did you do?');
    }
  }
);

export default images;
