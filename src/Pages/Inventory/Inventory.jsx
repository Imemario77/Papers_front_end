import React, { useEffect, useState } from "react";

import MainAppNavBar from "../../componets/MainAppNavBar/MainAppNavBar";
import Header from "../../componets/Header/Header";
import "./Inventory.css";
import ButtonAndLabel from "../../componets/AppButtonAndLabel/ButtonAndLabel";
import { getAllProducts } from "../../api/api";
import AppModal from "../../componets/AppModal/Modal";
import AddProduct from "../../componets/AddProduct/AddProduct";
import DeleteProduct from "../../componets/DeleteProduct/DeleteProduct";
import RestockProduct from "../../componets/RestockProduct/RestocKProduct";

function Inventory({ expand, setExpand }) {
  const [products, setProducts] = useState([]);
  const [addProduct, setAddProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [restock, setRestock] = useState(false);

  useEffect(() => {
    return async () => {
      await getAllProducts()
        .then((result) => {
          if (result) {
            setProducts(result.data.result);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  }, [addProduct, deleteProduct, restock]);

  return (
    <div style={{ position: "relative" }}>
      <div className="dashboard">
        <MainAppNavBar expand={expand} setExpand={setExpand} />
        <div className="content">
          <Header setExpand={setExpand} />
          <div className="product-container">
            <div className="product-heading-holder">
              <h1>Inventory</h1>
              <div>
                <ButtonAndLabel
                  button1={"+ Add Product"}
                  button2={"- Remove Product"}
                  open1={() => setAddProduct(true)}
                  open2={() => setDeleteProduct(true)}
                  color1={"black"}
                  color2={"white"}
                />
                <ButtonAndLabel
                  button1={"+ Restock Product"}
                  open1={() => setRestock(true)}
                  color1={"black"}
                />
              </div>
            </div>
            {products.map((product, index) => {
              return (
                <div key={index} className="product">
                  <img src={product.image} alt={product.name} />
                  <div className="product-info">
                    <div className="product-first-section">
                      <div className="product-title">{product.name}</div>
                      <div className="product-price">NGN {product.amount}</div>
                      <div className="product-description">
                        {product.description.slice(0, 50)}
                      </div>
                    </div>
                    <div className="product-second-section">
                      <span> {product.quantity} in stock</span>
                      <span>Product code: PRDC {product.productId}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {addProduct && (
        <AppModal close={() => setAddProduct(false)}>
          <AddProduct opened={(data) => setAddProduct(data)} />
        </AppModal>
      )}
      {deleteProduct && (
        <AppModal close={() => setDeleteProduct(false)}>
          <DeleteProduct opened={(data) => setDeleteProduct(data)} />
        </AppModal>
      )}{" "}
      {restock && (
        <AppModal close={() => setRestock(false)}>
          <RestockProduct opened={(data) => setRestock(data)} />
        </AppModal>
      )}
    </div>
  );
}

export default Inventory;
