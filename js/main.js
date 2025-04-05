
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

// var cat ={
//     "cat_id": 0,
//     "cat_name": "TV"
// }
// addDocument("category", cat)





///////////////////////////////
//
// CRUD operations for documents by ID
//
////////////////////////////



// Get a document by ID
export async function getDocById(docName ,Id) {
  try {
      const docRef = doc(db, docName, Id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          console.log("Fetched product: ", docSnap.data());
          return { id: docSnap.id, ...docSnap.data() };
      } else {
          console.log("No such product!");
          return null;
      }
  } catch (error) {
    console.error(`Error getting document ${Id} from ${docName}:`, error);
    
  }
}


// Update a document by ID
export async function updateDocById(docName, Id, updatedData) {
  try {
      const docRef = doc(db, docName, Id);
      await updateDoc(docRef, updatedData);
      console.log(`document ${Id} updated  in ${docName} successfully.`);
      return true;
  }
  catch (error) {
      console.error("Error updating product: ", error);
  }

}

// Delete a document by ID
export async function deleteDocById(docName, Id) {
  try {
      const docRef = doc(db, docName, Id);
      await deleteDoc(docRef);
      console.log(`Document ${Id} deleted from ${docName} successfully.`);
      return true;
     
  }
    catch (error) {
      console.error(`Error deleting document ${Id} from ${docName}:`, error);
      
  }
}


/////////////////////////////
// handle image upload to Imgur
/////////////////////////////

// Imgur upload function
export async function uploadToImgur(file) {
  const clientId = '5c51da6457cf182';  

  const formData = new FormData();
  formData.append('image', file);
  
  try {
      const response = await fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
              'Authorization': `Client-ID ${clientId}`,
          },
          body: formData,
      });

      const data = await response.json();

      if (data.success) {
          console.log('Image uploaded successfully!', data.data.link);
          return data.data.link; // Return the image URL
      } else {
          console.error('Imgur upload failed:', data.data.error);
      }
  } catch (error) {
      console.error('Error uploading image:', error);
  }
}
