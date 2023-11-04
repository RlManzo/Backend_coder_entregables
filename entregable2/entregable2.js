const fs = require('fs');

class ProductManager {
    constructor(){
      this.products = [],
      this.path = "./products.json"
    }
    
   async addProduct(title, description, price, thumbail, code, stock){
    const sumarProducto = this.products.find(product =>  product.code === code)
       const product ={
        title,description, price, thumbail, code, stock
       }
       if(!sumarProducto){
        if(this.products.length === 0){
          product.id = 1;
        }
         else{
          product.id = this.products[this.products.length -1].id+1;
         }
        
        this.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));}
       
       else{ 
         console.log("codigo repetido")
      }
      }
        
     
    
     async getProducts(){
       const products = await fs.promises.readFile(this.path,"utf-8");
      let parseProducts = JSON.parse(products)
      console.log(parseProducts)
      return parseProducts;
    }
   async getProductById(productId){
      const productsByID = await this.getProducts()
        const byId = productsByID.find(producto => producto.id === productId)
        if(byId){
          console.log(byId)
        }else{
          console.log("producto  no encontrado")
          
        }
    }
    
    async updateProduct( title,description,price,thumbail, code, stock, id){
      const newProduct ={
       title,description, price, thumbail, code, stock, id
       }
     const products = await fs.promises.readFile(this.path,"utf-8");
     const parseProds = JSON.parse(products);
     const agregarPRods = [...parseProds, newProduct];
     await fs.promises.writeFile(this.path, JSON.stringify(agregarPRods));
    }

    async deleteProduct(id){
      const products = await fs.promises.readFile(this.path,"utf-8");
      let parsedProducts = JSON.parse(products);
      const findId = parsedProducts.find(product => product.id === id)
      const prodArray = [findId]
      if(!findId){
        console.log("not found")
      }
      else{
        prodArray.slice(id)
        console.log("producto eliminado")
        await fs.promises.writeFile(this.path, JSON.stringify(prodArray));
      } 
      
    }

}



//Test de instancia de ProductManager
const product = new ProductManager();
product.addProduct("arroz", "marolio", 200, "sin imagen", 123213, 10);
product.addProduct("yerba", "marolio", 500,"sin imagen", 121344, 5);
product.getProducts();
product.getProductById(4);
product.updateProduct("fideos","303", 510,"sin imagen", 412444, 5,3)
product.deleteProduct(1)