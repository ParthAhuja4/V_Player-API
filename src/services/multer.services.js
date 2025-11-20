import multer from "multer";

//We temporarily store files because Multer must convert the raw upload stream into either a disk file or an in-memory buffer before cloud services can read it (disk = saved locally, memory = stored in RAM).

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({
  storage,
});
