const firebase = require("firebase-admin/app");
const firestore = require("firebase-admin/firestore");

const fs = require("fs");

const logger = require("../utils/logger");

/**
 * A class for simplifying firebase functions
 * @class MyCatLikesFirebase
 */
class MyCatLikesFirebaseServer {
  /**
   * The constructor for the MyCatLikesFirebase class
   * @param {object} options an object representing the options for the class
   * @param {object} options.firebaseCredentialsPath the path to your firebase credentials file
   * @param {boolean} options.loggingEnabled a boolean for toggling logging on or off
   * @constructor
   */
  constructor(options) {
    this.firebaseCredentialsPath = options.firebaseCredentialsPath;
    this.loggingEnabled = options.loggingEnabled || true;

    this.initialize = () => {
      if (!this.firebaseCredentialsPath)
        return logger.logErr("No firebaseCredentialsPath provided!");

      this.app = firebase.initializeApp({
        credential: firebase.cert(
          JSON.parse(fs.readFileSync(this.firebaseCredentialsPath))
        ),
      });
      this.db = firestore.getFirestore(this.app);

      this.loggingEnabled
        ? logger.logInfo("my-cat-likes-firebase has been initialized!")
        : "";

      return this;
    };

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
        let doc = this.db.doc(path);

        doc.get().then((data) => {
          if (data) {
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
     * @returns {Promise<boolean>} A promise if the write succeeded
     */
    this.createDoc = (data, path) => {
      if (typeof data !== "object")
        return logger.logErr("The data argument is not of type object!");

      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = this.db.doc(path);

        doc.set(data).then(() => resolve(true));
      });
    };

    /**
     * A function for updating documents in Firestore
     * @param {object} data the data to update the doc with
     * @param {string} path the path to the doc to be updated
     * @returns {Promise<boolean>} A promise resolving to a boolean of if the write succeeded or not
     */
    this.updateDoc = (data, path) => {
      if (typeof data !== "object")
        return logger.logErr("The data argument is not of type object!");

      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = this.db.doc(path);

        doc
          ? doc.update(data)
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
        let doc = this.db.doc(path);

        doc
          ? doc.delete().catch((err) => reject(err))
          : (reject(false), logger.logErr(`Doc was not found!`));

        resolve(true);
      });
    };

    /**
     * A function to get doc data at a path
     * @param {string} path the path to the document to get
     * @returns {Promise<object|string>} a promise with either the document data or an error string
     */
    this.getDoc = (path) => {
      if (typeof path !== "string")
        return logger.logErr("The path argument is not of type string!");

      return new Promise((resolve, reject) => {
        let doc = this.db.doc(path);
        doc.get().then((data) => {
          data.exists ? resolve(data.data()) : reject("Unable to get doc!");
        });
      });
    };
  }
}

module.exports = {
  MyCatLikesFirebaseServer,
};
