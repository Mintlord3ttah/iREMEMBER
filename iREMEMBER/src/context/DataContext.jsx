import { createContext, useContext, useReducer } from "react";

const Context = createContext()
const initialState = {
    isSelect: false,
    isFavourite: false,
    isEdit: false,
    itemToEdit: {}
}

function reducer(state, action){
    switch (action.type) {
        case "item/select":
            return {
                ...state,
                isSelect: !state.isSelect
            }
        case "item/edit":
            // console.log(action.payload, )
            return {
                ...state,
                isEdit: !state.isEdit,
                itemToEdit: action.payload
            }
        case "item/set-favourite":
            // console.log(action.payload)
            return {
                ...state,
                isFavourite: action.payload ? +action.payload : !state.isFavourite
            }
        case "item/reset-favourite":
            return {
                ...state,
                isFavourite: false
            }
        default:
            throw new Error("unknown action");
            
    }
}

export default function DataContextProvider({children}) {
    const [{isSelect, isFavourite, isEdit, itemToEdit}, dispatch] = useReducer(reducer, initialState)

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
        dispatch({type: "item/edit", payload: item})
    }
  return <Context.Provider value={{
    select,
    isSelect,
    setIsFavourite,
    resetIsFavourite,
    isFavourite,
    isEdit,
    edit,
    itemToEdit
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
