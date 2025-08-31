function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="my-16">
      <div className="border-t border-neutral-800 pt-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-neutral-200 font-medium text-lg">
              Let's connect
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
              I'm always interested in discussing new opportunities,
              collaborating on projects, or just having a conversation about
              technology and web development.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <a
              className="group flex items-center gap-3 text-neutral-300 hover:text-neutral-100 
                         transition-all duration-300 py-2 px-3 -mx-3 rounded-md
                         hover:bg-neutral-800/30 border border-transparent hover:border-neutral-700/50"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/juandelossantosdeveloper/"
            >
              <ArrowIcon />
              <span className="text-sm font-medium">LinkedIn</span>
            </a>

            <a
              className="group flex items-center gap-3 text-neutral-300 hover:text-neutral-100 
                         transition-all duration-300 py-2 px-3 -mx-3 rounded-md
                         hover:bg-neutral-800/30 border border-transparent hover:border-neutral-700/50"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/JuanDls01/"
            >
              <ArrowIcon />
              <span className="text-sm font-medium">GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} Juan De los Santos. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
