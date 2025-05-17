import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Loader from './Loader';
import useMutateData from '../service/useMutateData';

export default function DelteItem({id}) {
  const {mutate, status} = useMutateData({id, method: "DELETE"})

  function handleDelete(){
    mutate("")
  }
  return <button onClick={handleDelete} className="delete text-xs bg-amber-300 hover:bg-amber-500 text-gray-600 hover:text-gray-700 absolute -right-[10%] top-1 p-1.5 rounded-full">
  {status === "pending" ? <Loader/> : <FaTimes />}
</button>
}
