import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { servicesReducer } from "./servicesReducer";
import { businessesReducer } from "./businessReducer";

export default combineReducers({
    user: userReducer,
    services: servicesReducer,
    businesses: businessesReducer,
});
