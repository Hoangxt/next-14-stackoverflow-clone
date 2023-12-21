import Question from "@/components/forms/Question";
import React from "react";
import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// from server actions
import { getUserById } from "@/lib/actions/user.action";

export const metadata: Metadata = {
  title: "Ask-question | Dev Overflow",
  description: "Ask question page of Dev Overflow",
};
const page = async () => {
  const { userId } = auth();
  // fake user id
  // const userId = "123456";

  if (!userId) redirect("/sing-in");

  const mongoUser = await getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        {/* chuyền prop mongoUserId xuống Question component */}
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default page;
