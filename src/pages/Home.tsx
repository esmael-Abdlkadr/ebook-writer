import { Link } from "react-router-dom";
import NavBar from "../components/home/Navbra";
import img from "/hero.jpg";

function Home() {
  return (
    <section className="w-full h-[100vh]">
      <NavBar />
      <div className={"px-8 md:pl-[48px] py-0 mt-[96px] h-[100vh]"}>
        <div
          className={
            "  mx-0 my-[30px] py-0 px-8 grid  grid-cols-1 gap-8  md:grid-cols-2 lg:gap-24 items-center"
          }
        >
          {/* Text Content */}
          <div className="sm:ml-0">
            <h1
              className={
                "font-bold text-[#333] tracking-[-0.5px] text-3xl sm:text-4xl md:text-5xl mb-6 sm:mb-8 leading-10"
              }
            >
              Elevate Your Writing Experience with
              <span className={"text-[#0284c7]"}> Ebook Writer</span>
            </h1>
            <p className={"text-xl mb-12 text-[#444] leading-9"}>
              Discover a powerful platform designed for authors, writers, and
              collaborators. Effortlessly create books, manage sections and
              subsections, and work together with others to bring your ideas to
              life.
            </p>
            <button
              type="button"
              className="text-[20px] font-semibold text-center px-5 py-3 rounded-lg border-none cursor-pointer bg-[#0284c7] text-white flex justify-center items-center hover:bg-[#0369a1] text-nowrap"
            >
              <Link to={"/login"}> Get Started</Link>
            </button>
          </div>
          {/* Image */}
          <div className="my-6">
            <img src={img} alt="Ebook Writer platform" className={"w-full"} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
