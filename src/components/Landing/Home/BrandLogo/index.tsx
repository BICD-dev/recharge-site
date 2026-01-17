import Marquee from "react-fast-marquee";
import { brandList } from "./data";

function BrandLogo() {
  return (
    <section>
      <div className="2xl:py-20 py-11">
        <div className="container">
          <div className="gap-4">
            <div className="flex justify-center text-center py-4 relative">
              <p className="text-slate-700 font-medium">
                Trusted by top <span className="text-[#60da68]">service providers</span>
              </p>
            </div>

            <div className="py-3 Xsm:py-7">
              <Marquee
                speed={40}
                pauseOnHover={true}
                gradient={false}
              >
                {brandList.map((items, index) => (
                  <div
                    key={index}
                    className="relative mr-10 flex items-center justify-center w-[180px] h-[80px]"
                  >
                    <img
                      src={items?.image}
                      alt="logo"
                      className="object-contain w-full h-full"
                    />
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandLogo;
