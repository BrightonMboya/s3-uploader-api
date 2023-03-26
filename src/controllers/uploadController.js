const db = require("../database/models/");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const { randomUUID } = require("crypto");
dotenv.config();

const { File } = db;

const s3 = new aws.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: "v4",
});

class uploadController {
  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {
    // if (!req.file) return res.send("Please upload a file");

    if (req.method !== "POST") {
      return res
        .status("405")
        .json({ errors: { error: "Method not allowed" } });
    }

    const uniqueName = randomUUID();

    try {
      //Upload file to S3
      // let { name, type } = req.body;

      // remember to test this part
      // const extension = type.split("/")[1];
      // const extension = type.split('/')[1];
      console.log('Theeeee requestttttttt', req)
      const fileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${uniqueName}`,
        // ContentType: type,
        Expires: 600,
      };

      const url = await s3.getSignedUrlPromise("putObject", fileParams);
      res.status(200).json({ url, key: `${uniqueName}` });

      //Insert file name and link in DB

      // Return error of success msg
    }
    catch (error) {
      console.log('Theeeee requestttttttt', req)
      console.log("ERROR", error);
      return res.status("500").json({
        errors: { error: "Failure to upload a file", err: error.message },
      });
    }
  }

  //method to return files in the DB
  static async getFiles(req, res) {
    //Code to get all files from DB and return them
  }
}

module.exports = uploadController;
