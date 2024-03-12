"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"

interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  image: string;
  path?: string | undefined;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  path
}: UpdateUserParams): Promise<void> {
  connectToDB();
  try {
    await User.findOneAndUpdate(
      { id: userId },
      {
        username,
        name,
        image,
        onboarded: true,
      },
      { upsert: true }
    )
    if(path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`)
  }
};

export async function doesUserExist(userId: string) {
  connectToDB();

  try {
    const user = await User.findOne({ id: userId });
    return !!user;
  } catch (error: any) {
    throw new Error(`Failed to check user's existence: ${error.message}`)
  }
}

export async function fetchUser(userId: string) {
  connectToDB();

  try {
    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
};