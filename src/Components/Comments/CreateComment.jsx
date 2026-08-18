import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Textarea } from "flowbite-react";

import { HiPaperAirplane } from "react-icons/hi";

import useCreateComment from "../../hooks/useCreateComment";
import useUpdateComment from "../../hooks/useUpdateComment";

import ValidationError from "../Shared/ValidationError/ValidationError";
import AppButton from "../Shared/AppButton/AppButton";

import { commentSchema } from "../../schemas/comment.schema";

export default function CreateComment({ postId, mood = "create", commentId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(commentSchema),
  });

  const { mutate: createComment, isPending: isCommentCreating } =
    useCreateComment(postId);

  const { mutate: updateComment, isPending: isCommentUpdating } =
    useUpdateComment();

  const isPending = isCommentCreating || isCommentUpdating;

  function onSubmit(data) {
    const formData = new FormData();

    formData.append("content", data.content);

    // ================= CREATE COMMENT =================
    if (mood === "create") {
      createComment(formData, {
        onSuccess: () => {
          reset();
        },
      });

      return;
    }

    // ================= UPDATE COMMENT =================
    if (mood === "update") {
      updateComment(
        {
          postId,
          commentId,
          formData,
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );

      return;
    }

    // ================= REPLY =================
    if (mood === "reply") {
      /*
        هنا بعد ما تعمل useCreateReply:

        createReply(
          {
            commentId,
            formData,
          },
          {
            onSuccess: () => {
              reset();
            },
          }
        );
      */
      console.log("Create reply:", commentId, data);
    }
  }

  const placeholder =
    mood === "update"
      ? "Update your comment..."
      : mood === "reply"
        ? "Write a reply..."
        : "Write a comment...";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-start gap-2">
        {/* Input */}
        <div className="flex-1">
          <Textarea
            placeholder={placeholder}
            disabled={isPending}
            {...register("content")}
            className="min-h-[50px] resize-none"
          />

          {errors.content && <ValidationError error={errors.content.message} />}
        </div>

        {/* Submit */}
        <AppButton
          type="submit"
          disable={isPending}
          loading={isPending}
          className="mt-1 rounded-full px-3 py-2"
        >
          <HiPaperAirplane className="rotate-90 text-lg" />
        </AppButton>
      </div>
    </form>
  );
}
