import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SwitchBtn from '../UI/NotificationBtn';
import { useEffect } from 'react';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { padStartNumber } from '../utils/padStartNumber';
import Output from '../UI/Output';
import TimePicker from '../UI/TimePicker';
import RoundedOutskirt from '../UI/RoundedOutskirt';
import RoundedBodyCon from '../UI/RoundedBodyCon';
import { useDataContext } from '../context/DataContext';
import useMutateData from '../service/useMutateData';
import { BACKEND_URL } from '../utils/backendSite';

export default function CalenderUI() {
  const {currentUser} = useDataContext()
    const [value, onChange] = useState();
    const [meridean, setMeridean] = useState(false)
    const [hr, setHr] = useState(12)
    const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [isSetDate, setIsSetDate] = useState(false)
    const [isSetTime, setIsSetTime] = useState(false)
    const subjectRef = useRef(null)
    const messageRef = useRef(null)
    const time = `${padStartNumber(2, hr)}:${padStartNumber(2, min)}:${padStartNumber(2, sec)} ${meridean ? "am" : "pm"}`
    const date = value ? `${padStartNumber(2, value.getDate())}/${padStartNumber(2, value.getMonth() + 1)}/${value.getFullYear()}` : null
    const {mutate} = useMutateData({method: "POST", url: `/notifications?userId=${currentUser._id}`})
    function handleReset(){
      onChange()
      setMeridean(false)
      setHr(12)
      setMin(0)
      setSec(0)
      setIsSetDate(false)
      setIsSetTime(false)
    }

    function handleSaveNotification(){
      const calcTime = +hr === 12 && !meridean ? 0 : +hr + 12
      const intrisicTime = !meridean ? // calcuated time for non-african time: hr + 12
            `${padStartNumber(2, calcTime)}:${padStartNumber(2, min)}:${padStartNumber(2, sec)}`: 
            `${padStartNumber(2, hr)}:${padStartNumber(2, min)}:${padStartNumber(2, sec)}`

            console.log({intrisicTime, meridean, calcTime})
      const notificationData = {
        date,
        time,
        intrisicTime,
        subject: subjectRef.current?.value,
        message: messageRef.current?.value,
        userId: currentUser._id,
        status: "pending",
      }
      console.log("Saving notification:", notificationData)
      if(currentUser._id) mutate(JSON.stringify(notificationData))
      // handleReset()
    }

    useEffect(()=>{subjectRef.current?.focus()},[])
  return (
    <div className='flex flex-col gap-4 max-[715px]:p-4'>
        <p>Set the date and time you want to get notified for the event.</p>
        <Output label={"Date"} permit={value?.toISOString().length}
        buttons={
                isSetDate ? <CancelBtn onClick={()=>setIsSetDate(false)} />
                
                : <button onClick={()=>setIsSetDate(true)} className='bg-amber-500 hover:bg-amber-600 py-2 px-4 rounded-2xl'>ok</button>
        }>
            {date}

        </Output>
        <Output label={"Time"} permit={isSetDate}
        buttons={
                isSetTime ? <CancelBtn onClick={()=>setIsSetTime(false)} />
                : 
                <button onClick={()=>setIsSetTime(true)} className='bg-amber-500 hover:bg-amber-600 py-2 px-4 rounded-2xl'>ok</button>
            }>
            {time}
            </Output>

        {!isSetDate ? <Calendar onChange={onChange} value={value} minDate={new Date()} /> :
        !isSetTime ? <TimePicker setMeridean={setMeridean} 
        setHr={setHr}
        setMin={setMin}
        setSec={setSec}
        hr={hr}
        min={min}
        sec={sec}
        meridean={meridean} /> :
        <RoundedOutskirt w='w-full'>
          <div className='px-4 flex w-full'>
            <p className='font-bold'>Subject:</p>
            <input ref={subjectRef} type="text" placeholder='Your Event' className='w-full h-full ml-3 bg-transparent outline-none' />
          </div>
          <RoundedBodyCon w={"w-full"}>
           <textarea ref={messageRef} className='w-full h-40 ml-3 bg-transparent outline-none' placeholder='Message: Your event notifation message' />
          </RoundedBodyCon>
        </RoundedOutskirt>
        }
        <div className='flex justify-between items-center'>
        {value && <button onClick={handleReset} className='bg-amber-500 hover:bg-amber-600 py-2 px-4 rounded-2xl w-fit'>Cancel</button>}
        {isSetTime && <div className='flex gap-4'>
          <button onClick={handleReset} className='border hover:bg-amber-600 py-2 px-4 rounded-2xl w-fit'>Skip</button>
          <button onClick={handleSaveNotification} className='bg-amber-500 hover:bg-amber-600 py-2 px-4 rounded-2xl w-fit'>Save</button>
        </div>}
        </div>
    </div>
  )
}



// <button onClick={()=>setIsSetDate(false)} className='bg-amber-500 hover:bg-amber-600 py-2 px-4 rounded-2xl'>edit</button>

function CancelBtn({onClick}){
  return <button onClick={onClick} className='size-6 cursor-pointer border hover:bg-amber-600 rounded-full'>&times;</button>
}
