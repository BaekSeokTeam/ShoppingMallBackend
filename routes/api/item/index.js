var express = require('express');
var router = express.Router();
const Item = require('../../../model/item');
const multer = require('multer');
const controller = require('./item.controller');
const randomstring = require('randomstring');

const imageUpload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, `${__dirname}/../../../public/images`); 
      },
      filename: (req, file, cb) => {
        let fileName =  randomstring.generate(25); 
        let mimeType;
        switch (
          file.mimetype 
        ) {
          case 'image/jpeg':
            mimeType = 'jpg';
            break;
          case 'image/png':
            mimeType = 'png';
            break;
          case 'image/gif':
            mimeType = 'gif';
            break;
          case 'image/bmp':
            mimeType = 'bmp';
            break;
          default:
            mimeType = 'jpg';
            break;
        }
        cb(null, fileName + '.' + mimeType); // 파일 이름 + 파일 타입 형태로 이름을 바꿉니다.
      },
    }),
    limits: {
      fileSize: 5 * 1024 * 1024, // 크기제한입니다. 기준은 byte 입니다.
    },
  });
router.post('/add', imageUpload.array('image'));
router.post('/add',controller.addItem);
router.post('/delete',controller.deleteItem);
router.post('/edit',controller.editItem);
router.get('/viewAll',controller.viewAllItem);

router.get('/test',controller.test);

module.exports = router;