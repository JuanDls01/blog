export default function Footer() {
  return (
    <footer className="mt-18 border-t border-line pt-6 pb-12 flex items-center justify-between text-[13px] text-faint">
      <span>© {new Date().getFullYear()} Juani De los Santos</span>
      <nav className="flex gap-4">
        <a
          href="https://github.com/JuanDls01/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fg transition-colors duration-150"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/juanidlsdev/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fg transition-colors duration-150"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/JuanDls01"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fg transition-colors duration-150"
        >
          X
        </a>
      </nav>
    </footer>
  );
}
