import { cases } from "@/data/projects";

export default function Cases() {
  return (
    <section id="cases" className="scroll-mt-10 py-24 sm:py-32 lg:py-[20%] lg:pb-[25%]">
      <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
        <span className="relative flex whitespace-nowrap text-[28px] font-bold lg:right-[95px] lg:mt-[120px] lg:-translate-y-1/2 lg:-rotate-90 lg:text-3xl">
          amazing cases
          <span className="absolute left-[75%] top-[115%] h-1 w-[40px] -translate-y-[5px] bg-[var(--line-color)] lg:w-[50px]" />
        </span>

        {cases.map((item) => (
          <a
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex cursor-pointer flex-col"
          >
            <img
              src={item.image}
              alt={item.alt}
              className="w-full max-w-[270px] rounded-[5px] border border-white transition hover:scale-[1.03]"
            />

            <span className="mt-4 text-base font-medium lowercase lg:mt-[50px]">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}