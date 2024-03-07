import AccountProfile from "../forms/AccountProfile"

interface Props {
  profileWindowName: string,
  user: {
    id: string,
    objectId: string,
    username: string,
    image: string,
    name: string,
    savedRecipes: [],
    collections: [],
  }
}

function PersonalInfo ({ profileWindowName, user }: Props) {
  return (
    <section>
      <h1 className="heading-bold">{profileWindowName}</h1>
        <AccountProfile user={user} />
    </section>
  )
}

export default PersonalInfo