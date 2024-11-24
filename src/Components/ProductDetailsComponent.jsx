function ProductDetailsComponent({ data, handleAccorion, expanded }) {

    const detailsMap = [
        {
            title: "Description",
            key: "description"
        },
        {
            title: "Category",
            key: "category"
        },
        {
            title: "Weight",
            key: "weight"
        },
        {
            title: "Dimensions",
            key: ['dimensions.width', 'dimensions.height', 'dimensions.depth']
        },
        {
            title: "Style Code",
            key: "sku"
        },
        {
            title: "Warranty Information",
            key: "warrantyInformation"
        },
        {
            title: "Return Policy",
            key: "returnPolicy"
        },
        {
            title: "Shipping Information",
            key: "shippingInformation"
        }
    ]

    const getNestedValue = (nestedKey) => {
        return nestedKey.split('.').reduce((acc, part) => acc && acc[part], data) || "-";
    };
    const getValue = (key) => {
        if (typeof key === 'string')
            return data[key] || "-";
        return key.map((currentKey) => getNestedValue(currentKey)).join(" X ");
    }

    return (
        <div style={{ borderTop: "1px solid #e1e1e1", borderBottom: "1px solid #e1e1e1" }}>
            <div className='product_info_container'>
                <h4>
                    Product Details
                </h4>
                <button className='product_detail_info_reviews' onClick={() => handleAccorion("product_details_body")}>{expanded ? "-" : "+"}</button>
            </div>
            <div id='product_details_body' className='product_detail_info_container'>
                {detailsMap.map((detail) => {
                    return (
                        <div className='product_detail_info_container_sub'>
                            <span className='product_details_title'>{detail.title}</span>
                            <span className='product_details_subtitle'>{getValue(detail.key)}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductDetailsComponent;