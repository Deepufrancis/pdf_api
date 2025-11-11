import { v2 as cloudinary } from 'cloudinary';
import { getEnvVariable } from '../utils/helpers';

cloudinary.config({
    cloud_name: getEnvVariable('CLOUDINARY_CLOUD_NAME'),
    api_key: getEnvVariable('CLOUDINARY_API_KEY'),
    api_secret: getEnvVariable('CLOUDINARY_API_SECRET'),
});

export default cloudinary;
