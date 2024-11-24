import Utils from "../Utils";

function ProductInfoComponent({ data, scrollingIntoReviewSection }) {

    return (
        <div className='product_card_details'>
            <div style={{ textAlign: "left" }}>
                <div className='product_detail_info_title'>{data.brand}</div>
                <div className='product_detail_info_desc'>{data.title}</div>
            </div>
            <div style={{ textAlign: "left" }}>
                {!data.stock ? <div className='product_detail_info_percentage' style={{ marginLeft: "0px" }}>{data.availabilityStatus}</div> :
                    <>
                        <div className='product_detail_info_percentage' style={{ marginLeft: "0px" }}>{'special price'}</div>
                        <span className='product_detail_info_discounted'>{'$'} {data.discountedPrice}</span>
                        <span className='product_detail_info_price'>{'$'} {data.price}</span>
                        <span className='product_detail_info_percentage'>{data.discountPercentage} {"% Off"}</span>
                    </>
                }
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                <button className='product_detail_info_rating'>{(data.rating).toFixed(1)} <span class="fa fa-star checked"></span></button>
                <button className='product_detail_info_reviews' onClick={() => scrollingIntoReviewSection("product_reviews_body")}>{Utils.getReviewsCount(data.reviews)} {"Reviews"}</button>
            </div>
        </div>
    )

}

export default ProductInfoComponent;