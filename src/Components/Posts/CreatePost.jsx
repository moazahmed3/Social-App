import { useContext, useEffect, useState } from "react";
import { Avatar, FileInput, Textarea } from "flowbite-react";
import { HiOutlinePhotograph, HiX } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../Shared/ValidationError/ValidationError";
import AppButton from "../Shared/AppButton/AppButton";
import { PostsAPI } from "../../services/posts";
export default function CreatePost() {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const schemaCreatePost = z.object({
    body: z.string().trim().min(1, "Body is required"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      body: "",
    },
    resolver: zodResolver(schemaCreatePost),
  });

  async function onSubmit({ body }) {
    try {
      const formData = new FormData();

      formData.append("body", body);
      if (image) {
        formData.append("image", image);
      }

      const data = await PostsAPI.createPosts(formData);

      if (data.success) {
        reset();
        removeImage();
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
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
      onSubmit={handleSubmit(onSubmit)}
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
          disable={isSubmitting}
          className={` dark:bg-white dark:text-slate-800 dark:hover:text-amber-50`}
          loading={isSubmitting}
        >
          Create Post
        </AppButton>
      </div>
    </form>
  );
}
