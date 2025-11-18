import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const pathUrl = useLocation().pathname;
  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
  }, [pathUrl]);

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-999">
      <div className="flex gap-2.5 items-center">
        <HashLink to={"#"} className="hidden lg:block   text-sm text-black font-medium px-4 py-3.5 leading-none rounded-lg text-nowrap">
          <img src={"/images/footer/app-store-bedge.svg"} alt='play-store-bedge' width={126} height={23} />
        </HashLink>
        {isVisible && (
          <div
            onClick={scrollToTop}
            aria-label="scroll to top"
            className="back-to-top flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-[#102C46] text-white shadow-md transition duration-300 ease-in-out hover:bg-dark"
          >
            <span className="mt-1.5 h-3 w-3 rotate-45 border-l border-t border-white"></span>
          </div>
        )}
      </div>
    </div>
  );
}
