import CableForm from "@/components/Dashboard/Cable/CableForm";
import StepIndicator from "@/components/StepIndicator";

const Cable = () => {
    return ( 
        <div className="h-screen flex flex-col mt-4 justify-center items-center">
          {/* put step indicator here */}
                      <StepIndicator currentStep={1} />
          
             <CableForm/>
        </div>
     );
}
 
export default Cable;