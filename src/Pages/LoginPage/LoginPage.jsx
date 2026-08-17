import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import ValidationError from "../../Components/Shared/ValidationError/ValidationError";
import AppButton from "../../Components/Shared/AppButton/AppButton";
import { useContext, useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { AuthContext } from "../../Context/AuthContext";
export default function LoginPage() {
  const { login } = useContext(AuthContext);

  const [errorApi, setErrorApi] = useState("");
  const loginSchema = z.object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must not exceed 30 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ),
  });

  const navigate = useNavigate();
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values) {
    try {
      const { data } = await axios(
        "https://route-posts.routemisr.com/users/signin",
        {
          method: "POST",
          data: values,
        },
      );
      if (data.success) {
        localStorage.setItem("token", data.data.token);
        login(data.data.token);
        setErrorApi("");
        navigate("/");
      }
    } catch (error) {
      setErrorApi(error.response.data?.message || "Error from Server");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-6/12 lg:max-w-4/12  mx-auto p-10  my-10 bg-white shadow-lg rounded-2xl border dark:bg-slate-900 border-slate-300"
    >
      <h1 className="text-4xl text-center font-bold mb-3 text-slate-800 dark:text-amber-50">
        Login
      </h1>

      {/* input Email */}
      <div className="flex flex-col gap-y-2 mb-4">
        <Label htmlFor="email1">Your Email</Label>
        <TextInput
          {...register("email")}
          id="email1"
          type="email"
          placeholder="example@gmail.com"
        />
        <ValidationError error={errors.email?.message} />
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

      <AppButton
        disable={isSubmitting}
        className={`mx-auto  mt-10 dark:bg-white dark:text-slate-800 dark:hover:text-amber-50`}
        loading={isSubmitting}
      >
        Login
      </AppButton>

      {errorApi && (
        <Alert className="mt-5" color="failure" icon={HiInformationCircle}>
          {errorApi}
        </Alert>
      )}
    </form>
  );
}
