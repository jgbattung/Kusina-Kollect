import Image from "next/image";

interface Props {
  title: string;
  description: string | undefined;
  displayImage: string;
}

function SectionHeader({ title, description, displayImage }: Props) {
  return (
    <div className="page-container -mb-6 max-sm:-mb-10">
      <div className="relative">
        <Image 
          src={displayImage}
          alt="filipino-food"
          width={2000}
          height={0}
          className="object-cover max-h-96"
          priority
        />
      </div>
      <div className="center mt-8 px-3">
        <h1 className="heading-bold">{title}</h1>
        <p className="body-light pt-2 max-md:text-center">{description}</p>
      </div>
    </div>
  )
}

export default SectionHeader