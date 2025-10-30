import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password";
import { useSend } from "@/hooks/use-send";
import { useStore } from "@/store";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  refresh: string;
  access: string;
  user: any;
};

const LoginForm = () => {
  const navigate = useNavigate();
  const setAuth = useStore((s) => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { mutateAsync, isPending } = useSend<LoginPayload, LoginResponse>(
    "/tenant/lagos/login/",
    {
      useAuth: false,
      successMessage: "Login successful",
      onSuccess: (data) => {
        setAuth({
          token: data.access,
          refresh: data.refresh,
          details: data.user,
        });

        reset();

        if (
          data?.user?.user_type === "Individual" &&
          !data?.user?.profile?.tax_payer_id
        ) {
          navigate("/individual-profile");
        } else if (
          data?.user?.user_type === "Company" &&
          !data?.user?.profile?.tax_payer_id
        ) {
          navigate("/business-profile");
        } else {
          navigate("/dashboard");
        }
      },
    }
  );

  const onSubmit = async (values: FormValues) => {
    const payload: LoginPayload = {
      email: values.email,
      password: values.password,
    };

    await mutateAsync(payload);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <Input
          type="email"
          placeholder="Email Address"
          error={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email",
            },
          })}
        />
      </div>

      <div>
        <PasswordInput
          placeholder="Password"
          error={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Minimum 8 characters" },
          })}
        />
      </div>

      <Link to="/forgot-password" className="text-sm text-[#414141]">
        Forgot Password
      </Link>

      <Button
        className="w-full"
        size="xl"
        type="submit"
        disabled={isSubmitting || isPending}
      >
        {isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
};

export default LoginForm;
