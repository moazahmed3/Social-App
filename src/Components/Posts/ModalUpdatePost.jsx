import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { HiCamera, HiX } from "react-icons/hi";
import { useForm } from "react-hook-form";

import useUpdatePost from "../../hooks/useUpdatePost";
import AppButton from "../Shared/AppButton/AppButton";

export default function ModalUpdatePost({ post, open, onClose }) {
  const { mutate: updatePost, isPending } = useUpdatePost();

  const [preview, setPreview] = useState(post?.image || "");

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      body: "",
      image: null,
    },
  });

  // =========================
  // Image Register
  // =========================

  const imageRegister = register("image");

  // =========================
  // Sync Post Data
  // =========================

  useEffect(() => {
    if (!open || !post) return;

    reset({
      body: post.body || "",
      image: null,
    });

    setPreview(post.image || "");
  }, [open, post, reset]);

  // =========================
  // Image Change
  // =========================

  function handleImageChange(e) {
    // Important:
    // Let React Hook Form receive the file
    imageRegister.onChange(e);

    const file = e.target.files?.[0];

    if (!file) return;

    // Remove old blob URL
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    // Create new preview
    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  }

  // =========================
  // Remove Image
  // =========================

  function removeImage() {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview("");

    // Remove image from React Hook Form
    setValue("image", null);

    // Clear input value
    const input = document.getElementById("image");

    if (input) {
      input.value = "";
    }
  }

  // =========================
  // Submit
  // =========================

  function onSubmit(data) {
    if (!post?._id) return;

    const formData = new FormData();

    formData.append("body", data.body);

    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    } else if (!preview && post.image) {
      formData.append("removeImage", "true");
    }

    updatePost(
      {
        postId: post._id,
        formData,
      },
      {
        onSuccess: handleClose,
      },
    );
  }
  // =========================
  // Close Modal
  // =========================

  function handleClose() {
    if (isPending) return;

    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    reset({
      body: "",
      image: null,
    });

    setPreview("");

    onClose();
  }

  // =========================
  // Cleanup
  // =========================

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Modal dismissible={!isPending} show={open} onClose={handleClose} size="lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Edit Post</ModalHeader>

        <ModalBody className="max-h-[70vh] overflow-y-auto">
          <div className="space-y-5">
            {/* Body */}

            <div>
              <Label htmlFor="body" value="What's on your mind?" />

              <Textarea
                id="body"
                rows={5}
                placeholder="Write something..."
                disabled={isPending}
                {...register("body")}
              />
            </div>

            {/* Image */}

            <div>
              <Label htmlFor="image" value="Post Image" />

              {preview ? (
                <div className="relative mt-2">
                  <img
                    src={preview}
                    alt="Post preview"
                    className="max-h-[45vh] w-full rounded-xl object-cover"
                  />

                  <button
                    type="button"
                    disabled={isPending}
                    onClick={removeImage}
                    className="absolute right-3 top-3 cursor-pointer rounded-full bg-red-600 p-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <HiX size={18} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="mt-2 flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 transition hover:bg-gray-50"
                >
                  <HiCamera size={40} />

                  <p className="mt-2 font-medium">Add Image</p>

                  <p className="text-sm text-gray-500">PNG, JPG or JPEG</p>
                </label>
              )}

              <FileInput
                id="image"
                className="hidden"
                disabled={isPending}
                {...imageRegister}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="py-5">
          <Button
            type="button"
            color="alternative"
            disabled={isPending}
            onClick={handleClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          <AppButton loading={isPending} disable={isPending}>
            Update Post
          </AppButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
