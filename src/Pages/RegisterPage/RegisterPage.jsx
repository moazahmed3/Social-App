import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Label, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../Components/Shared/ValidationError/ValidationError";
import AppButton from "../../Components/Shared/AppButton/AppButton";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
export default function RegisterPage() {
  const [errorApi, setErrorApi] = useState("");

  //~schema
  const registerSchema = z
    .object({
      name: z
        .string()
        .trim()
        .min(1, "Name is required")
        .min(2, "Name must be at least 2 characters")
        .max(30, "Name must not exceed 30 characters"),

      username: z
        .string()
        .trim()
        .min(1, "Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must not exceed 30 characters")
        .regex(
          /^[a-z0-9_]{3,30}$/,
          "Username can only contain letters, numbers and underscores",
        ),

      email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Invalid email address"),

      dateOfBirth: z
        .string()
        .min(1, "Date of birth is required")
        .refine((value) => !isNaN(new Date(value).getTime()), {
          message: "Invalid date",
        })
        .refine((value) => new Date(value) <= new Date(), {
          message: "Date of birth cannot be in the future",
        }),

      gender: z.enum(["male", "female"], {
        message: "Gender is required",
      }),

      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(30, "Password must not exceed 30 characters")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        ),

      rePassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: "Passwords do not match",
    });

  const navigate = useNavigate();
  const defaultValues = {
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    rePassword: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    // link between zod and react hook form
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values) {
    //! data is valid
    //~ call api

    try {
      const { data } = await axios(
        "https://route-posts.routemisr.com/users/signup",
        {
          method: "POST",
          data: values,
        },
      );
      if (data.success) {
        navigate("/");
      }
      setErrorApi("");
    } catch (error) {
      setErrorApi(error.response.data?.message || "Error in server");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4/12 mx-auto p-10  bg-white shadow-lg rounded-2xl border dark:bg-slate-900 border-slate-300"
    >
      <h1 className="text-4xl text-center font-bold mb-3 text-slate-800 dark:text-white">
        Register
      </h1>
      {/* input Name */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="name">Your Name</Label>
        <TextInput
          {...register("name")}
          id="name"
          type="text"
          placeholder="Moaz Ahmed"
        />
        <ValidationError error={errors.name?.message} />
      </div>

      {/* input username */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="username">Your username</Label>
        <TextInput
          {...register("username")}
          id="username"
          type="text"
          placeholder="Moazahmd64"
        />
        <ValidationError error={errors.username?.message} />
      </div>

      {/* input Email */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="email1">Your Email</Label>
        <TextInput
          {...register("email")}
          id="email1"
          type="text"
          placeholder="example@gmail.com"
        />
        <ValidationError error={errors.email?.message} />
      </div>

      {/* input dateOfBirth */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="dateOfBirth">Your Date Of Birth</Label>
        <TextInput {...register("dateOfBirth")} id="dateOfBirth" type="date" />
        <ValidationError error={errors.dateOfBirth?.message} />
      </div>

      {/* Gender */}

      <div className="flex my-5 flex-col  gap-4">
        <div className="flex items-center gap-2">
          <Radio
            id="male"
            name="gender"
            value="male"
            color="cyan"
            {...register("gender")}
          />
          <Label htmlFor="male">male</Label>
        </div>

        <div className="flex items-center gap-2">
          <Radio
            {...register("gender")}
            id="female"
            name="gender"
            value="female"
            color="cyan"
          />
          <Label htmlFor="female">Female</Label>
        </div>
        <ValidationError error={errors.gender?.message} />
      </div>

      {/* input password */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="password">Your password</Label>
        <TextInput
          id="password"
          type="password"
          placeholder="*****************"
          {...register("password")}
        />
        <ValidationError error={errors.password?.message} />
      </div>

      {/* input Confirm password */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="password"> Confirm password</Label>
        <TextInput
          id="password"
          type="password"
          placeholder="*****************"
          {...register("rePassword")}
        />
        <ValidationError error={errors.rePassword?.message} />
      </div>

      <AppButton
        disable={isSubmitting}
        className={`mx-auto dark:bg-white dark:text-slate-800 dark:hover:text-amber-50`}
        loading={isSubmitting}
      >
        Register
      </AppButton>
      {errorApi && (
        <Alert className="mt-5" color="failure" icon={HiInformationCircle}>
          {errorApi}
        </Alert>
      )}
    </form>
  );
}
