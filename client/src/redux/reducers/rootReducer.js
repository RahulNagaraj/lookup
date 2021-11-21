import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { servicesReducer } from "./servicesReducer";
import { businessesReducer } from "./businessReducer";
import { searchReducer } from "./searchReducer";

export default combineReducers({
    user: userReducer,
    services: servicesReducer,
    businesses: businessesReducer,
    search: searchReducer,
});
