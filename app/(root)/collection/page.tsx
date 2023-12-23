import React from "react";

import type { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import { getSavedQuestions } from "@/lib/actions/user.action";

import Filter from "@/components/shared/Filter/Filter";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { QuestionFilters } from "@/constants/filters";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult/NoResult";
export const metadata: Metadata = {
  title: "Collections | Dev Overflow",
  description: "Collections page of Dev Overflow",
};

const CollectionPage = async () => {
  const { userId } = auth();
  if (!userId) return null;

  const { questions } = await getSavedQuestions({
    clerkId: userId,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      {/* Card section */}
      <div className="mt-10 flex flex-col gap-6">
        {/*  // ? looping through questions */}
        {questions.length > 0 ? (
          questions?.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes.length}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            title="There is no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
};

export default CollectionPage;
