import React from "react";

import Question from "@/components/forms/Question";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
// from server actions
import { getUserById } from "@/lib/actions/user.action";
import { getQuestionById } from "@/lib/actions/question.action";

import type { Metadata } from "next";
import { ParamsProps } from "@/types";

export const metadata: Metadata = {
  title: "Edit Question | Dev Overflow",
  description: "Edit question page of Dev Overflow",
};

const EditQuestionPage = async ({ params }: ParamsProps) => {
  // get user id from clerk
  const { userId } = auth();

  if (!userId) redirect("/sing-in");

  const mongoUser = await getUserById({ userId });

  const { question } = await getQuestionById({
    questionId: params.id,
  });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="Edit"
          mongoUserId={mongoUser._id}
          questionData={JSON.stringify(question)}
        />
      </div>
    </div>
  );
};

export default EditQuestionPage;
