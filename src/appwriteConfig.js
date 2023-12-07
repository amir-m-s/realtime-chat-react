import { Client, Databases } from "appwrite";

export const PROJECT_ID = "6570c320d19d4897747c";
export const DATABASE_ID = "6570c424b14ca6265502";
export const COLLECTION_ID_MESSAGES = "6570c4328e09191eaf9d";

// Create a Client instance
const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6570c320d19d4897747c");

export const databases = new Databases(client);

export default client;
