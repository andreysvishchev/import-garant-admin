import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk';
import {productsReducer} from "./productsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    products: productsReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;