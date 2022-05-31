import { Appwrite, Query } from "appwrite";
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

  executeCreateDocument: (payload) => {
    return api
      .provider()
      .functions.createExecution(AppWriteConfig.addTicketFunctionID, payload);
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

  getComments: (collectionId, ticketId) => {
    return api
      .provider()
      .database.listDocuments(collectionId, [
        Query.equal("ticketId", ticketId),
      ]);
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
