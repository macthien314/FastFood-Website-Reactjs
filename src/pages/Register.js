import React from "react";
import Helmet from "../components/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { registerSuccess } from "../redux/reducers/authReducer";
import { toast } from "react-toastify";
const Register = () => {
  const navigate = useNavigate();
  const schema = yup.object({
    username: yup
    .string()
    .required("This field is required")
    .min(6, "username must be 6 character "),
    email: yup.string().email("").required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Password must be 6 character "),
  });
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors,isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    if (isValid) {
      dispatch(registerSuccess(values));
      reset({

      });
      toast.success('Đăng ký thành công');
      navigate("/login");

    }
  };




  return (
    <Layout>
    <Helmet title="Signup">
      <CommonSection title="Signup" />
      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12" className="m-auto text-center">
              <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__group">
                  <input
                    type="text"
                    placeholder="User Name"
                    {...register("username")}
           
                  />
                    {errors?.username && (
                      <div className="text-danger">{errors.username?.message}</div>
                    )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    placeholder="Email"
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
                    required
                    {...register("password")}
                    />

                    {errors?.password && (
                      <div className="text-danger">{errors.password?.message}</div>
                    )}
                </div>
                <input
                    type="hidden"
                    value='https://res.cloudinary.com/drayatc08/image/upload/v1677931922/fastfood/user_l4jdcu.png'
                    {...register("image")}
                    />
                <button type="submit" className="addTOCart__btn">
                  Sign Up
                </button>
              </form>
              <Link to="/login">Already have an account? Login</Link>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
    </Layout>
  );
};

export default Register;
