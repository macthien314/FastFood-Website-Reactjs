import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Helmet from "../components/Helmet";
import Layout from "../components/Layout";
import CommonSection from "../components/UI/common-section/CommonSection";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import {  resetPassword } from "../redux/reducers/authReducer";

const ResetPassword = () => {
  const navigate = useNavigate();
  const schema = yup.object({
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
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    console.log("values", values);
    if (isValid) {
      dispatch(resetPassword(values));
      reset({
        password: "",
        id: "",
      });

      setTimeout(()=>{
        navigate("/login");
      },2000)

    }
  };

  return (
    <Layout>
      <Helmet title="Set New Password">
        <CommonSection title="Set New Password" />
        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12" className="m-auto text-center">
                <form className="form mb-4" onSubmit={handleSubmit(onSubmit)}>
                  <h3 className="mb-3">Set new password</h3>
                  <p className="fs-7">
                    Your password must be between 6-16 characters, contain at
                    least one lowercase letter (a-z), one uppercase letter
                    (A-Z), one number (0-9), and one symbol.
                  </p>
                  <div className="form__group">
                    <input
                      type="password"
                      placeholder="Password"
                      {...register("password")}
                    />

                    {errors?.password && (
                      <div className="text-danger">
                        {errors.password?.message}
                      </div>
                    )}
                  </div>

              

                  <div className="form__group">
                    <input
                      type="text"
                      placeholder="Code Verify"
                      {...register("id")}
                    />
                  </div>

                  <button type="submit" className="addTOCart__btn w-75 py-2">
                    CONFIRM
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

export default ResetPassword;
