import clsx from "clsx";
import { Link } from "react-router-dom";
import { RegisterForm } from "./form/register-form";

const Profile = () => {
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
              Sign up to create an account
            </h1>

            <p className={clsx("leading-[21px] text-[#898989] text-center")}>
              Already have an account?{" "}
              <Link to="/login" className="font-[600] text-[#7879C5]">
                Login
              </Link>
            </p>
          </div>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
};

export default Profile;
