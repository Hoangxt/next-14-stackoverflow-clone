"use client";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { formatAndDivideNumber } from "@/lib/utils";
import {
  downVoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { downVoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  hasUpVoted: boolean;
  downvotes: number;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  hasUpVoted,
  downvotes,
  hasDownVoted,
  hasSaved,
}: Props) => {
  // route
  const pathname = usePathname();
  // const router = useRouter();

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please login first",
        description: "You need to login to perform this action",
      });
    }
    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }
      return toast({
        title: `Upvoted ${!hasUpVoted ? "Successful" : "Removed"}`,
        variant: !hasUpVoted ? "default" : "destructive",
      });
    }
    // Downvote action
    if (action === "downvote") {
      if (type === "Question") {
        await downVoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downVoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }
      return toast({
        title: `Downvoted ${!hasDownVoted ? "Successful" : "Removed"}`,
        variant: !hasDownVoted ? "default" : "destructive",
      });
    }
  };

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    });

    return toast({
      title: `Question ${
        !hasSaved ? "Saved in" : "Removed from"
      } your collection`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        {/* up vote */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upVote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {upvotes ? formatAndDivideNumber(upvotes) : "0"}
            </p>
          </div>
        </div>
        {/* down vote  */}
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {downvotes ? formatAndDivideNumber(downvotes) : "0"}
            </p>
          </div>
        </div>
      </div>

      {/* Save  */}
      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};

export default Votes;
