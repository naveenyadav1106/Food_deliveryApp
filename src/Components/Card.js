import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();

    const priceRef = useRef();

    const options = props.options || {};
    const priceOptions = Object.keys(options);

    const [qty, setqty] = useState(1)
    const [size, setsize] = useState("")

    const handleAddCart = async () => {

        let food = null;
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;
                break;
            }
        }

        if (food !== null) {
            if (food.size === size) {
                dispatch({ type: 'UPDATE', id: props.foodItems._id, price: finalPrice, qty: qty });
            } else if (food.size !== size) {
                dispatch({
                    type: 'ADD',
                    id: props.foodItems._id,
                    name: props.foodItems.name,
                    price: finalPrice,
                    qty: qty,
                    size: size
                });
            }
        } else {
            dispatch({
                type: 'ADD',
                id: props.foodItems._id,
                name: props.foodItems.name,
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])

    return (
        <>
            <div>
                <div>
                    <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                        <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: 'fill' }} />
                        <div className="card-body">
                            <h5 className="card-title">{props.foodItems.name}</h5>
                            <div className="container w-100">
                                <select className='m-2 h-100 bg-success rounded' onChange={(e) => setqty(e.target.value)}>
                                    {Array.from(Array(6), (e, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                                    {priceOptions.map((data) => (
                                        <option key={data} value={data}>{data}</option>
                                    ))}
                                </select>
                                <div className='d-inline h-100 fs-5'>
                                    Rs{finalPrice}/-
                                </div>
                            </div>
                            <hr />
                            <button className='btn btn-success justify-center ms-2' onClick={handleAddCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
