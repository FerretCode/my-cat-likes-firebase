const firebase = require("firebase/app");
const firestore = require("firebase/firestore");

const logger = require("../utils/logger");

/**
 * A class for simplifying firebase functions
 * @class MyCatLikesFirebase
 */
class MyCatLikesFirebase {
  /**
   * The constructor for the MyCatLikesFirebase class
   * @param {object} options an object representing the options for the class
   * @param {object} options.firebaseConfig the config that firebase gives you for your app
   * @param {boolean} options.loggingEnabled a boolean for toggling logging on or off
   * @constructor
   */
  constructor(options) {
    this.firebaseConfig = options.firebaseConfig;
    this.loggingEnabled = options.loggingEnabled || true;

    if (!this.firebaseConfig)
      return logger.logErr("No firebaseConfig provided!");

    this.app = firebase.initializeApp(this.firebaseConfig);
    this.db = firestore.initializeFirestore(this.app, {});

    this.loggingEnabled
      ? logger.logInfo("Firebase has been initialized!")
      : "";
    /**
     * A function that creates or updates an existing document
     * @param {object} data the data to write to the doc
     * @param {string} path the path to write the doc to in Firestore
     * @returns {Promise<boolean>} A promise that resolves to a boolean if the write succeeded
     */
    this.createOrUpdateDoc = (data, path) => {
      if (typeof data !== "object")
        return logger.logErr("The data argument is not of type object!");

      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = firestore.doc(this.db, path);

        firestore.getDoc(doc).then((docData) => {
          if (docData.exists()) {
            this.updateDoc(data, path)
              .then(() => {
                resolve(true);
              })
              .catch((err) => reject(err));
          } else {
            this.createDoc(data, path)
              .then(() => {
                resolve(true);
              })
              .catch((err) => reject(err));
          }
        });
      });
    };

    /**
     * A function for creating or overwriting docs in Firestore
     * @param {object} data the data to write to the doc
     * @param {string} path the path to write the doc to in Firestore
     * @param {...string} pathSegments any extra path segments will be added onto the path
     * @returns {Promise<boolean>} A promise if the write succeeded
     */
    this.createDoc = (data, path, ...pathSegments) => {
      if (typeof data !== "object")
        return logger.logErr("The data argument is not of type object!");

      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      for (let pathSegment of pathSegments)
        if (typeof pathSegment !== "string")
          return logger.logErr("One path segment is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = firestore.doc(this.db, path, ...pathSegments);

        firestore.setDoc(doc, data).then(() => resolve(true));
      });
    };

    /**
     * A function for updating documents in Firestore
     * @param {object} data the data to update the doc with
     * @param {string} path the path to the doc to be updated
     * @param  {...pathSegments} pathSegments any extra path segments will be added onto the path
     * @returns {Promise<boolean>} A promise resolving to a boolean of if the write succeeded or not
     */
    this.updateDoc = (data, path, ...pathSegments) => {
      if (typeof data !== "object")
        return logger.logErr("The data argument is not of type object!");

      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      for (let pathSegment of pathSegments)
        if (typeof pathSegment !== "string")
          return logger.logErr("One path segment is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = firestore.doc(this.db, path, ...pathSegments);

        doc
          ? firestore.updateDoc(doc, data)
          : (reject(false), logger.logErr(`Doc was not found!`));

        resolve(true);
      });
    };

    /**
     * A function for deleting documents in Firestore
     * @param {string} path the path to the doc to be deleted
     * @returns {Promise<boolean>} A promise resolving to a boolean of if the delete succeeded or not
     */
    this.deleteDoc = (path) => {
      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = firestore.doc(this.db, path);

        doc
          ? firestore.deleteDoc(doc)
          : (reject(false), logger.logErr(`Doc was not found!`));

        resolve(true);
      });
    };

    /**
     * A function to get doc data at a path
     * @param {string} path the path to the document to get
     * @param {...string} pathSegments any path segments will be added to the path
     * @returns {Promise<object|string>} a promise with either the document data or an error string
     */
    this.getDoc = (path, ...pathSegments) => {
      if (typeof data !== "object")
        return logger.logErr("The data argument is not of type object!");

      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      for (let pathSegment of pathSegments)
        if (typeof pathSegment !== "string")
          return logger.logErr("One path segment is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = firestore.doc(this.db, path, ...pathSegments);
        firestore
          .getDoc(doc)
          .then((data) => {
            data.exists ? resolve(data) : resolve(undefined);
          })
          .catch((err) => reject(err));
      });
    };

    /**
     * A function that returns all docs from a collection
     * @param {string} path the path to the collection to fetch docs from
     */
    this.getDocs = (path) => {
      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      return new Promise((resolve, reject) => {
        let objectToResolve = {};

        let collection = firestore.collection(this.db, path);

        firestore
          .getDocs(collection)
          .then((snapshot) => {
            for (let doc of snapshot.docs) objectToResolve[doc.id] = doc.data();

            resolve(objectToResolve);
          })
          .catch((err) => reject(err));
      });
    };
  }
}

module.exports = {
  MyCatLikesFirebase,
};
