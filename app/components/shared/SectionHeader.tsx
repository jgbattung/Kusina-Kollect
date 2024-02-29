interface Props {
  title: string;
  description: string | undefined;
}

function SectionHeader({ title, description }: Props) {
  return (
    <div className="page-container">
      <h1 className="heading-bold">{title}</h1>
      <p className="body-light pt-2">{description}</p>
    </div>
  )
}

export default SectionHeader