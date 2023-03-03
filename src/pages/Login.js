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
import useToggleValue from "../hooks/useToggleValue";
import { loginSuccess } from "../redux/reducers/authReducer";
import { toast } from "react-toastify";



const Login = () => {
  const loginNameRef = useRef();
  const loginPasswordRef = useRef();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userList);
  console.log('user',user)
  const schema = yup.object({
    email: yup.string().email("phải có định dạng @gmail.com").required("This field is required"),
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
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
  // const checkUser = user.filter((item)=> item.email === values.email);

    if (isValid) {
          // if(checkUser.length === 0) {
          //   toast.error('Email chưa được đăng ký');
          // }
          // else{
            dispatch(loginSuccess(values));
            reset({
              email: '',
              password: '',
            });
            toast.success('Đăng nhập thành công');
            navigate("/");
          }
         
          
        // }
       
     
  };




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

                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Password"

                      ref={loginPasswordRef}
                      {...register("password")}
                    />

                    {errors?.password && (
                      <div className="text-danger">{errors.password?.message}</div>
                    )}
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
