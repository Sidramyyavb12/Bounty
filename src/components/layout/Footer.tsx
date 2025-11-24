export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-[11px] text-slate-500">
        <span>© {new Date().getFullYear()} Bounty Creation Wizard</span>
        <span>Built for Dropchain assignment</span>
      </div>
    </footer>
  );
}
