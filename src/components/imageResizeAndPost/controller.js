const sharp = require('sharp')
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


// s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data.Buckets);
//     }
//   });

// s3.listObjects({Bucket : 'website9820578297',}, function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data);
//     }
//   });

// const s3download = (bucketName='website9820578297', keyName='image.jpg', localDest) => {

//     if (typeof localDest == 'undefined') {
//         localDest = keyName;
//     }

//     let params = {
//         Bucket: bucketName,
//         Key: keyName
//     };

//     let file = fs.createWriteStream(localDest);

//     return new Promise((resolve, reject) => {
//         s3.getObject(params).createReadStream()
//         .on('end', () => {
//             console.log("here");
//             return resolve();
//         })
//         .on('error', (error) => {
//             console.log(error,"yo here");
//             return reject(error);
//         }).pipe(file);
//     });
// };

// s3download();



let params = {
    Bucket: 'website9820578297',
    Key: 'image.jpg'
};

const uploadFile = async (req, res, next) => {

    try { 
        const image_800 = await s3.getObject({ Bucket: 'website9820578297', Key: 'image_800.jpg' }).promise();
        if (image_800) {
            req.redirectUrl = "https://website9820578297.s3.ap-south-1.amazonaws.com/image_800.jpg";
            next();
            return;
        }
    } catch (error) {
        // console.log(error);
    } 

    
    const originalImage = await s3.getObject(params).promise();
    const image = sharp(originalImage.Body);
    image
        .metadata()
        .then(function (metadata) {
            return image
                .resize({ width: 800, height: 600 }).jpeg()
                .toBuffer();
        })
        .then(function (data) {

            let str = data.toString('base64')
            const imageContent = Buffer.from(str, 'base64');
            const params = {
                Bucket: 'website9820578297',
                Key: 'image_800.jpg',
                Body: imageContent
            };
            s3.upload(params, function (s3Err, data) {
                if (s3Err) throw s3Err
                console.log(`File uploaded successfully at ${data.Location}`)
                req.redirectUrl = data.Location;
                next();
            });

            const resizeImage = sharp(data);
            resizeImage.metadata().then(function (metadata) {
                console.log(metadata, " this one resized metadata");
            }).then(function (data) { })
            
        });
};


module.exports = { uploadFile }

