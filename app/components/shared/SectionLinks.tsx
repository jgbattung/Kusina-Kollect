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
    <section className="center pt-16">
      <p>{linksDesc}</p>
      <div className="pt-6">
        <ul className="grid grid-cols-3 gap-10">
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