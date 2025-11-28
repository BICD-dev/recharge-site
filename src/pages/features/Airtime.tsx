import AirtimeForm from "@/components/Dashboard/Airtime/Airtimeform";
import StepIndicator from "@/components/StepIndicator";

const Airtime = () => {
    return ( 
        <div className="h-screen flex flex-col mt-4 justify-center items-center">
          {/* put step indicator here */}
            <StepIndicator currentStep={1} />
     
             <AirtimeForm/>
        </div>
     );
}
 
export default Airtime;