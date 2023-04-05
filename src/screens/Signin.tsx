import { useForm } from "react-hook-form";
import { LOGIN_URL } from "../config/consts";
import { Link } from "react-router-dom";
import { Button } from "../components";

type LoginForm = {
  email: string;
  password: string;
};

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Sign in</header>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field input-field">
              <input
                {...register("email")}
                type="email"
                placeholder=" Enter your email here"
                className="input"
              />
            </div>

            <div className="field input-field">
              <input
                {...register("password")}
                type="password"
                placeholder=" Enter your password here"
                className="password"
              />

              <i className="bx bx-hide eye-icon"></i>
            </div>

            <div className="form-link">
              <span>
                Have no account?
                <Link to="/signup" className="link login-link">
                  Sign up
                </Link>
              </span>
            </div>

            <div className="field-btn">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signin;
