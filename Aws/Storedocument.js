const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const bucketName = "your-s3-bucket-name";

  try {
    const { fileName, fileContent } = event;

    if (!fileName || !fileContent) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Both fileName and fileContent are required.",
        }),
      };
    }

    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: Buffer.from(fileContent, "base64"),
      ContentType: "application/pdf",
    };

    await s3.upload(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "File ${fileName} uploaded successfully to ${bucketName}",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "An error occurred while uploading the file.",
        details: error.message,
      }),
    };
  }
};
