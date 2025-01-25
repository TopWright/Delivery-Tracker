import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProtectedRoutesContext } from "../context/ProtectedRoutes";
import { Loader } from "../helpers/Functions";

interface LoginValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useProtectedRoutesContext();

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const validate = yup.object().shape({
    email: yup.string().email("Please provide a valid email").required("Please provide a valid email"),
    password: yup.string().required("Please provide password"),
  });

  const handleLogin = (values: LoginValues) => {
    setIsLoading(true);

    // Simulate an API call or login action
    setTimeout(() => {
      alert(`Welcome! You are logged in as ${values.email}`);
      setUser({
        status: 'isLoggedIn',
        data: values
      }); // Set user as logged in (1)
      navigate("/dashboard"); // Navigate to dashboard
      setIsLoading(false);
    }, 1000); // Simulate loading time (1 second)
  };

  return (
    <div className="form-content">
      <h2 className="text-[2.4rem] font-[700] text-[#001F3C] mb-3">Welcome!</h2>
      <p className="text-[1.6rem] font-[400] text-[#001F3C]">Please log in to continue.</p>
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={handleLogin} // Pass the handleLogin function here
      >
        {({ values, handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <form className="mt-28" onSubmit={handleSubmit}>
            <div className="flex flex-col form-group mb-14">
              <label htmlFor="email" className="mb-3 text-2xl">
                Email Address
              </label>
              <input
                type="text"
                className={`bg-[#f2f2f2] p-5 w-[40rem] border rounded-lg shadow text-2xl ${touched.email && !errors.email ? "b-green" : touched.email && errors.email ? "b-red" : ""
                  }`}
                name="email"
                placeholder="Enter your Email Address"
                onChange={handleChange}
                value={values.email}
                onBlur={handleBlur}
                id="email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500  text-[1.4rem]" />
            </div>

            <div className="flex flex-col form-group">
              <label htmlFor="password" className="mb-3 text-2xl">
                Password
              </label>
              <input
                className={`bg-[#f2f2f2] p-5 w-[40rem] border rounded-lg shadow text-2xl ${touched.password && !errors.password ? "b-green" : touched.password && errors.password ? "b-red" : ""
                  }`}
                type={visible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                id="password"
                placeholder="Enter your password"
              />
              {visible ? (
                <BsEye className="view-pwd" size={20} onClick={() => setVisible((prevState) => !prevState)} />
              ) : (
                <BsEyeSlash className="view-pwd" size={20} onClick={() => setVisible((prevState) => !prevState)} />
              )}
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500  text-[1.4rem]" />

            <button
              type="submit"
              className=" mt-20 bg-zinc-600 p-6 w-[40rem] text-white rounded-lg shadow text-2xl font-bold"
              disabled={isLoading}
            >
              {isLoading ? <Loader white={true} /> : 'Continue'}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
