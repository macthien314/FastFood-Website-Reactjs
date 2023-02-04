import React from "react";
import { useDispatch } from "react-redux";
import { Col, Form, Row } from "reactstrap";
import Home from "../home/Home";
import "./user.css";
import {
  addUser,

} from "../../../redux/reducers/UserReducer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser= () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleList = [
    { role: 'admin' },
    { role: 'user' },
    { role: 'manager' },
  ]


  const schemaValidation = Yup.object({
    username: Yup.string()
      .max(100, "Tên phải ít hơn 100 kí tự")
      .min(3, "Tên phải ít nhất 4 kí tự")
      .required("Tên không được rỗng"),
    email: Yup.string().email('email không hợp lệ')
      .max(100, "email phải ít hơn 100 kí tự")
      .min(3, "email ít nhất 4 kí tự")
      .required("email không được rỗng"),
    password: Yup.string()
      .max(100, "Mật khẩu ít hơn 100 kí tự")
      .min(3, "Mật khẩu ít nhất 4 kí tự")
      .required("Mật khẩu không được rỗng"),
    role: Yup.string()
      .required("Quyền không được rỗng"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    if (isValid) {
      console.log('values',values)
      dispatch(addUser(values));
      // console.log("send data to backend");
      // after successfuly submitted
      // then reset form
      reset({
        username: "",
        email: "",
        password: "",
        role: "",
      });
      toast.success('Thêm user thành công')

      setTimeout(() => {
        navigate("/users");
      }, 300)


    }
  };

  return (
    <Home>
      <div id="page-wrapper">
        <Row className=" me-0">
          <div className="col-lg-12 ">
            <h1 className="page-header">Add User</h1>
          </div>
        </Row>

        <Col xs="12">
          <div className="panel panel-info">
            <div className="panel-heading fs-4">Form</div>
            <div className="panel-body">
              <div className="px-3 align-items-center pb-2">
                <Col xs="12">
                  <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col xs="6">
                        <div className="form-group mt-4">
                          <label htmlFor="email">Email</label>
                          <input
                            id="email"
                            className="form-control mb-3 mt-1"
                            {...register("email")}
                          />
                          {errors?.email && (
                            <div className="text-danger">
                              {errors.email?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs="6">
                        <div className="form-group mt-4">
                          <label htmlFor="password">Password</label>
                          <input
                            id="password"
                            className="form-control mb-3 mt-1"
                            {...register("password")}
                          />
                          {errors?.password && (
                            <div className="text-danger">
                              {errors.password?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="6">
                        <div className="form-group mt-4">
                          <label htmlFor="username">Họ tên</label>
                          <input
                            id="username"
                            className="form-control mb-3 mt-1"
                            {...register("username")}
                          />
                          {errors?.username && (
                            <div className="text-danger">
                              {errors.username?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs="6">
                        <div className="form-group mt-4">
                          <label htmlFor="role">Quyền hạn</label>
                          <select
                            id="role"
                            className="form-control mb-3 mt-1"
                            {...register("role")}
                          >
                            {roleList.map((items, index) => {
                              return <option key={index} value={items.role}>{items.role}</option>;
                            })}
                          </select>
                          {errors?.role && (
                            <div className="text-danger">
                              {errors.role?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                    >
                      Submit
                    </button>
                    <a
                      type="button"
                      href="admin/items/"
                      className="btn btn-light"
                    >
                      Cancel
                    </a>
                  </Form>
                </Col>
              </div>
            </div>
          </div>
        </Col>
      </div>
    </Home>
  );
};

export default AddUser;
