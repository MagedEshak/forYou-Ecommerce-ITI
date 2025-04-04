import { addDocument,deleteAllDocuments } from "../../js/main.js"


// deleteAllDocuments("category")
// var cat ={
//     "cat_id": 1,
//     "cat_name": "TV"
// }
// addDocument("category", cat)

async function uploadToImgur(imageFile, clientId) {
    const formData = new FormData();
    formData.append("image", imageFile);
  
    try {
      const response = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          "Authorization": `Client-ID ${clientId}`
        },
        body: formData
      });
  
      const data = await response.json();
      
      if (data.success) {
        return data.data.link; // Returns the image URL
      } else {
        throw new Error("Upload failed!");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null; // Returns null in case of failure
    }
  }

document.getElementById("file-input").addEventListener("change",async() =>{
    const imageFile = document.getElementById("file-input").files[0]
    const clientId = "5c51da6457cf182"

    if (imageFile) {
        const imageUrl = await uploadToImgur(imageFile, clientId);
        
        if (imageUrl) {
          
          console.log("Image URL:", imageUrl);
        } else {
          console.log("Upload failed!");
        }
      }
    
} );
    
