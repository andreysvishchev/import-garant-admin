import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import thunk, { ThunkDispatch } from 'redux-thunk';
import {productsReducer} from "./productsReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    products: productsReducer

});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppStateType = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
export type AppDispatchType =  ThunkDispatch<AppStateType, any, AnyAction>