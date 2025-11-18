import { useNavigate } from "react-router-dom";
import electricity from '../assets/feature-img/electricity.png'
import cable from '../assets/feature-img/cable.png'
import education from '../assets/feature-img/education.png'
import internet from '../assets/feature-img/internet.png'
import airtime from '../assets/feature-img/airtime.png'
import man from "../assets/feature-img/man-dialing-image.png"
const Personal = () => {
    const navigate = useNavigate()
    const featureData = [{
        imgSrc: airtime,
        title:"Airtime",
        to:"/dashboard/airtime"
    },{
        imgSrc:internet,
        title:"Data",
        to:"/dashboard/data"
    },{
        imgSrc:electricity,
        title:"Electricity",
        to:"/dashboard/electricity"
    },{
        imgSrc:education,
        title:"Waec Pin",
        to:"/dashboard/waec"
    },{
        imgSrc:cable,
        title:"Cable tv",
        to:"/dashboard/cable"
    }]
    return ( 
        <div>
            {/* section 1 */}
            <div className="bg-white text-gray-700 text-sm px-2 md:px-6 w-full h-fit grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="col-span-1 flex flex-col gap-4 pt-10">
                    <h1 className="text-gray-700 text-[1.2rem] font-semibold my-2 bg-white">
                    Welcome {`Bright`}, What are you <b className="primary font-semibold ">purchasing today?</b>
                </h1>
                <div className="flex justify-between" >
                    {featureData.map((item,index)=>{
                        return(
                            <div key={index} className="flex flex-col items-center cursor-pointer hover:scale-110 bg-white" onClick={()=>navigate(item.to)}>
                        {/* <span className="w-5 h-5 border-2 rounded-sm px-4 py-2 m-2" > */}
                            <img src={item.imgSrc} alt={item.title} className="w-12 h-11" />
                        {/* </span> */}
                        <p className="mt-2 poppins-regular">{item.title}</p>
                    </div>
                        )
                    })}
                    
                    
                </div>
                <input type="text" className=" py-3 px-7 border border-gray-400 rounded-sm w-full " placeholder="Search for Service" />

                <div className="border primary rounded-sm my-4 py-11 px-3 text-[0.8rem]">
                    <p className="text-gray-700 font-semibold text-[1.2rem]/8 capitalize "><b className="primary">Save N100</b> on bill payments when you transfer directly to your meter or Decoder's Bank
                        Account. Get instant value !
                    </p>
                    <p>Make a bank transfer to the account to buy tokens or renew your subscription instantly</p>
                    <span className="flex justify-between items-center gap-2 my-2 text-[0.6rem]">
                        <span>No inconvenience fee</span>
                        <span>60 second</span>
                        <span>No card exposure</span>
                        <span>No App. No website</span>
                    </span>
                    <span className="mt-5 w-full flex items-center justify-center">
                        <button className="text-sm bg-[#60da68] px-10 py-4 rounded-sm cursor-pointer hover:bg-[#60da68] transition text-black uppercase font-bold">
                                Get your account
                                </button>
                    </span>
                    
                </div>
                </div>
                <div className="hidden md:flex col-span-1 items-center justify-center">
                    <img 
                        src={man} 
                        alt="pic here" 
                        className="w-full h-full object-contain md:object-cover"
                    />
                </div>

            </div>
        </div>
     );
}
 
export default Personal;