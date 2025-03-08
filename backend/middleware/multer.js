import multer from 'multer';
import path from 'path';

// Set up storage for uploaded photos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

// Filter only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpg|jpeg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Only image files (JPG, JPEG, PNG) are allowed."));
    }
};

// Set a file size limit (e.g., max 5MB for images)
const limits = { fileSize: 5 * 1024 * 1024 }; // 5MB

const upload = multer({
    storage,
    fileFilter,
    limits
});

export default upload;
