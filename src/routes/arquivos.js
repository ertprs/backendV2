import express from 'express' 
import ensureAuthenticated from '../middlewares/ensureAuthenticated.js'
import multer from 'multer'; 
import uploadConfig from '../config/upload.js'

const router = express.Router();
const upload = multer(uploadConfig);
 
// router.post('/', ensureAuthenticated, upload.single('file'),
router.post('/', upload.single('file'),
    async(request, response) => {
        try{
            console.log(request.user.id)
            console.log(request.file.filename)
            return response.status(200).json({ ok: true })

        }catch (err) { return response.status(400).json({ error: err })}
    }
)

export default router;