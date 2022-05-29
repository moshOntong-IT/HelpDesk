import { Appwrite } from "appwrite";
import { AppWriteConfig } from "../../utils/config";
let api = {
  sdk: null,

  provider: () => {
    if (api.sdk) {
      return api.sdk;
    }
    let appwrite = new Appwrite();
    appwrite
      .setEndpoint(AppWriteConfig.endpoint)
      .setProject(AppWriteConfig.project);
    api.sdk = appwrite;

    return appwrite;
  },

  createAccount: (email, password, name) => {
    return api.provider().account.create("unique()", email, password, name);
  },

  getAccount: () => {
    return api.provider().account.get();
  },

  createSession: (email, password) => {
    return api.provider().account.createSession(email, password);
  },

  deleteCurrentSession: () => {
    return api.provider().account.deleteSession("current");
  },

  createDocument: (collectionId, data, read, write) => {
    return api
      .provider()
      .database.createDocument(collectionId, "unique()", data, read, write);
  },

  listDocuments: (collectionId) => {
    return api
      .provider()
      .database.listDocuments(
        collectionId,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        ["createdAt"],
        ["DESC"]
      );
  },

  getTicket: (collectionId, documentId) => {
    return api.provider().database.getDocument(collectionId, documentId);
  },

  updateDocument: (collectionId, documentId, data, read, write) => {
    return api
      .provider()
      .database.updateDocument(collectionId, documentId, data, read, write);
  },

  deleteDocument: (collectionId, documentId) => {
    return api.provider().database.deleteDocument(collectionId, documentId);
  },
};

export default api;
