import { createStore } from "redux";
import rootReducer from "../reducer/rootReducer";

function configureStore(state = { rotating: true }) {
  return createStore(rootReducer,state);
}

export default configureStore;