import React, { useState, useEffect } from 'react';

import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Card from '../Components/Card';
// import dotenv from 'dotenv';

// dotenv.config();

const backendBaseUrl = process.env.REACT_APP_BACKEND_BASE_URL

export default function Home() {

    const [search, setsearch] = useState("")

    const [foodcat, setFoodcat] = useState([]);
    const [fooditems, setFooditems] = useState([]);

    const load_data = async () => {
        try {
            let response = await fetch(`${backendBaseUrl}/api/foodData`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            response = await response.json();

            setFooditems(response[0]);
            setFoodcat(response[1]);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    useEffect(() => {
        load_data();
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade"
                    className="carousel slide carousel-fade"
                    data-bs-ride="carousel"
                    style={{ objectFit: 'contain !important' }}
                >
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                                    value={search}
                                    onChange={(e) => { setsearch(e.target.value) }}
                                />
                                {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?pastry"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)" }}
                                alt='no'
                            />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?burger"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)" }}
                                alt='no-images'
                            />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pizza"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)" }}
                                alt='not'
                            />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodcat && foodcat.length > 0
                        ? foodcat.map((data, index) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />
                                    {
                                        fooditems && fooditems.length > 0
                                            ? fooditems.filter((item) => item.CategoryName === data.CategoryName
                                                && (item.name.toLowerCase().includes(search.toLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card foodItems={filterItems}
                                                                options={filterItems.options[0]}

                                                            >
                                                            </Card>
                                                        </div>
                                                    )
                                                })
                                            : <div>No such Data found</div>}
                                </div>
                            )
                        })
                        : ""
                }
            </div>
            <div><Footer /></div>
        </div >
    );
}
