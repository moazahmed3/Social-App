import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  TextInput,
} from "flowbite-react";

import { useForm } from "react-hook-form";
import { HiLockClosed } from "react-icons/hi";

import AppButton from "../Shared/AppButton/AppButton";
import ValidationError from "../Shared/ValidationError/ValidationError";

import useChangePassword from "../../hooks/useChangePassword";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaChangePassword } from "../../schemas/password.schema";

export default function ModalChangePassword() {
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schemaChangePassword),
  });

  const { mutate: changePassword, isPending } = useChangePassword();

  function onSubmit(data) {
    const { confirmPassword, ...passwordData } = data;
    changePassword(passwordData, {
      onSuccess: () => {
        reset();
        setOpenModal(false);
      },
    });
  }

  function handleClose() {
    if (isPending) return;

    reset();
    setOpenModal(false);
  }

  return (
    <>
      {/* Open Modal Button */}

      <Button
        className="cursor-pointer"
        color="dark"
        onClick={() => setOpenModal(true)}
      >
        <HiLockClosed className="mr-2" />
        Change Password
      </Button>

      {/* Modal */}

      <Modal
        className="overflow-y-auto"
        dismissible
        show={openModal}
        onClose={handleClose}
      >
        <ModalHeader>
          <div className="flex items-center gap-2">
            <HiLockClosed className="text-xl" />

            <span>Change Password</span>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <div className="space-y-5">
              {/* Current Password */}

              <div>
                <Label htmlFor="password" value="Current Password" />

                <TextInput
                  autoComplete="current-password"
                  id="password"
                  type="password"
                  placeholder="Enter your current password"
                  disabled={isPending}
                  {...register("password")}
                />

                <ValidationError error={errors.password?.message} />
              </div>

              {/* New Password */}

              <div>
                <Label htmlFor="newPassword" value="New Password" />

                <TextInput
                  id="newPassword"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  disabled={isPending}
                  {...register("newPassword")}
                />

                <ValidationError error={errors.newPassword?.message} />
              </div>
              {/* confirmPassword input */}
              <div>
                <Label htmlFor="confirmPassword" value="Confirm New Password" />

                <TextInput
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter your confirm Password"
                  disabled={isPending}
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                />

                <ValidationError error={errors.confirmPassword?.message} />
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-end gap-2">
            <Button
              type="button"
              color="alternative"
              className="cursor-pointer"
              disabled={isPending}
              onClick={handleClose}
            >
              Cancel
            </Button>

            <AppButton loading={isPending} disable={isPending}>
              Change Password
            </AppButton>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}
