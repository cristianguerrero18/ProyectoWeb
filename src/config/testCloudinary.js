import cloudinary from "./cloudinary.js";

async function testUpload() {
  try {
    const result = await cloudinary.uploader.upload("https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg", {
      folder: "pruebas"
    });
    console.log("URL:", result.secure_url);
    console.log("Public ID:", result.public_id);
  } catch (error) {
    console.error("Error al subir archivo:", error);
  }
}

testUpload();
