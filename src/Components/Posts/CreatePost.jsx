import { useContext, useEffect, useState } from "react";
import { Avatar, FileInput, Textarea } from "flowbite-react";
import { HiOutlinePhotograph, HiX } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../Shared/ValidationError/ValidationError";
import AppButton from "../Shared/AppButton/AppButton";
import { PostsAPI } from "../../services/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { schemaCreatePost } from "../../schemas/post.schema";
export default function CreatePost() {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      body: "",
    },
    resolver: zodResolver(schemaCreatePost),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: onSubmit,
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["userPosts"] });
      reset();
      removeImage();
    },
    onError: (error) => {
      console.log("Error", error.message);
    },
  });

  async function onSubmit({ body }) {
    const formData = new FormData();

    formData.append("body", body);
    if (image) {
      formData.append("image", image);
    }

    return await PostsAPI.createPosts(formData);
  }

  function handleImage(e) {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function removeImage() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImage(null);
    setPreview("");
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <form
      onSubmit={handleSubmit(mutate)}
      className="shadow-lg border border-gray-300 rounded-2xl p-6 flex flex-col gap-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Avatar
          img={user?.photo || "https://i.pravatar.cc/150?img=12"}
          rounded
        />

        <div>
          <h2 className="font-semibold">{user?.name || "Moaz Ahmed"}</h2>

          <p className="text-sm text-gray-500">Share what's on your mind...</p>
        </div>
      </div>

      {/* Body */}
      <Textarea
        rows={5}
        placeholder="What's happening?"
        className="resize-y max-h-60 placeholder:text-gray-400"
        {...register("body")}
      />
      <ValidationError error={errors.body?.message} />

      {/* Preview */}
      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full rounded-xl max-h-125 object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute top-3 cursor-pointer right-3 bg-red-600 text-white rounded-full p-2 hover:bg-red-700"
          >
            <HiX size={18} />
          </button>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center">
        <label className="cursor-pointer">
          <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700">
            <HiOutlinePhotograph size={22} />
            <span>Add Photo</span>
          </div>

          <FileInput
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />
        </label>

        <AppButton
          disable={isPending}
          className={` dark:bg-white dark:text-slate-800 dark:hover:text-amber-50`}
          loading={isPending}
        >
          Create Post
        </AppButton>
      </div>
    </form>
  );
}
