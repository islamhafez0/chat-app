const Filter = require("bad-words");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
    .document("messages/{msgId}")
    .onCreate(async (doc, ctx) => {
      const filter = new Filter();
      const {text, uid} = doc.data();
      if (filter.isProfane(text)) {
        const cleanedText = filter.clean(text);
        await doc.ref.update({
          text: `I got banned for life because of saying ${cleanedText}`,
        });
        await db.collection("banned").doc(uid).set({});
      }
    });
