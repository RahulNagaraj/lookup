import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { servicesReducer } from "./servicesReducer";

export default combineReducers({
    user: userReducer,
    services: servicesReducer,
});
