import { addDocument,deleteAllDocuments,getDocumentByField } from "../../js/main.js"

// console.log(getDocumentByField("category" , 'cat_id' , 1))

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

  const setUrl = document.getElementById("preview-img")
  setUrl.src = "https://imgur.com/AhyEeor.png"
  document.getElementById("img_icon").style.display = "none"; // Hide the icon
  setUrl.style.display = "inline"; // Show the uploaded image

document.getElementById("file-input").addEventListener("change",async() =>{

    const currentImageUrl = document.getElementById("preview-img").src;

    if (currentImageUrl && currentImageUrl !== "") {
        console.log("Image already exists:", currentImageUrl);
    }
    else{
        
    }
    const imageFile = document.getElementById("file-input").files[0]
    const clientId = "5c51da6457cf182"

    if (imageFile) {
        const imageUrl = await uploadToImgur(imageFile, clientId);
        
        if (imageUrl) {
          console.log("Image URL:", imageUrl);
          const reader = new FileReader();
            reader.onload = () => {
                const previewImg = document.getElementById("preview-img");
                previewImg.src = reader.result; // Set image source
                previewImg.style.display = "inline"; // Show the uploaded image
            };
            reader.readAsDataURL(imageFile)
        } else {
          console.log("Upload failed!");
        }
      }
    
} );
    
