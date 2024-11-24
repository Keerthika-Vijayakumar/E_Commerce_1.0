import React from "react";
import Utils from "../Utils";
function ReviewComponent({ reviews }) {

    const getRatingComponent = (rating) => {
        const ratingComponent = [];
        for (let index = 1; index <= 5; index++) {
            ratingComponent.push(<div className={`fa fa-star ${index <= rating ? "checked" : ""}`} key={index}></div>);
        }
        return ratingComponent;
    }

    return reviews.map((review) => {
        return (<div className='review_component_container'>
            <div className='avatar_wrapper'>
                <span className='avatar'>
                    <span class='fa fa-user' style={{ fontSize: "2rem" }}></span>
                </span>
                {review.reviewerName || "-"}</div>
            <div>{getRatingComponent(review.rating)}</div>
            <div>{"Reviewed on "}{Utils.formatDate(review.date)}</div>
            <div>{review.comment || "-"}</div>
        </div>)
    })
}

export default ReviewComponent;