import LoginForm from "@/modules/login/login-form";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="py-14">
      <div
        className={clsx(
          "w-full max-w-[525px] flex flex-col items-center gap-8",
          "mx-auto bg-white rounded-[10px] border border-border",
          "pt-12 px-16 pb-24"
        )}
      >
        <img src="/assets/png/logo.png" alt="Wethtax" width={136} height={37} />

        <div>
          <div>
            <h1
              className={clsx(
                "text-2xl font-[500] leading-[36px] text-primary",
                "text-center mb-4"
              )}
            >
              Welcome back!
            </h1>

            <p className={clsx("leading-[21px] text-[#898989] text-center")}>
              Are you new to Wethtax?{" "}
              <Link to="/register?step=2" className="font-[600] text-[#7879C5]">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <LoginForm />

        {/* <div className="w-full flex flex-col items-center gap-4">
          <Link to="/forgot-tax-id" className="font-[500] text-[#7879C5]">
            Forgot Tax ID Number
          </Link>

          <Link to="/create-tax-id" className="font-[500] text-[#7879C5]">
            Create New Tax ID Number
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
