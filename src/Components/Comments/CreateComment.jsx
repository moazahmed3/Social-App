import { useForm } from "react-hook-form";

import useCreateComment from "../../hooks/useCreateComment";
import ValidationError from "../Shared/ValidationError/ValidationError";
import { Textarea } from "flowbite-react";
import AppButton from "../Shared/AppButton/AppButton";
import { HiPaperAirplane } from "react-icons/hi";

export default function CreateComment({ postId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const { mutate: createComment, isPending } = useCreateComment(postId);

  function onSubmit(data) {
    const formData = new FormData();

    formData.append("content", data.content);

    createComment(formData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex  flex-col gap-2">
      <div className="flex  gap-5 flex-col   ">
        <Textarea
          placeholder="Write a comment..."
          disabled={isPending}
          {...register("content", {
            required: "Comment cannot be empty",
            minLength: {
              value: 1,
              message: "Comment cannot be empty",
            },
          })}
          className=" h-14 overflow-y-auto"
        />
        <div className="flex justify-between items-center">
          {errors.content && (
            <ValidationError error={errors.content?.message} />
          )}
          <AppButton
            disable={isPending}
            className={`ms-auto py-1  dark:bg-white dark:text-slate-800 dark:hover:text-amber-50`}
            loading={isPending}
          >
            <HiPaperAirplane className="text-lg rotate-90" />
          </AppButton>
        </div>
      </div>
    </form>
  );
}
