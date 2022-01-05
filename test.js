const { MyCatLikesFirebase } = require("./classes/MyCatLikesFirebase");

const firebase = new MyCatLikesFirebase({
  firebaseConfig: {
    apiKey: "AIzaSyBKxbdBf2RPjHKVYzSxnKYHHpfe8dq3U_Y",

    authDomain: "rpg-tutorial-a5bbf.firebaseapp.com",

    projectId: "rpg-tutorial-a5bbf",

    storageBucket: "rpg-tutorial-a5bbf.appspot.com",

    messagingSenderId: "631634009857",

    appId: "1:631634009857:web:bf7c7c23adf44c48e24500",

    measurementId: "G-Z7W7GGBT1M",
  },
});

firebase.initialize();

firebase
  .createDoc({ nuts: "nuts" }, "users/nuts")
  .then(() => console.log("NUTS"));
