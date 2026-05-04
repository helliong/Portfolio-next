export default function Footer() {
  return (
    <footer className="relative z-10 flex flex-col items-center justify-center pb-8 pt-20 text-[15px] font-light opacity-[var(--opacity)]">
      <span>
        design & coding by <b className="font-extrabold">me</b>
      </span>
      <span>© {new Date().getFullYear()} Egor Yakovlev. All rights reserved.</span>
    </footer>
  );
}