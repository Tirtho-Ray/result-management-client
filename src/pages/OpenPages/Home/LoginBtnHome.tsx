import { useRef, useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import { gsap } from "gsap";

const LoginBtnHome = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    setIsOpenModal(true);
    gsap.fromTo(
        modalRef.current,
        { opacity:0,y:-50 },
        { opacity:1, y:0, duration:1, ease:"power1.inOut" }
    )
    // if (modalRef.current) {
    //     gsap.to(modalRef.current, {
    //       opacity: 1,
    //       x: 0,
    //       duration: 0.5,
    //       ease: "power3.in",
    //       onComplete: () => setIsOpenModal(true),
    //     });
    //   }
  };
  const closeModal = () => {
    // setIsOpenModal(false);
    if (modalRef.current) {
        gsap.to(modalRef.current, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power3.in",
          onComplete: () => setIsOpenModal(false),
        });
      }
  };
  return (
    <div>
      {/* button */}
      <div className="flex justify-end">
        <button
          onClick={openModal}
          className="bg-slate-400 px-3 py-2 text-[12px] font-mono rounded-sm font-bold mt-2 mr-2"
        >
          Login
        </button>
      </div>
      {/* modal */}
      {/* fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-3 */}
      {isOpenModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-2">
          
          <div
            ref={modalRef}
            className="bg-white w-full max-w-md p-6 rounded-md shadow-md transform"
          >
            <div className="flex justify-end mr-4 mt-3">
                <p onClick={closeModal}><RxCrossCircled /></p>
            </div>
            <h2 className="text-lg font-bold mb-4 text-center">Login</h2>
            <form>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Enter your email"
              />
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 mb-4"
                placeholder="Enter your password"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full"
              >
               Login
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginBtnHome;
