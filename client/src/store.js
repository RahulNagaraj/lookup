import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
// import logger from 'redux-logger'

import rootReducer from "./redux/reducers/rootReducer";
import rootSaga from "./redux/sagas/rootSaga";

// import { checkUser } from "./services/UserService";
// import { userLoggedIn } from "./actions/userActions";

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
          })
        : compose;

const saga = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(saga));

const store = createStore(rootReducer, enhancer);

// const user = checkUser();
// if (user) {
//     store.dispatch(userLoggedIn(user));
// }

saga.run(rootSaga);

export default store;
