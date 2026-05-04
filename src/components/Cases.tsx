import { cases } from "@/data/projects";
import Link from "next/link";

export default function Cases() {
  return (
    <section
      id="cases"
      className="overflow-hidden py-[20%] pb-[25%] max-md:py-20 scroll-m-10"
    >
      <div className="relative flex items-start justify-between max-md:flex-col max-md:items-center max-md:gap-10">
        <span className="relative right-[95px] mt-[120px] flex -translate-y-1/2 -rotate-90 whitespace-nowrap text-3xl font-bold max-md:static max-md:mt-0 max-md:translate-y-0 max-md:rotate-0 max-md:text-[28px]">
          amazing cases
          <span className="absolute left-[75%] top-[115%] h-1 w-[50px] -translate-y-[5px] bg-[var(--line-color)] max-md:left-[68%] max-md:top-[115%] max-md:w-[30px]" />
        </span>

        {cases.map((item) => (
          <div key={item.id} className="ml-[-40px] flex max-md:ml-0">
            <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="max-md:flex-col"
              >
              <img
                src={item.image}
                alt={item.alt}
                className="w-[270px] rounded-[5px] border border-white transition hover:scale-[1.03] max-md:w-full"
              />

              <span className="relative mt-[50px] ml-[-30px] text-base font-medium lowercase max-md:mt-[3%] max-md:ml-[30px]">
                {item.name}
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
