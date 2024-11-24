import './style.css';

import React, { useEffect, useState } from "react";

import APIService from '../../Utils/api';

import noDataImg from '../../no-data.png';
import Loader from '../../Components/loaderComponent';
import Pagination from '../../Components/PaginationComponent';
function ListingPage() {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage])

    const fetchProducts = async () => {
        const payload = {
            currentPage,
            pageSize: 10
        }
        try {
            const res = await APIService.getInstance().getProducts(payload);
            if (!res) {
                return console.error("Error in fetching products:", res);
            }
            setData(res);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handlePageChange = (current) => {
        setCurrentPage(current);
        setLoading(true);
    }

    const getNoDataComponent = () => {
        return (
            <div className="no_data" style={{ height: "100%" }}>
                <img
                    src={noDataImg}
                    alt='no-data'
                />
                {`No Data`}
            </div>
        )
    }

    return (
        <>
            <header className='header_container'>
                <div>Product Catalogue</div>
            </header>
            <div className='product_container'>
                {loading ? <Loader /> : <div className="product_card_row">
                    {
                        (data && data.products) ? (data.products).map((product) => {
                            return (

                                <a key={product.id} className='product_card_col' target='_blank' href={`/products/${product.id}`}>
                                    <div className='product_card_image'>
                                        <img
                                            src={product.thumbnail}
                                            alt='product-catalogue'
                                            loading='lazy'
                                        />
                                    </div>
                                    <div className='product_card_details'>
                                        <div className='product_card_details_title'>{product.title}</div>
                                        <div className='product_card_details_price'>{'$'} {product.price}</div>
                                    </div>
                                </a>
                            )
                        }) : getNoDataComponent()
                    }
                </div>}

            </div>
            {(data && data.products) ? <footer className='footer_container'>
                <Pagination
                    totalItems={data.total || 0}
                    itemsPerPage={10}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </footer> : <></>}
        </>
    )
}

export default ListingPage;