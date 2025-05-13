import { createContext, useContext, useMemo, useReducer } from "react";

const Context = createContext()
const initialState = {
    isSelect: false,
    isFavourite: false,
    isEdit: false,
    itemToEdit: {},
    sortStr: {},
    sortOrder: "asc",
    shouldFetch: false,
    items: [],
}

function reducer(state, action){
    switch (action.type) {
        case "item/select":
            return {
                ...state,
                isSelect: !state.isSelect
            }
        case "item/edit":
            return {
                ...state,
                isEdit: !state.isEdit,
                itemToEdit: action.payload
            }
        case "item/set-favourite":
            return {
                ...state,
                isFavourite: action.payload ? +action.payload : !state.isFavourite
            }
        case "item/reset-favourite":
            return {
                ...state,
                isFavourite: false
            }
        case "sort/sort-str":
            // console.log(action.payload)
            return {
                ...state,
                sortStr: {sortField: action.payload, sortOrder: state.sortOrder}//state.sortOrder === "desc" ? "-" + action.payload : action.payload,
                // shouldFetch: true,
            }
        case "sort/sort-order":
            return {
                ...state,
                sortOrder: action.payload
            }
        case "items/fetch":
            return {
                ...state,
                items: action.payload
            }
        default:
            throw new Error("unknown action");
            
    }
}

export default function DataContextProvider({children}) {
    const [{isSelect, isFavourite, isEdit, itemToEdit, items, shouldFetch, sortStr, sortOrder}, dispatch] = useReducer(reducer, initialState)
    function select(){
        dispatch({type: "item/select"})
    }
    function setIsFavourite(prevalue=""){
        dispatch({type: "item/set-favourite", payload: prevalue})
    }
    function resetIsFavourite(){
        dispatch({type: "item/reset-favourite"})
    }
    function edit(item={}){
        console.log(item)
        dispatch({type: "item/edit", payload: item})
    }
    function getSortStr(str){
        // console.log(str)
        dispatch({type: "sort/sort-str", payload: str})
    }
    function getSortOrder(str){
        dispatch({type: "sort/sort-order", payload: str})
    }
    function getAllItems(items){
        dispatch({type: "items/fetch", payload: items})
    }
    console.log(isEdit)
    const memoizedSortStr = useMemo(()=>sortStr,[sortStr])
  return <Context.Provider value={{
    select,
    isSelect,
    setIsFavourite,
    resetIsFavourite,
    isFavourite,
    isEdit,
    edit,
    getSortStr,
    getSortOrder,
    memoizedSortStr,
    itemToEdit,
    sortOrder,
    getAllItems,
    items,
    shouldFetch,
  }}>
    {children}
  </Context.Provider>
}

function useDataContext(){
    const context = useContext(Context)

    if(context === undefined) throw new Error("using context outside of its scope")
    return context
}

export {useDataContext, DataContextProvider}
