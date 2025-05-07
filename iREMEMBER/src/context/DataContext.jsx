import { createContext, useContext, useReducer } from "react";

const Context = createContext()
const initialState = {
    isSelect: false,
}

function reducer(state, action){
    switch (action.type) {
        case "select/item":
            return {
                ...state,
                isSelect: !state.isSelect
            }
        default:
            throw new Error("unknown action");
            
    }
}

export default function DataContextProvider({children}) {
    const [{isSelect}, dispatch] = useReducer(reducer, initialState)

    function select(){
        dispatch({type: "select/item"})
    }
  return <Context.Provider value={{
    select,
    isSelect
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
