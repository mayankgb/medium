import { RecoilRoot } from "recoil"
import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

export const Signup = ()=>{
    return <RecoilRoot>

     
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2 auto-cols-min ">
            <div>
            <Auth type="signup"/>
            </div>
            <div className="hidden md:block ">
            <Quote></Quote>
            </div>
            
        </div>
        
    </div>
    </RecoilRoot>
}