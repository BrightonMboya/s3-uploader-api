const db = require("../database/models/");
const dotenv = require("dotenv");
const aws = require("aws-sdk");
const { randomUUID } = require("crypto");
const S3 = require("aws-sdk/clients/s3");
// import S3 from "aws-sdk/clients/s3";
dotenv.config();

const { File } = db;

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION,
  signatureVersion: "v4",
});

class uploadController {
  //method to upload file and insert in the DB
  static async uploadMyFile(req, res) {
    console.log("hello", req.file);
    console.log("Body of the file", req.file["mimetype"]);

    if (!req.file) return res.send("Please upload a file");

    if (req.method !== "POST") {
      return res
        .status("405")
        .json({ errors: { error: "Method not allowed" } });
    }

    const uniqueName = randomUUID();

    try {
      //Upload file to S3
      // let { name, type } = req.file["mimetype"];

      // remember to test this part
      const extension = req.file["mimetype"].split("/")[1];

      const fileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${uniqueName}.${extension}`,
        // Key: req.file["originalname"].trim(),
        ContentType: "image/png",
        Expires: 600,
      };
      const url = await s3.getSignedUrlPromise("putObject", fileParams);

      // res.status(200).json({ url, key: req.file["originalname"].trim() });
      res.status(200).json({
        s3: {
          ETag: "",
          Location: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${uniqueName}.${extension}`,
          key: `${uniqueName}.${extension}`,
          Bucket: process.env.BUCKET_NAME,
        },
        db: {
          createdAt: { val: "NOW()" },
          id: 1,
          fileName: `${uniqueName}.${extension}`,
          fileLink: `https://${process.env.BUCKET_NAME}.s3.amazonaws.com/${uniqueName}.${extension}`,
        },
      });

      //Insert file name and link in DB

      // Return error of success msg
    } catch (error) {
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
