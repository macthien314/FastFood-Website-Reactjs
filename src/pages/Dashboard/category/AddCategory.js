import React from "react";
import { useDispatch } from "react-redux";
import { Col, Form, Row } from "reactstrap";
import Home from "../home/Home";
import "./category.css";
import {
  addCategory,
  
} from "../../../redux/reducers/CategoryReducer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schemaValidation = Yup.object({
    name: Yup.string()
      .max(100, "Tên loại sản phẩm ít hơn 100 kí tự")
      .min(3, "Tên loại sản phẩm ít nhất 4 kí tự")
      .required("Tên loại sản phẩm không được rỗng"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid},
    reset,
  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    // console.log("onSubmit ~ values", values);
    if (isValid) {
      dispatch(addCategory(values));
      // console.log("send data to backend");
      // after successfuly submitted
      // then reset form
      reset({
        name: "",
      });
      toast.success('Thêm loại sản phẩm thành công')

      setTimeout(()=>{
        navigate("/category");
      },1000)
    
  
    }
  };

  return (
    <Home>
      <div id="page-wrapper">
        <Row className=" me-0">
          <div className="col-lg-12 ">
            <h1 className="page-header">Add Category</h1>
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
                          <label htmlFor="name">Loại sản phẩm</label>
                          <input
                            id="name"
                            className="form-control mb-3 mt-1"
                            {...register("name")}
                          />
                          {errors?.name && (
                            <div className="text-danger">
                              {errors.name?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>

                    <input
                      className="form-control"
                      name="_id"
                      defaultValue
                      type="hidden"
                    />
                    <button
                      onClick={handleSubmit}
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

export default AddCategory;
