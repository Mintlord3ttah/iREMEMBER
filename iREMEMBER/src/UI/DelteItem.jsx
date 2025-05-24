import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Loader from './Loader';
import useMutateData from '../service/useMutateData';
import { RiDeleteBin6Line } from "react-icons/ri";
import OverlayBtn from './OverlayBtn';
import { useDataContext } from '../context/DataContext';

export default function DelteItem({id}) {
  const {displayType} = useDataContext()
  const {mutate, status} = useMutateData({id, method: "DELETE"})

  function handleDelete(){
    mutate("")
  }
  return <>
    {displayType === "list" ? <button onClick={handleDelete} className="delete text-xs bg-amber-300 hover:bg-amber-500 text-gray-600 hover:text-gray-700 absolute -right-[10%] top-1 p-1.5 rounded-full">
    {status === "pending" ? <Loader/> : <FaTimes />}
    </button> :
    <OverlayBtn onClick={handleDelete} title={"Delete item"}>
      {status === "pending" ? <Loader/> : <RiDeleteBin6Line />}
    </OverlayBtn>
  }
  </>
}
