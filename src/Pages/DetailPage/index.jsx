// style sheet import
import './style.css';

// library import
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

// Utils import
import APIService from '../../Utils/api';

// Components import
import Loader from '../../Components/loaderComponent';
import ReviewComponent from '../../Components/ReviewComponent';
import ProductInfoComponent from '../../Components/ProductInfoComponent';
import ProductDetailsComponent from '../../Components/ProductDetailsComponent';
function DetailPage() {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = async () => {
        const payload = {
            productId: id
        }
        try {
            const res = await APIService.getInstance().getProducts(payload);
            if (!res) {
                return console.error("Error in fetching products:", res);
            }
            let discountedPrice = (res.price || 0) - ((res.discountPercentage || 0) * (res.price || 0) / 100);
            discountedPrice = discountedPrice.toFixed(2);
            const response = {
                ...res,
                discountedPrice
            }
            setData(response);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
            alert(err);
            return;
        }
    };

    const scrollingIntoReviewSection = (sectionID) => {
        let element = document.getElementById(sectionID);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const getReviewSection = () => {
        const { reviews } = data;
        if (!reviews || !reviews.length) {
            return "No reviews";
        }

        return <ReviewComponent reviews={reviews} />
    }

    const handleAccorion = (id) => {
        const element = document.querySelector(`#${id}`);
        if (!element || !element.style)
            return "";
        setExpanded(!expanded);
        if (element.style.display === "flex") {
            element.style.display = "none";
            return;
        }
        element.style.display = "flex";
        return;
    }

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <header className='header_container'>
                <div>Product Details</div>
            </header>
            <div className='product_detail_container'>
                <div className='product_detail_image_container'>
                    <div className='product_card_image'>
                        <img
                            src={data.thumbnail}
                            alt='img'
                        />
                    </div>
                </div>
                <div className='product_detail_info'>
                    <ProductInfoComponent
                        data={data}
                        scrollingIntoReviewSection={scrollingIntoReviewSection}
                    />

                    <ProductDetailsComponent
                        data={data}
                        handleAccorion={handleAccorion}
                        expanded={expanded}
                    />

                    <div className='review_component_container' id='product_reviews_body' style={{ gap: "1rem ", padding: "2rem 0rem" }}> {getReviewSection()}</div>
                </div>
            </div>
        </>

    )
}

export default DetailPage;