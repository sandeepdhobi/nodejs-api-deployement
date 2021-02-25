const express = require('express')
const multer = require('multer');
const reviewData = require('./schema');
const { uploadFile } = require('./controller');
const router = new express.Router()
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});



const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/addData', upload.single('image'), async (req, res) => {
    try {
        // console.log(req.body.review,req.file," here is all request",req.body)
        s3.deleteObject({Bucket: 'website9820578297',Key: "image_800.jpg",}).promise();
        let str = req.file.buffer.toString('base64')
        const imageContent = Buffer.from(str, 'base64');
        const params = {
            Bucket: 'website9820578297',
            Key: "image.jpg", 
            Body: imageContent
        };
        await s3.upload(params, async function(s3Err, data) {
            if (s3Err) throw s3Err
            console.log(`File uploaded successfully at ${data.Location}`);
            dataUrl = data.Location
            const body = {
                url: dataUrl,
                review: req.body.review,
                rating: req.body.rating,
            };
            const responseData = new reviewData(body);
            await responseData.save();
            res.status(200).send({ message: "Added reviewDatas", data: responseData })

            //SQL equivalent
            // var sql = "INSERT INTO table_name (url, review, rating) VALUES (dataUrl, req.body.review, req.body.rating)";  
            // con.query(sql, function (err, result) {  
            // if (err) throw err;  
            // console.log("1 record inserted");  
            // });  

        });

    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


router.get("/getUrl",uploadFile, async (req, res) => {
    try {

        res.redirect(req.redirectUrl);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})


module.exports = router