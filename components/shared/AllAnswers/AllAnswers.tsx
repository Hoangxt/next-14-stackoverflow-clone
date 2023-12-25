import React from "react";
import Filter from "../Filter/Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "../ParseHTML/ParseHTML";
import Votes from "../Votes/Votes";
import Pagination from "../Pagination/Pagination";
interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number | string;
  filter?: string;
}
const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) => {
  const { answers, isNext } = await getAnswers({
    questionId,
    sortBy: filter,
  });

  const pageNumber = page ? +page : 1;

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        {/* Filters */}
        <Filter filters={AnswerFilters} />
      </div>
      {/* Render Answers  */}
      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            {/* SPAN ID */}
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  alt="profile"
                  width={18}
                  height={18}
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}{" "}
                  </p>
                  <p className="small-regular text-light400_light500 ml-2 mt-0.5 line-clamp-1">
                    answered {getTimeStamp(answer.createdAt)}
                  </p>
                </div>
              </Link>

              {/* Voting section */}
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasUpVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasDownVoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>
            {/* Answer content */}
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 w-full">
        <Pagination pageNumber={pageNumber} isNext={isNext} />
      </div>
    </div>
  );
};

export default AllAnswers;
