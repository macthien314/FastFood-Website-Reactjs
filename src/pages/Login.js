import React, { useRef } from "react";
import Helmet from "../components/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/Layout";
// import useToggleValue from "../hooks/useToggleValue";
import { login } from "../redux/reducers/authReducer";
import { useEffect } from "react";

const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.auth.isLoggedIn);
  const schema = yup.object({
    email: yup
      .string()
      .email("phải có định dạng @gmail.com")
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Password must be 6 character "),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  // const { value: showPassword, handleToggleValue: handleTogglePassword } =
  //   useToggleValue();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    // const checkUser = user.filter((item)=> item.email === values.email);

    if (isValid) {
      dispatch(login(values));
      reset({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <Layout>
      <Helmet title="Login">
        <CommonSection title="Login" />
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form__group">
                    <input
                      type="email"
                      placeholder="Email"
                      ref={loginNameRef}
                      {...register("email")}
                    />

                    {errors?.email && (
                      <div className="text-danger">{errors.email?.message}</div>
                    )}
                  </div>

                  <div className="form__group mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      ref={loginPasswordRef}
                      {...register("password")}
                    />

                    {errors?.password && (
                      <div className="text-danger">
                        {errors.password?.message}
                      </div>
                    )}

                    <Link to="/recovery"  className="mt-3 text-end d-block fs-7">
                      Forgot Password?
                    </Link>
                  </div>

                  <button type="submit" className="addTOCart__btn">
                    Login
                  </button>
                </form>

                <Link to="/register">
                  Don't have an account? Create an account
                </Link>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </Layout>
  );
};

export default Login;
