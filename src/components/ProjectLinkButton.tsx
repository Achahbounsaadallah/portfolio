interface Props {
  githubUrl: string;
  label?: string;
}

export default function ProjectLinkButton({ githubUrl, label }: Props) {
  const href = githubUrl || 'https://github.com/Achahbounsaadallah';

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base bg-transparent hover:bg-[#D7E2EA]/10 transition-colors duration-200 cursor-pointer whitespace-nowrap inline-block"
    >
       {label ?? 'View on GitHub'}
    </a>
  );
}
