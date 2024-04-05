import { constSelector, useRecoilValue, useSetRecoilState } from "recoil"
import { openAtoms, stringAtoms } from "../store/atoms/atoms"
import { useEffect, useState } from "react"



export const PopUp = ({m}:{m:string})=>{
    const value = useRecoilValue(openAtoms)
    const setValue = useSetRecoilState(openAtoms)
    // const newM = JSON.parse(localStorage.getItem("token")||"").message
//   const [message,setMessage] = useState("")
//   const [work,setWork] = useState(true)
//   const s = useRecoilValue(stringAtoms)
    function open(){
        setValue(c=>!c)
        setTimeout(()=>{
            setValue(c=>!c);
        },1000)
    }
    useEffect(()=>{
        if (m) {
            open();
        }
    },[m])
    
    return <div className={`transition-all ease-in-out duration-1000 ${value?"rounded-2xl w-1/2 text-center absolute top-0 transform -translate-x-1/2 translate-y-12  left-1/2   p-2 bg-slate-800 text-white":"absolute top-0 -translate-x-1/2 -translate-y-12 rounded-2xl w-1/2 text-center left-1/2  p-2 bg-slate-800 text-white"}`}>
         {m}
    </div>
}