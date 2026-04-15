const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require("../server");


exports.renameImageToProductId = async (oldFilename, productId) => {
    try {
        const productsDir = path.join(__dirname, '../assets/img/productos');
        const oldPath = path.join(productsDir, oldFilename);

        // Si el archivo no existe, no hay nada que renombrar
        if (!fs.existsSync(oldPath)) {
            return oldFilename;
        }

        const ext = path.extname(oldFilename);
        const newFilename = `${productId}${ext}`;
        const newPath = path.join(productsDir, newFilename);

        // Si ya existe una imagen con el ID del producto, eliminarla
        if (fs.existsSync(newPath)) {
            fs.unlinkSync(newPath);
        }

        // Renombrar el archivo
        fs.renameSync(oldPath, newPath);

        return newFilename;
    } catch (error) {
        console.error("Error al renombrar imagen:", error.message);
        return oldFilename; // Si falla, devolver el nombre original
    }
};