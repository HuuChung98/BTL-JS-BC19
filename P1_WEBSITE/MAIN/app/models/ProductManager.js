function ProductManager() {
    this.products = [];
};

ProductManager.prototype.getProducts = function() {
    // Call API lấy DS sản phẩm
    // return axios.get("https://62528e0f69af39728b501bf1.mockapi.io/chung/products");
    return new Promise((resolve, reject) => {
        axios.get("https://62528e0f69af39728b501bf1.mockapi.io/chung/products/").then((result) => {
            this.products = result.data.map((item) => {
                const product = new Product(
                    item.img,
                    item.name,
                    item.desc, 
                    item.screen,
                    item.backCamera,
                    // item.                  
                    item.frontCamera,
                    item.type,
                    item.price                              
                );
                return product;
                // console.log(products);
            });
            resolve();
            // console.log(products);
        }).catch((error) => {
            console.log(error.response.data);
            reject(error);
            alert("Can not get product list");
        });
    });
};

ProductManager.prototype.getProductById = function() {};
// ProductManager.prototype.createProduct = function(product) {
//     return new Promise((resolve, reject) => {
//         // gọi API thêm SP  
//         axios.post("https://62528e0f69af39728b501bf1.mockapi.io/chung/products/", product).then((result) => {
//             // result : sản phẩm sau khi thêm thành công 
//             // Cách 1: push trưc tiếp result vào mảng products 
//             // this.products.push(result.data);

//             // Cách 2: gọi lại API lấy sản phẩm 
//             return this.getProducts()

//             // resolve();
//         })
//         .then(() => {
//             // sau khi gọi API lấy DS SP thành công  
//             resolve();
//         });
//     });
// };
ProductManager.prototype.createProduct = function(product) {
    
        // gọi API thêm SP  
        return axios.post("https://62528e0f69af39728b501bf1.mockapi.io/chung/products//", product);
};
ProductManager.prototype.updateProduct = function() {};
ProductManager.prototype.deleteProduct = function() {};