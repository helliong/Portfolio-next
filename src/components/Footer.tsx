export default function Footer() {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-center pb-1 pt-10 text-center text-[13px] font-light opacity-[var(--opacity)] sm:text-[14px] lg:pb-1 lg:pt-20 lg:text-[15px]">
      <span>
        design & coding by <b className="font-extrabold">me</b>
      </span>
      <span>© {new Date().getFullYear()} Egor Yakovlev. All rights reserved.</span>
    </footer>
  );
}