import multer from "multer";
const mimeTypesWhitelist = ["image/png", "image/jpeg", "image/jpg"];

const upload = multer({
  storage: multer.memoryStorage(),
  // limits: {
  //   fileSize: maxFileSize,
  // },
  fileFilter: (req, file, cb) => {
    // if (!mimeTypesWhitelist.includes(file.mimetype)) {
    //   return cb(new BadRequestError("forbidden_file_type"));
    // }
    return cb(null, true);
  },
});

export { upload };
