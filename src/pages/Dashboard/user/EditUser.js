import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "reactstrap";
import Home from "../home/Home";
import "./user.css";
import {
  updateUser,

} from "../../../redux/reducers/UserReducer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleList = [
    { role: 'admin' },
    { role: 'user' },
    { role: 'publisher' },
  ]


  const params = useParams();
  const userId = params.id;

  const user = useSelector((state) => state.user.userList.find((user) => user._id === userId));
  const isSuccess = useSelector((state) => state.user.isSuccess);


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
    defaultValues: {
      username: `${user.username}`,
      email: `${user.email}`,
      password: `${user.password}`,
      role: `${user.role}`,
      image: `${user.image}`,

    },
  });
  const [image, setImage] = useState(user.image);
  const onSubmit = async (values) => {
    if (isValid) {
      const formData = new FormData();
      formData.append('image', image)
      formData.append('username', values.username)
      formData.append('email', values.email)
      formData.append('role', values.role)
      formData.append('password', values.password)
      formData.append('id', values.id)
      dispatch(updateUser(formData));
      reset({
        username: "",
        email: "",
        password: "",
        role: "",
        image:''
      });
      
    }
  };

  useEffect(() => {
    if (isSuccess) {
    
        navigate('/users')
    }
  }, [isSuccess,navigate])



  return (
    <Home name='Edit Users'>
      <div id="page-wrapper">
        <Col xs="12 pt-5">
          <div className="panel panel-info pt-5">
            <div className="panel-heading fs-4">Form</div>
            <div className="panel-body">
              <div className="px-3 align-items-center pb-2">
                <Col xs="12">
                  <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
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

                    </Row>
                    <Row>
                      <Col xs="4">
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
                      <Col xs="4">
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
                      <Col xs="4">
                        <div className="form-group mt-6">
                          <label htmlFor="image">Ảnh</label>
                          <input
                            id="image"
                            className="form-control"
                            type="file"
                            {...register("image", {
                              onChange: (e) => setImage(e.target.files[0])
                            })}
                          />
                          <img className="mt-3" style={{ width: '100px', height: '100px' }} src={user.image} alt=''></img>
                          {errors?.image && (
                            <div className="text-danger">{errors.image?.message}</div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <input
                      className="form-control"
                      defaultValue={userId}
                      type="hidden"
                      {...register("id")}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                    >
                      Submit
                    </button>
                    <Link
                      type="button"
                      to={"/users"}
                      className="btn btn-light"
                    >
                      Cancel
                    </Link>
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

export default EditUser;
