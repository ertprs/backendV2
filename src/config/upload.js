import path from 'path'; 
import crypto from 'crypto';
import multer from 'multer'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default{
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName)
        }
    }),
};

