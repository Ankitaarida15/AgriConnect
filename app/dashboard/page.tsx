"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
const [description, setDescription] = useState("");
const [quantity, setQuantity] = useState("");
const [image, setImage] = useState("");
const [cropFile, setCropFile] = useState<File | null>(null);
const [aiResult, setAiResult] = useState("");
const [price, setPrice] = useState("");
const [productsLoading, setProductsLoading] = useState(false);
const [aiLoading, setAiLoading] = useState(false);
const [error, setError] = useState("");

const fetchProducts = async () => {
  try {
    setProductsLoading(true);

    const url =
  search.trim() === ""
    ? "https://agriconnect-x8no.onrender.com/products"
    : `https://agriconnect-x8no.onrender.com/products/search?q=${search}`;
const res = await fetch(url, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
    const data = await res.json();

   setProducts(
  data.sort(
    (a:any,b:any) => b.id - a.id
  )
);
     setError("");

  } catch (error) {
    console.log(error);
    setError("Unable to load products");

  } finally {
    setProductsLoading(false);
  }
};
 const [editId, setEditId] = useState<number | null>(null);

  // 🔵 GET PRODUCTS

  const handleLogout = () => {
  localStorage.removeItem("token");
  alert("Logged Out Successfully");
  router.push("/login");
};
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.replace("/login");
    return;
  }

  fetchProducts();
}, [router, search]);

  // 🟢 ADD PRODUCT



  const addProduct = async () => {
    if(
 !name ||
 !category ||
 !price ||
 !quantity
){
 alert("Please fill all fields");
 return;
}
  try {
    const res = await fetch("https://agriconnect-x8no.onrender.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name,
        category,
        description,
        price: Number(price),
        quantity: Number(quantity),
        image,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.ok) {
      toast.success("Product Added Successfully ✅");

      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage("");

      fetchProducts();
    } else {
      alert(data.message || "Add Product Failed");
    }
  } catch (error) {
  console.log(error);
  setError("Unable to add product");
}
};
  // ✏️ UPDATE PRODUCT

  const updateProduct = async () => {

    if(
 !name ||
 !category ||
 !price ||
 !quantity
){
 alert("Please fill all fields");
 return;
}

  try {
    const res = await fetch(
      `https://agriconnect-x8no.onrender.com/products/${editId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name,
          category,
          description,
          price: Number(price),
          quantity: Number(quantity),
          image,
        }),
      }
    );

    if (res.ok) {
      toast.success("Product Updated Successfully ✅");

      setName("");
      setCategory("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setImage("");
      setEditId(null);

      fetchProducts();
    } else {
  const data = await res.json();
  console.log("Update Error:", data);
  alert(data.message);
}
  } catch (error) {
    console.log(error);
  }
};

  // ❌ DELETE PRODUCT
  const deleteProduct = async (id: number) => {
  try {
    const res = await fetch(
      `https://agriconnect-x8no.onrender.com/products/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.ok) {
      toast.success("Product Deleted Successfully 🗑️");
      fetchProducts();
    } else {
      toast.error("Delete Failed ❌");
    }
  } catch (error) {
    console.log(error);
  }
};
// 🛒 BUY PRODUCT
const buyProduct = async (productId: number) => {
  try {
const res = await fetch("https://agriconnect-x8no.onrender.com/orders", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId,
        quantity: 1,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Order Placed Successfully ✅");
      fetchProducts();
    } else {
      alert(data.message || "Order Failed");
    }

  } catch (error) {
    console.log(error);
    alert("Server Error");
  }
};


const analyzeCrop = async () => {

  if (!cropFile) {
    alert("Please upload crop image first");
    return;
  }

  try {

    setAiLoading(true);

    const formData = new FormData();

    formData.append("image", cropFile);

    formData.append(
      "message",
      "Analyze this crop image"
    );


    const res = await fetch(
      "https://agriconnect-x8no.onrender.com/ai",
      {
        method: "POST",
        body: formData,
      }
    );


    const data = await res.json();

    console.log(data);


    if(data.reply){
      setAiResult(data.reply);
    }
    else{
      setAiResult("No AI result received");
    }


  } catch(error){

    console.log(error);
    setAiResult("AI Analysis Failed");

  } finally {

    setAiLoading(false);

  }

};

  return (

    <>
      <Navbar />

    <main className="
min-h-screen 
w-full
overflow-x-hidden
bg-green-50 
p-4 
sm:p-6 
lg:p-8
">

        {/* TITLE */}
        <h1 className="
           text-3xl 
           sm:text-4xl 
           font-bold 
           text-green-800 
           text-center
           ">
          Dashboard 🌾
        </h1>

        <p className="text-center mt-2 text-green-700">
          Welcome to your AgriConnect Dashboard
        </p>

        {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg mt-4 text-center">
    {error}
  </div>
)}



          {/* 🟢 FORM */}
<div className="bg-white p-6 rounded-xl shadow border border-green-200 mt-8 max-w-xl mx-auto">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            ➕ Add / Update Product
          </h2>

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white text-black border border-green-300 p-2 w-full mb-2 rounded focus:outline-none focus:border-green-500"
          />
 <input
  type="text"
  placeholder="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="bg-white text-black border border-green-300 p-2 w-full mb-2 rounded"
/>

<input
  type="text"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="bg-white text-black border border-green-300 p-2 w-full mb-2 rounded"
/>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-white text-black border border-green-300 p-2 w-full mb-2 rounded focus:outline-none focus:border-green-500"
          />
          <input
  type="number"
  placeholder="Quantity"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  className="bg-white text-black border border-green-300 p-2 w-full mb-2
  rounded"
/>
<h3 className="text-lg font-bold text-green-700 mb-2">
🌱 Upload Crop Image
</h3>

<label className="block bg-green-600 text-white text-center py-2 rounded-lg cursor-pointer hover:bg-green-700 mb-3">

  Choose Image

  <input
    type="file"
    accept="image/*"
    className="hidden"

    onChange={async (e) => {

      const file = e.target.files?.[0];
      if (!file) return;

    setCropFile(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "agriconnect");

      try {

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/fzts3ihi/image/upload",
          {
            method:"POST",
            body:formData,
          }
        );

        const data = await res.json();

        setImage(data.secure_url);

        alert("Image Uploaded Successfully ✅");

      } catch(err){

        console.log(err);
        alert("Image Upload Failed");

      }

    }}
  />

</label>


<button
  onClick={analyzeCrop}
  className="bg-green-800 text-white w-full py-2 rounded-lg hover:bg-green-900"
>
  {aiLoading ? "Analyzing..." : "🔍 Analyze Crop"}
</button>

{image && (
  <img
    src={image}
    alt="Preview"
    className="w-20 h-20 object-cover rounded-lg mb-3 mx-auto"
  />
)}

{aiResult && (
  <div className="mt-4 bg-green-50 p-4 rounded-lg border border-green-300">

    <h3 className="font-bold text-green-800">
      AI Result:
    </h3>

    <p className="mt-2 text-gray-700">
      {aiResult}
    </p>

  </div>
)}
          <button
            onClick={editId ? updateProduct : addProduct}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>



{productsLoading && (
  <div className="text-center my-4">
    <p className="text-green-700 font-semibold text-lg">
      Loading Products...
    </p>
  </div>
)}

        {/* 🟢 PRODUCTS LIST */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            🌾 Products List
          </h2>

          <input
  type="text"
  placeholder="🔍 Search Product..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full md:w-96 mx-auto block mb-6 p-2 border border-green-300 rounded bg-white text-black"
/>
<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
">

            {products.length === 0 ? (
              <p className="text-center col-span-3 text-gray-500">
                No products found
              </p>
            ) : (
              products.map((item: any) => (
  <div
    key={item.id}
    className="
bg-white
p-4
rounded-xl
shadow
border
border-green-200
hover:shadow-lg
transition
flex
flex-col
h-fit
"
  >          {item.image && (
  <div className="w-full h-32 overflow-hidden rounded-lg mb-3">
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-full object-cover"
    />
  </div>
)}

                  <h3 className="text-lg font-bold text-green-700">
                    🌾 {item.name}
                  </h3>

                  <p className="text-gray-600 mt-2 font-semibold">
                    ₹{item.price}
                  </p>
<p className="text-sm text-gray-600">
Category: {item.category}
</p>
<p className="text-sm text-gray-600 line-clamp-2">
{item.description}
</p>

<p className="text-sm text-gray-600">
Qty: {item.quantity}
</p>
                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col md:flex-row gap-2 mt-3">

                    <button
                      onClick={() => {
  setEditId(item.id);
  setName(item.name);
  setCategory(item.category);
  setDescription(item.description || "");
  setPrice(String(item.price));
  setQuantity(String(item.quantity));
  setImage(item.image || "");
}}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                  <button
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      deleteProduct(item.id);
    }
  }}
  className="bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
>
  Delete
</button>

                    <button
  onClick={() => buyProduct(item.id)}
  className="bg-green-600 text-white px-2 py-1 text-sm rounded hover:bg-green-700 mt-2 w-full"
>
  🛒 Buy Now
</button>

                  </div>

                </div>
              ))
            )}

          </div> 
        </div>
      </main>

      <Footer />
    </>
  );
}