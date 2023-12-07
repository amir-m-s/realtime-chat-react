import { Client } from "appwrite";

// Create a Client instance
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6570c320d19d4897747c");

export default client;
