import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) 
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); 

// Create a new instance of the services you'll need
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;