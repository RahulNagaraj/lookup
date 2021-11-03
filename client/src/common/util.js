export const constructPlacesObject = (businesses) => {
    const places = [];
    businesses.forEach((business) => {
        const newObj = {
            name: "",
            rating: "",
            address1: "",
            city: "",
            state: "",
            country: "",
            price: "",
            isOpenNow: false,
            categories: "",
            coordinates: [],
        };
        newObj.name = business.name;
        newObj.rating = business.rating;
        newObj.address1 = business?.location?.address1;
        newObj.city = business?.location?.city;
        newObj.state = business?.location?.state;
        newObj.country = business?.location?.country;
        newObj.country = business.price || "";
        newObj.isOpenNow = business?.hours?.isOpenNow;
        newObj.coordinates = business.coordinates;
        newObj.categories = business.categories.map((c) => c.title).join(", ");

        places.push(newObj);
    });

    return places;
};
