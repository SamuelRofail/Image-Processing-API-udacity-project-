import { promises as fs } from 'fs';
import path from 'path';
import processingImage from './sharp-image-processing';


interface imageparams {
    filename? : string;
    width? : string;
    height?: string;
}


export default class fileHandler {
    
    static imagesOriginalPath = path.resolve(__dirname, '../../assets/original');
    static imagesThumbsPath = path.resolve(__dirname, '../../assets/thumbs');
    
    /**
      @param {imageparams} params 
      @param {string} [params.filename] 
      @param {number} [params.width] 
      @param {number} [params.height] 
      @return {null|string} 
     */
    
    static async imagePath(params: imageparams) :Promise<null | string> {
        if (!params.filename){
            return null;
        }

        const filePath : string = params.width && params.height 
        ? path.resolve(fileHandler.imagesThumbsPath,
          `${params.filename}-${params.width}x${params.height}.jpg`)
          : path.resolve(fileHandler.imagesOriginalPath, `${params.filename}.jpg`);
        
        try {
            await fs.access(filePath);
            return filePath;
        }
        catch{
            return null;
        } 
    }

    /**
      @param {string} [filename=''] 
      @return {boolean} 
     */
    static async checkAvailableImages(filename: string = ' ') : Promise <boolean>{
        if (!filename){
            return false;
        }
        return (await fileHandler.getAvailableImages()).includes(filename) ;
    }
    /**
     * @return {string[]} 
     */
    static async getAvailableImages() : Promise<string[]>{
        try {
            return (await fs.readdir(fileHandler.imagesOriginalPath)).map((filename : string) :string => filename.split('.')[0]);
        }
        catch{
            return [];
        }
    }

    /**
      @param {imageparams} params 
      @param {string} [params.filename] 
      @param {number} [params.width] 
      @param {number} [params.height] 
      @return {boolean} 
     */
    
    static async checkThumbAvailable(params : imageparams) : Promise<boolean>{
        if (!params.filename || !params.width || !params.height){
            return false;
        }

        const filePath : string = path.resolve(fileHandler.imagesThumbsPath, `${params.filename}-${params.width}x${params.height}.jpg`);
        try{
            await fs.access(filePath);
            return true;
        }  
        catch{
            return false;
        }
    }

    static async createImagePath() : Promise <void> {
        try{
            await fs.access(fileHandler.imagesThumbsPath);
        }
        catch{
            fs.mkdir(fileHandler.imagesThumbsPath);
        }
    }
    /**
      @param {imageparams} params 
      @param {string} [params.filename] 
      @param {string} [params.width] 
      @param {string} [params.height] 
      @return {null|string} 
     */
    static async createImage(params : imageparams): Promise<null | string> {
        if (!params.filename || !params.width || !params.height){
            return null;
        }

        const fullImagePath : string = path.resolve(fileHandler.imagesOriginalPath, `${params.filename}.jpg`);
        const thumbImagePath : string = path.resolve(fileHandler.imagesThumbsPath , `${params.filename}-${params.width}x${params.height}.jpg`);

        console.log(`creating new thumb now ${thumbImagePath}`);

        return await processingImage({
            imagePath: fullImagePath,
            target: thumbImagePath,
            width: parseInt(params.width),
            height: parseInt(params.height)
        });
    }
    

}
