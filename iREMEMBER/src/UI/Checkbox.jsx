import Loader from "./Loader";

export default function Checkbox({handlePacked, state, status, name}) {
  return <>
    {
    status === "pending" ? <Loader /> :
    <input type="checkbox" onChange={handlePacked} checked={state} name={name} id={name} />
    } 
  </>

}
