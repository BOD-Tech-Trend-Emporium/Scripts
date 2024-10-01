# Data Population Scripts

This repository contains scripts to automatically populate the system's database _Product_ and _Category_ tables using external data retrieved from the FakeStore API and send it via the system's endpoints. The scripts handle authentication, retrieve data (categories and products), and upload them to the target system through HTTP requests.

## Key Features:

1.  **Authentication:** Logs in using user credentials to obtain a JWT token.

2.  **Data Retrieval:** Fetches categories and products from the FakeStore API.

3.  **Data Upload:** Sends the retrieved categories and products to the system via its respective endpoints.

4.  **Session Management:** Logs out once the operation is complete to invalidate the token.

These scripts are useful for automating the initial population of data in systems that require basic structures like categories and products to operate.

## Initial Setup

1. **Install dependencies:**
   Make sure you have Node.js installed. Then, run the following command to install the required packages:
   ```bash
   npm install
2. **Environment variables**
   Create a .env file in the root directory of the project and add the following variables:
   ```env
   FAKESTORE_API=<FakeStore API base URL>
   TTE_API=<Target system API base URL>
   USER_EMAIL=<Your login email>
   USER_PASSWORD=<Your login password>
3. **Run the scripts**
   To populate categories and products, execute the following commands:
   ```bash
   node 01-GetAllCategories.js
   node 02-GetAllProducts.js

These scripts will retrieve the data from FakeStore, authenticate to the target system, upload the data, and log out when done.
