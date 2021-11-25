import { combineReducers } from "redux";

import { userReducer } from "./userReducer";
import { servicesReducer } from "./servicesReducer";
import { businessesReducer } from "./businessReducer";
import { searchReducer } from "./searchReducer";
import { eventsReducer } from "./eventReducer";
import { analyticsReducer } from "./analyticsReducer";

export default combineReducers({
    user: userReducer,
    services: servicesReducer,
    businesses: businessesReducer,
    search: searchReducer,
    events: eventsReducer,
    analytics: analyticsReducer,
});
