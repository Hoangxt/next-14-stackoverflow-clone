"use server";
import { connectToDatabase } from "../db/mongoose";
// db models
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";
import Question from "@/database/question.model";
import User from "@/database/user.model";
// type
import {
  AnswerVoteParams,
  CreateAnswerParams,
  DeleteAnswerParams,
  GetAnswersParams,
} from "./shared.types";
// cache
import { revalidatePath } from "next/cache";

export const createAnswer = async (params: CreateAnswerParams) => {
  try {
    connectToDatabase();
    // get value from frontend
    const { author, content, path, question } = params;

    const newAnswer = await Answer.create({
      author,
      content,
      question,
    });

    // add the answer to the question answers array
    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: {
        answers: newAnswer._id,
      },
    });

    // ? add interaction

    await Interaction.create({
      user: author,
      action: "answer",
      question,
      tags: questionObject.tags,
      answer: newAnswer._id,
    });

    //  increase author's reputation +10 points for answering a question
    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

    revalidatePath(path);

    return newAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAnswers = async (params: GetAnswersParams) => {
  try {
    connectToDatabase();
    const { questionId, sortBy, page = 1, pageSize = 10 } = params;

    // pagination
    const skipAmount = (page - 1) * pageSize;

    let sortOptions = {};

    switch (sortBy) {
      case "highestUpvotes":
        sortOptions = { upvotes: -1 };
        break;
      case "lowestUpvotes":
        sortOptions = { upvotes: 1 };
        break;
      case "recent":
        sortOptions = { createdAt: -1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id clerkId name picture")
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalAnswer = await Answer.countDocuments({
      question: questionId,
    });

    const isNext = totalAnswer > skipAmount + answers.length;

    return { answers, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const upvoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase();

    const { answerId, userId, hasUpVoted, path, hasDownVoted } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("No Answer found");
    }

    //  increment author's reputation +2 points for upvoting an answer
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasUpVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downVoteAnswer = async (params: AnswerVoteParams) => {
  try {
    connectToDatabase();

    const { answerId, userId, hasUpVoted, path, hasDownVoted } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    const answer = await Answer.findByIdAndUpdate(answerId, updateQuery, {
      new: true,
    });
    if (!answer) {
      throw new Error("No answer found");
    }

    //  decrease author's reputation

    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownVoted ? -10 : 10 },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
  try {
    connectToDatabase();
    const { answerId, path } = params;

    const answer = await Answer.findById(answerId);
    if (!answer) {
      throw new Error("No answer found");
    }

    await answer.deleteOne({ _id: answerId });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: answerId } }
    );
    await Interaction.deleteMany({ answer: answerId });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
