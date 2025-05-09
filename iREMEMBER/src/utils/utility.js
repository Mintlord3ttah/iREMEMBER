export function truncateStr(str, length) {
    if (str.length > length) {
        return str.substring(0, length) + "...";
    } else {
        return str;
    }
}

export function handleFieldState(setIsState, state, field, mutate){
    try{
      setIsState(state => !state)
      const changePacked = state ? false : true
      const obj = field === "packed" ?
                  JSON.stringify({packed: changePacked}):
                  JSON.stringify({selected: changePacked})
      mutate(obj)
    }catch(error){
      console.log(error.type)
  }
}