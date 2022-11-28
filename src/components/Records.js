import React, { useContext } from "react"
import { MyContext } from "../context/MyContext"

export default function Records() {
  const { records, setCart, cart } = useContext(MyContext)
  const addItemIntoCart=(record)=>{
    const foundItem = (cart.find(item=>item._id === record.id))
      if(foundItem){
        foundItem.quantity++;
        setCart([...cart])
      }else{
        setCart([...cart, {...record, quantity:1}])
      }
    }
  
  return (
    <div>
      <h1>Records Page</h1>
      <div>
        {records.map(record =>{
          return (
            <div key={record._id}>
              <h2>{record.title}</h2>
              <img src={record.img} alt="recordImage" width="200"/>
              <h3>{record.author}</h3>
              <p>{record.year}</p>
              <p>${record.price}</p>
              <button onClick={() =>addItemIntoCart(record)}>Add To Cart</button>
             
            </div>
          )
        })}
      </div>
    </div>
  )
}
