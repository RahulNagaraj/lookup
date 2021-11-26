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

export const constructEventsPlacesObject = (events) => {
    const places = [];
    events.forEach((event) => {
        const newObj = {
            name: "",
            attendingCount: "",
            timeStart: "",
            timeEnd: "",
            displayAddress: "",
            coordinates: {
                latitude: "",
                longitude: "",
            },
        };
        newObj.name = event.name;
        newObj.attendingCount = event.attending_count;
        newObj.displayAddress = event?.location?.display_address.join(", ");
        newObj.coordinates.latitude = event.latitude;
        newObj.coordinates.longitude = event.longitude;

        places.push(newObj);
    });

    return places;
};

export const dateFormat = (date) => {
    const newDate = new Date(date);
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const formatedDate = newDate.toLocaleDateString("en-US", options);
    return formatedDate;
};

export const isAdmin = (state) => {
    return state.isLoggedIn && state.userDetails.role === "ADMIN";
};
