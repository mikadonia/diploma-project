import { useForm } from "react-hook-form";
import { REGISTRATION_URL } from "../config/consts";
import { Link } from "react-router-dom";
import { useState } from "react";
import cn from "classnames";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { registration } from "../store/slices/user.actionCreator";

type SignupForm = {
  email: string;
  password: string;
  passwordRepeat: string;
};

const Signup = () => {
  const dispatch = useAppDispatch();
  const {} = useAppSelector(state => state.user)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: "onChange",
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isPasswordRepeatHidden, setIsPasswordRepeatHidden] = useState(true);

  const password = watch("password");

  const onSubmit = ({ email, password, passwordRepeat }: SignupForm) => {
    if (password === passwordRepeat) {
      dispatch(
        registration({
          email,
          password,
        })
      );
    }
  };

  return (
    <section className="container forms">
      <div className="form signup">
        <div className="form-content">
          <header>Sign up</header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field input-field">
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder=" Enter your email here"
                className="input"
              />
            </div>

            <div className="field input-field">
              <input
                {...register("password")}
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Enter your password here"
                className="password"
              />
              <i
                className={cn(
                  "bx eye-icon",
                  isPasswordHidden ? "bx-hide" : "bx-show"
                )}
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
              ></i>
            </div>

            <div className="field input-field">
              <input
                {...register("passwordRepeat", {
                  validate: (passwordRepeat) => passwordRepeat === password,
                })}
                type="password"
                placeholder="Enter your password here"
                className="password"
              />
              <i
                className={cn(
                  "bx eye-icon",
                  isPasswordRepeatHidden ? "bx-hide" : "bx-show"
                )}
                onClick={() =>
                  setIsPasswordRepeatHidden(!isPasswordRepeatHidden)
                }
              ></i>
            </div>

            <div className="form-link">
              <span>
                Already have an account?
                <Link to="/" className="link login-link">
                  Sign in
                </Link>
              </span>
            </div>

            <div className="field-btn">
              <Button
                disabled={!!errors.email || !!errors.passwordRepeat}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
