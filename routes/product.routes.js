const express = require('express');
const productRouter = express.Router();
const { productGetController, productPostController, productUpdateController, productDeleteController, productFindController, productFindWithNameController,productUpdateControllerName } = require('../controllers/product.controller');
const multipart = require('connect-multiparty');
const path  = require('path')
const multipartMiddleware = multipart({uploadDir:path.join(__dirname,"image")});

productRouter.get("/",productGetController)//main product page
productRouter.post("/upload",multipartMiddleware,productPostController)//inventory page
productRouter.put("/:id",productUpdateController);//inventory 
productRouter.delete("/:id",productDeleteController)//inventory
productRouter.get("/find/:id",productFindController)//inventory
productRouter.get("/findName/:name",productFindWithNameController)
productRouter.put('/nameUpdate/:name',productUpdateControllerName)

module.exports = productRouter;