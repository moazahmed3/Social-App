import {
  Button,
  FileInput,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { HiCamera, HiX } from "react-icons/hi";
import ValidationError from "../Shared/ValidationError/ValidationError";
import AppButton from "../Shared/AppButton/AppButton";

export default function ModalUpdateImage({
  openModalUpdateImage,
  setOpenModalUpdateImage,
  removePreview,
  handleSubmit,
  onSubmit,
  photoRegister,
  handleImage,
  preview,
  errors,
  isPending,
  ref,
}) {
  return (
    <Modal
      dismissible
      show={openModalUpdateImage}
      onClose={() => {
        setOpenModalUpdateImage(false);
        removePreview();
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>Upload Profile Image</ModalHeader>

        <ModalBody>
          <div className="space-y-5">
            <Label
              htmlFor="photo"
              className="flex h-64 object-cover  cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed"
            >
              {preview ? (
                <div className="relative h-full w-full">
                  <img
                    src={preview}
                    alt=""
                    className="h-full w-full rounded-lg object-cover"
                  />

                  <button
                    type="button"
                    onClick={removePreview}
                    className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white"
                  >
                    <HiX />
                  </button>
                </div>
              ) : (
                <>
                  <HiCamera size={50} />

                  <p className="mt-3 font-semibold">Click to upload image</p>

                  <p className="text-sm text-gray-500">PNG, JPG, JPEG</p>
                </>
              )}

              <FileInput
                id="photo"
                className="hidden"
                ref={ref}
                {...photoRegister}
                onChange={handleImage}
              />
            </Label>

            <ValidationError error={errors.photo?.message} />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            color="alternative"
            type="button"
            onClick={() => {
              setOpenModalUpdateImage(false);
              removePreview();
            }}
          >
            Cancel
          </Button>

          <AppButton loading={isPending} disable={isPending}>
            Upload
          </AppButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
