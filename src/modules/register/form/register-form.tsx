import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password";
import { Select } from "@/components/ui/select";
import { TAXPAYERS } from "@/constant/taxpayers";
import { useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSend } from "@/hooks/use-send";
import { useStore } from "@/store";

type FormValues = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  taxpayerType: string;
  agree: boolean;
};

type RegisterPayload = {
  email: string;
  password1: string;
  password2: string;
  phone: string;
  user_type: string;
};

export function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      taxpayerType: "",
      agree: false,
    },
    mode: "onBlur",
  });

  const terms = watch("agree");
  const passwordValue = watch("password");

  const setAuth = useStore((s) => s.setAuth);

  type RegisterResponse = {
    refresh: string;
    access: string;
    user: any;
  };

  const { mutateAsync, isPending } = useSend<RegisterPayload, RegisterResponse>(
    "/tenant/lagos/register/",
    {
      useAuth: false,
      successMessage: "Registration successful",
      onSuccess: (data) => {
        setAuth({
          token: data.access,
          refresh: data.refresh,
          details: data.user,
        });

        reset();

        if (data?.user?.user_type === "Individual") {
          navigate("/individual-profile");
        } else {
          navigate("/business-profile");
        }
      },
    }
  );

  const onSubmit = async (data: FormValues) => {
    const payload: RegisterPayload = {
      email: data.email,
      password1: data.password,
      password2: data.confirmPassword,
      phone: data.phone,
      user_type: data.taxpayerType,
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
        <Input
          type="tel"
          placeholder="Phone Number"
          error={errors.phone?.message}
          {...register("phone", {
            required: "Phone number is required",
            minLength: { value: 10, message: "Phone number is too short" },
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

      <div>
        <PasswordInput
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) =>
              val === passwordValue || "Passwords do not match",
          })}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="taxpayerType"
          rules={{ required: "Please select taxpayer type" }}
          render={({ field: { value, onChange } }) => (
            <Select
              options={TAXPAYERS}
              placeholder="Type of Taxpayer"
              value={value}
              onChange={onChange}
              aria-invalid={!!errors.taxpayerType}
              error={errors.taxpayerType?.message}
            />
          )}
        />
      </div>

      <div>
        <Controller
          control={control}
          name="agree"
          rules={{ validate: (v) => v || "You must accept the terms" }}
          render={({ field: { value, onChange } }) => (
            <Checkbox
              checked={value}
              onCheckedChange={onChange}
              error={errors.agree?.message}
            >
              I agree to Wethtax{" "}
              <Link to="/terms" className="text-[#5D5EBA]">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#5D5EBA]">
                Privacy Policy
              </Link>
            </Checkbox>
          )}
        />
      </div>

      <Button
        className="w-full"
        size="xl"
        type="submit"
        disabled={isSubmitting || isPending || !terms}
      >
        {isPending ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
