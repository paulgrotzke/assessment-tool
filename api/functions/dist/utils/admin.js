"use strict";
// import * as admin from 'firebase-admin';
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.firebaseAdmin = void 0;
// admin.initializeApp();
// export const db = admin.firestore();
const firebaseAdmin = require("firebase-admin");
exports.firebaseAdmin = firebaseAdmin;
const privateKey = process.env['PRIVATE_KEY'];
const clientEmail = process.env['CLIENT_EMAIL'];
const projectId = process.env['PROJECT_ID'];
if (!privateKey || !clientEmail || !projectId) {
    console.log(`Failed to load Firebase credentials.`);
}
if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert({
            privateKey: privateKey,
            clientEmail,
            projectId,
        }),
        databaseURL: `https://${projectId}.firebaseio.com`,
    });
}
const db = firebaseAdmin.firestore();
exports.db = db;
//# sourceMappingURL=admin.js.map