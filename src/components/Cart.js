import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../context/MyContext";

export default function Cart() {
  const { cart, setCart, user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const decrementQuantity = (id) => {
    const foundRecord = cart.find((item) => item._id === id);
    if (foundRecord.quantity === 1) {
      setCart(cart.filter((item) => item._id !== id));
    } else {
      foundRecord.quantity--;
      setCart([...cart]); // forcing rerendering
    }
  };

  const incrementQuantity = (id) => {
    const foundRecord = cart.find((item) => item._id === id);
    foundRecord.quantity++;
    setCart([...cart]); // forcing rerendering
  };

  const placeOrder = () => {
    //order => { records: [record._id, record._id ], totalPrice: numberValue, userId:3276123zf132}

    if (!user) {
      navigate("/login");
    } else {
      fetch("http://localhost:4000/orders", {
        method: "POST",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: cart.map((record) => record._id),
          totalPrice: cart.reduce(
            (acc, item) => (acc += item.price * item.quantity),
            0
          ),
          userId: user._id,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
            if(result.success){
                console.log(result)
                setUser(result.data)
                setCart([])

            }
        });
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <div>
        {cart.map((record) => {
          return (
            <div key={record._id}>
              <img src={record.img} width="100" alt="recordimage" />
              <p>{record.title}</p>
              <p>
                {" "}
                quantity:{" "}
                <button onClick={() => decrementQuantity(record._id)}>
                  {" "}
                  -{" "}
                </button>{" "}
                {record.quantity}{" "}
                <button onClick={() => incrementQuantity(record._id)}>
                  {" "}
                  +{" "}
                </button>
              </p>
              <h1>${record.price}</h1>
            </div>
          );
        })}
      </div>

      <h1>
        Total:{" "}
        {cart.reduce((acc, item) => (acc += item.price * item.quantity), 0)}
      </h1>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}