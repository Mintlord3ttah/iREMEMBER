import NumberSelector from './NumberSeclector'
import SwitchBtn from './NotificationBtn'
import RoundedOutskirt from './RoundedOutskirt'
import RoundedBodyCon from './RoundedBodyCon'
import { useEffect } from 'react'

export default function TimePicker({setMeridean, hr, min, sec, setHr, setMin, setSec, meridean}) {
const range = {
  hr: [1, 12],
  min: [0, 60],
  sec: [0, 60]
}

  useEffect(()=>{
    function checkRange(){
      hr > range.hr[1] && setHr(range.hr[1])
      hr < range.hr[0] && setHr(range.hr[0])
      min > range.min[1] && setMin(range.min[1])
      min < range.min[0] && setMin(range.min[0])
      sec > range.sec[1] && setSec(range.sec[1])
      sec < range.sec[0] && setSec(range.sec[0])
    }
    checkRange()
  },[min,sec,hr])

  return <RoundedOutskirt>
              <div className='ml-2'>
              <SwitchBtn a={"am"} b={"pm"} setValue={setMeridean} value={meridean} /> 
              </div>
              <RoundedBodyCon>
                  <NumberSelector setTimeValue={setHr} timeValue={hr} label="hr" text="Hour" br="border-r" max={range.hr[1]} min={range.hr[0]}/>
                  <NumberSelector setTimeValue={setMin} timeValue={min} label="min" text="Minute" br="border-r" max={range.min[1]} min={range.min[0]} />
                  <NumberSelector setTimeValue={setSec} timeValue={sec} label="Sec" text="Seconds" max={range.sec[1]} min={range.sec[0]} />
              </RoundedBodyCon>
  </RoundedOutskirt>
}
