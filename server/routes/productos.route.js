const express=require('express');
const router=express.Router();
const productosController=require("../controllers/productos.controller");
const upload=require("../middleware/upload.middleware");

router.get("/", productosController.getProductos);
router.get("/:id", productosController.getById);
router.delete("/:id", productosController.deleteProducto);


router.post('/', upload.single('imagen'), productosController.postProducto);
router.put('/:id', upload.single('imagen'), productosController.updateProduct);
module.exports=router;
