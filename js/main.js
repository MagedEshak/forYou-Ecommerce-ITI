
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5OPT9O638qgV0synG6M3n1MKK_ysSuDM",
  authDomain: "e-commer-website.firebaseapp.com",
  projectId: "e-commer-website",
  storageBucket: "e-commer-website.firebasestorage.app",
  messagingSenderId: "72350924893",
  appId: "1:72350924893:web:28817a6b6d8eb470fa8db4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🚀 Add a new document to any collection
export async function addDocument(collectionName, data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log(`Added to ${collectionName}:`, docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
  }
}

//  Get a document by a specific field instead of ID
export async function getDocumentByField(collectionName, field, value) {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching document found.");
    return null;
  }

  const docData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log("Fetched documents:", docData);
  return docData;
}

//  Update a document using a field instead of ID
export async function updateDocumentByField(collectionName, field, value, newData) {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching document found.");
    return;
  }

  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, collectionName, document.id);
    await updateDoc(docRef, newData);
    console.log(`Updated document: ${document.id}`);
  });
}

//  Delete a document using a field instead of ID
export async function deleteDocumentByField(collectionName, field, value) {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    console.log("No matching document found.");
    return;
  }

  querySnapshot.forEach(async (document) => {
    const docRef = doc(db, collectionName, document.id);
    await deleteDoc(docRef);
    console.log(`Deleted document: ${document.id}`);
  });
}

// Fetch all documents from a collection
export async function getAllDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    console.log(`Fetched ${results.length} documents from '${collectionName}'`);
    return results;
  } catch (error) {
    console.error(`Error fetching documents from '${collectionName}':`, error);
    return [];
  }
}

  // delete all the docs
export async function deleteAllDocuments(collectionName) {
  try {
      const querySnapshot = await getDocs(collection(db, collectionName));

      if (querySnapshot.empty) {
          console.log(`No documents found in '${collectionName}' to delete.`);
          return;
      }

      querySnapshot.forEach(async (document) => {
          const docRef = doc(db, collectionName, document.id);
          await deleteDoc(docRef);
          console.log(`Deleted document: ${document.id}`);
      });

      console.log(`Successfully deleted all documents from '${collectionName}'`);
  } catch (error) {
      console.error(`Error deleting documents from '${collectionName}':`, error);
  }
}


export async function getProductById(productId) {
  try {
      const docRef = doc(db, "aliProducts", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          console.log("Fetched product: ", docSnap.data());
          return { id: docSnap.id, ...docSnap.data() };
      } else {
          console.log("No such product!");
          return null;
      }
  } catch (error) {
      console.error("Error getting product by ID: ", error);
    }
}

export async function getUserById(productId) {
  try {
      const docRef = doc(db, "aliUsers", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          console.log("Fetched product: ", docSnap.data());
          return { id: docSnap.id, ...docSnap.data() };
      } else {
          console.log("No such product!");
          return null;
      }
  } catch (error) {
      console.error("Error getting product by ID: ", error);
    }
}
export async function getCategoryById(productId) {
  try {
      const docRef = doc(db, "aliCategories", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          console.log("Fetched product: ", docSnap.data());
          return { id: docSnap.id, ...docSnap.data() };
      } else {
          console.log("No such product!");
          return null;
      }
  } catch (error) {
      console.error("Error getting product by ID: ", error);
    }
}

// Function to update a product
export async function updateProduct(productId, updatedData) {
  try {
      const docRef = doc(db, "aliProducts", productId);
      await updateDoc(docRef, updatedData);
      console.log("Product updated successfully.");
  } catch (error) {
      console.error("Error updating product: ", error);
    }
}

export async function updateUser(productId, updatedData) {
  try {
      const docRef = doc(db, "aliUsers", productId);
      await updateDoc(docRef, updatedData);
      console.log("Product updated successfully.");
  } catch (error) {
      console.error("Error updating product: ", error);
    }
}

// var cat ={
//     "cat_id": 0,
//     "cat_name": "TV"
// }
// addDocument("category", cat)



////////////////////////////////
//
//          adding a new product
//
////////////////////////////////

