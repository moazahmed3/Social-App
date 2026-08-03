import { Button, Card, Label, TextInput } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { HiCamera, HiLockClosed } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
import { useForm } from "react-hook-form";

import useUpdateProfileImage from "../../hooks/useUpdateProfileImage";
import ModalUpdateImage from "./ModalUpdateImage";
import CardAbout from "./CardAbout";
import CardStats from "./CardStats";
import CardCover from "./CardCover";
import CardAvatar from "./CardAvatar";

export default function CardProfile() {
  const { user } = useContext(AuthContext);
  const [openModalUpdateImage, setOpenModalUpdateImage] = useState(false);
  const [preview, setPreview] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      photo: null,
    },
  });

  const { ref, onChange, ...photoRegister } = register("photo", {
    required: "Image is required",
  });

  const { mutate: uploadImage, isPending } = useUpdateProfileImage();

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("photo", data.photo[0]);

    uploadImage(formData, {
      onSuccess: () => {
        setOpenModalUpdateImage(false);
        removePreview();
      },
    });
  };
  function handleImage(e) {
    onChange(e);

    const file = e.target.files[0];

    if (!file) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(URL.createObjectURL(file));
  }

  function removePreview() {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview("");

    reset({
      photo: null,
    });
  }

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      {user && (
        <section className="flex flex-col gap-y-8">
          {/* Cover */}
          <CardCover cover={user.cover} />

          {/* Avatar */}

          <CardAvatar
            user={user}
            setOpenModalUpdateImage={setOpenModalUpdateImage}
          />
          {/* Stats */}
          <CardStats user={user} />

          {/* About */}
          <CardAbout user={user} />

          {/* Change Password */}

          {/* <Button className="cursor-pointer" color={"dark"}>
            Change Password
          </Button>

          <Card>
            <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold">
              <HiLockClosed />
              Change Password
            </h2>

            <form className="space-y-5">
              <div>
                <Label value="Current Password" />

                <TextInput type="password" />
              </div>

              <div>
                <Label value="New Password" />

                <TextInput type="password" />
              </div>

              <div>
                <Label value="Confirm Password" />

                <TextInput type="password" />
              </div>

              <Button>Save Password</Button>
            </form>
          </Card> */}

          {/* Upload Modal */}
          <ModalUpdateImage
            handleSubmit={handleSubmit}
            handleImage={handleImage}
            preview={preview}
            removePreview={removePreview}
            photoRegister={photoRegister}
            errors={errors}
            ref={ref}
            isPending={isPending}
            onSubmit={onSubmit}
            setOpenModalUpdateImage={setOpenModalUpdateImage}
            openModalUpdateImage={openModalUpdateImage}
          />
        </section>
      )}
    </>
  );
}
