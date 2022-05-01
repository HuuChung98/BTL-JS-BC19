const productManager = new ProductManager();

init();
// function mặc định chạy đàu tiên khi ứng dụng được khởi chạy 
function init() {
    // Lấy DS sản phẩm để hiện thị ra table  
    // console.log("object  LINE 6");
    productManager.getProducts().then(()=> {
        console.log(productManager.products);
        // Set lại biến products trong ProductManager 
        // productManager.products = result.data;
        // hiển thị products ra table  
        display(productManager.products);
    });

}

function display(products) {
    // const tbody = document.getElementById("tblDanhSachSP");
    const html = products.reduce((result, product, index) => {
        // // tạo product từ lớp đối tượng Product để có thể sử dụng các method của Product nếu có 
        // const product = new Product(
        //     item.name,
        //     item.price,
        //     item.description,
        //     item.image
        // );
        return result + `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
                <img src = "${product.img}" width="50" height="50" />
            </td> 
            <td> ${product.desc} </td>
            <td> ${product.type} </td>
            <td>
                <button class = "btn btn-primary">Update</button>
                <button class = "btn btn-danger">Delete</button>
            </td>
        </tr>`
    }, "")
    document.getElementById("tblDanhSachSP").innerHTML = html;
}

// Xử lý nút thêm sản phẩm 
document.getElementById("btnThemSP").addEventListener("click", () => {
    // Xử lý thay đổi heading và thêm button thêm sp 
    document.querySelector('.modal-title').innerHTML = "Create Product";
    document.querySelector('.modal-footer').innerHTML = `
    <button class="btn btn-danger" data-dismiss='modal'>Đóng</button>
    <button class="btn btn-success" id="btnCreate">Thêm</button>
    `
});

// xử lý DOM tới modal-footer để lắng nghe button Thêm/Cập nhật

document.querySelector('.modal-footer').addEventListener('click', (event) => {
    // DOM tới input để lấy value 
    const name = document.getElementById('TenSP').value;
    const price = +document.getElementById('GiaSP').value;
    const image = document.getElementById('HinhSP').value;
    const description = document.getElementById("MotaSP").value;

    const product = new Product(name, price,image, description)
    const targetEl = event.target;
    
    // Cách thông thường sau này khi áp dụng thêm, xóa sản phẩm trên giao diện 
    if(targetEl.id === "btnCreate") {
        productManager.createProduct(product).then(() => {
            // thêm thành công sẽ hiển thị SP mới thêm ra giao diện 
            return productManager.getProducts();
            
        })
        .then(() => {
            display(productManager.products);
        });
        // console.log(targetEl);
        // handleCreateProduct(product);
    }
})