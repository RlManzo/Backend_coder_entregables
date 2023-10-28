class ProductManager {
    constructor(){
      this.products = [];
      
    }
    
   addProduct(title, description, price, thumbail, code, stock){
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
        
        this.products.push(product);}
       else{ 
        return console.log("codigo repetido")
      }
      }
        
     
    
   getProducts(){
      console.log(this.products)
    }
    getProductById(product){
        const byId = this.products.find(producto => producto.id === product)
        if(byId){
          console.log("producto agregado")
        }else{
          console.log("producto  no agregado")
          
        }
    }

}



//Test de instancia de ProductManager
const product = new ProductManager();
product.addProduct("arroz", "marolio", 200, "sin imagen", 123213, 10);
product.addProduct("yerba", "marolio", 500,"sin imagen", 121344, 5);
product.getProducts();
product.getProductById(4)