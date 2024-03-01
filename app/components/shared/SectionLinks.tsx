import Link from "next/link";

interface Props {
  linksDesc?: string;
  links:
    { 
      name: string, path: string
    }[],
}

function SectionLinks({ linksDesc, links }: Props) {
  return (
    <section className="center pt-16 max-md:pt-8">
      <p className="pb-4">{linksDesc}</p>
      <div className="pt-6 max-md:pt-0">
        <ul className={`grid ${links.length > 6 ? 'grid-cols-5' : 'grid-cols-3' } gap-10 max-md:grid-cols-2 max-md:gap-7 max-sm:flex max-sm:flex-col max-sm:gap-4`}>
          {links.map((link) => (
            <li key={link.name} className="flex items-center justify-center">
              <Link href={link.path}>
                <span className="text-base font-extrabold underline-custom">{link.name.toUpperCase()}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default SectionLinks