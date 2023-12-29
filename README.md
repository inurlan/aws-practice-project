# AWS S3 Bucket, CloudFront, and EC2 Setup with Node.js

This guide walks you through the process of setting up an AWS S3 bucket, CloudFront distribution, and deploying a Node.js application on an EC2 instance.

## Prerequisites

1. **AWS Account:** Ensure that you have an AWS account. If not, you can create one [here](https://aws.amazon.com/).

2. **Node.js and npm:** Make sure you have Node.js and npm installed on your machine. You can download them [here](https://nodejs.org/).

## Step 1: Create an S3 Bucket

1. Open the [AWS S3 Console](https://s3.console.aws.amazon.com/).

2. Click on "Create bucket" and follow the instructions to create a new bucket. Choose a globally unique name (e.g., `YOUR_BUCKET_NAME`).

3. Upload your Node.js application files to the bucket.

## Step 2: Configure S3 Bucket for Static Website Hosting

1. In the S3 Console, navigate to your bucket.

2. Open the "Properties" tab and click on "Static website hosting."

3. Choose "Use this bucket to host a website" and configure the index and error document.

## Step 3: Create a CloudFront Distribution

1. Open the [AWS CloudFront Console](https://console.aws.amazon.com/cloudfront/).

2. Click on "Create Distribution."

3. Choose "Web" distribution, and configure the settings:
    - Origin Domain Name: Select the S3 bucket endpoint.
    - Default Root Object: Set to the index file (e.g., `index.html`).

4. Click "Create Distribution" and wait for it to deploy.

5. Once deployed, note the CloudFront distribution ID (e.g., `YOUR_CLOUDFRONT_DISTRIBUTION_ID`).

## Step 4: Create an EC2 Instance

1. Open the [AWS EC2 Console](https://console.aws.amazon.com/ec2/).

2. Launch a new EC2 instance with the Amazon Linux 2 AMI or your preferred AMI.

3. Configure the security group to allow inbound traffic on the desired port (e.g., 80 or 8080).

4. Connect to your EC2 instance using SSH.

## Step 5: Deploy Your Node.js Application on EC2

1. Copy your Node.js application files to your EC2 instance.

   ```bash
   scp -r /path/to/your/app ec2-user@your-ec2-instance-ip:/path/on/ec2
   
2. Connect to your EC2 instance.

3. Install Node.js and npm on your EC2 instance.

   ```bash
   sudo yum install -y nodejs npm
   
4. Navigate to your application folder and install dependencies.

   ```bash
   cd /path/on/ec2/your-app
   npm install

5. Start your Node.js application.
   
   ```bash
   node app.js
   
6. Access your application through the EC2 instance's public IP or DNS.
