# Image Generation using Amazon Bedrock

This repository contains a project for generating images using Amazon Bedrock. The project is divided into two main folders: `API` and `UI`.

## Project Structure

- **API**: Developed in Node.js
- **UI**: Developed in React.js

## Prerequisites

- Node.js (minimum version 18)

## Setup Instructions

### API Setup

1. Navigate to the `API` folder:
   ```bash
   cd API
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Rename the .env.sample file to .env and paste your AWS Bedrock credentials into the .env file.
   ```bash
   AWS_REGION=
   AWS_ACCESS_KEY=
   AWS_SECRET_KEY=
   ```

### UI Setup

1. Navigate to the `UI` folder:
   ```bash
   cd UI
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
   
## Testing the Demo
To test the demo, follow these steps:

1. Start the API by running the following command in the API folder:
   ```bash
   npx ts-node src/index.ts
   ```

2. Start the UI by running the following command in the UI folder:
   ```bash
   npm run dev
   ```

3. Open the app in your browser using the URL:
   ```
   http://localhost:5173
   ```

## Contributing
Feel free to open issues or submit pull requests if you have any improvements or bug fixes.
