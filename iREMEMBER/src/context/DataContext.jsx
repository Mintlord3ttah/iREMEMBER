import { useEffect } from "react";
import { createContext, useContext, useMemo, useReducer } from "react";
import { getUser } from "../service/getUser";

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
    currentUser: {},
    sessionId: "", // users id
    isSigningUpStatus: "",
    accessToken: "",
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
        case "user/fetch":
            const id = action.payload.split("")
                       .map((v,i)=> i % 4 === 0 ? v + "." : v).join("")
            const userid =  `${crypto.randomUUID()}-${id}-tcvky$657789`
            console.log({userid})
            localStorage.setItem("joker", userid)
            return {
                ...state,
                isSigningUpStatus: "processing",
                sessionId: localStorage.getItem("joker").split("-").at(-2).split(".").join(''),
            }
        case "user/currentUser":
            return {
                ...state,
                currentUser: action.payload,
                isSigningUpStatus: "success",
            }
        case "user/get-token":
            return {
                ...state,
               accessToken: action.payload
            }
        default:
            throw new Error("unknown action");
            
    }
}

export default function DataContextProvider({children}) {
    const [{isSelect, isFavourite, isEdit, isSigningUpStatus,
           accessToken, itemToEdit, sessionId, currentUser, items, shouldFetch, sortStr, sortOrder}, dispatch] = useReducer(reducer, initialState)
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
    function getUserId(id){
        dispatch({type: "user/fetch", payload: id})
    }
    function getCurrentUser(currentUser){
        // console.log({currentUser})
        dispatch({type: "user/currentUser", payload: currentUser})
    }
    function getAccessToken(token){
        // console.log({token})
        dispatch({type: "user/get-token", payload: token})
    }
    const memoizedSortStr = useMemo(()=>sortStr,[sortStr])
// console.log({accessToken})

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
    isSigningUpStatus,
    getUserId,
    currentUser,
    sessionId,
    getCurrentUser,
    accessToken,
    getAccessToken,
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

