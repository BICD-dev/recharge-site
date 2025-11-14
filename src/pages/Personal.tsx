const Home = () => {
    return ( 
        <div>
            {/* section 1 */}
            <div className="bg-white text-gray-700 text-sm px-6 w-full h-fit grid grid-cols-3  mb-20">

                <div className=" flex flex-col gap-4 pt-26">
                    <h1 className="text-gray-700 text-[1.2rem] font-semibold my-2">
                    Welcome {``}, What are you <b className="primary font-semibold ">purchasing today?</b>
                </h1>

                <input type="text" className=" py-3 px-7 border border-gray-400 rounded-sm w-full " placeholder="Search for Service" />

                <section className="border primary rounded-sm my-4 py-11 px-3 text-[0.8rem]">
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
                        <button className="text-sm bg-primary px-10 py-4 rounded-sm cursor-pointer hover:bg-primary transition text-white uppercase font-bold">
                                Get your account
                                </button>
                    </span>
                    
                </section>
                </div>
                <div className="flex items-center justify-center">
                    <img src="pic here" alt="pic here" />
                </div>
                <div></div>
            </div>
        </div>
     );
}
 
export default Home;