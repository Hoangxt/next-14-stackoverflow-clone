import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// from server actions
import { getUserById } from "@/lib/actions/user.action";
import type { Metadata } from "next";
import { ParamsProps } from "@/types";
import Profile from "@/components/forms/Profile";

export const metadata: Metadata = {
  title: "Edit Profile | Dev Overflow",
  description: "Edit Profile page of Dev Overflow",
};

const EditProfilePage = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) redirect("/sing-in");

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Your Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </div>
  );
};

export default EditProfilePage;
