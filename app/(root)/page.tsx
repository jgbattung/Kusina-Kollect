import { doesUserExist, updateUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user =  await currentUser();
  if (user) {
    const { id, username, imageUrl } = user;

    const userExists = await doesUserExist(id);
    if (!userExists) {
      try {  
        await updateUser({
          userId: id,
          username: username as string,
          name: "",
          image: imageUrl,
        });
        console.log('User added to DB')      
      } catch (error: any) {
        throw new Error(`Failed to save user: ${error.message}`)
      }
    }
  }

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-primary-500">HOMEPAGE</h1>
    </div>
  );
}
