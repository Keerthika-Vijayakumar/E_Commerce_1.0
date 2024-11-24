class Utils {

    static formatDate = (isoDate) => {
        if (!isoDate) {
            return "-";
        }
        const date = new Date(isoDate);
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    static getReviewsCount = (reviews) => {
        if (!reviews || !reviews.length) {
            return 0;
        }
        return reviews.length;
    }
}

export default Utils;