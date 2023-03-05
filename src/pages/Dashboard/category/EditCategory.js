import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "reactstrap";
import Home from "../home/Home";
import "./category.css";
import {
  updateCategory
} from "../../../redux/reducers/CategoryReducer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const categoryId = params.id;


  const category = useSelector((state) =>
    state.category.categoryList.find((category) => category._id === categoryId)
  );




  const schemaValidation = Yup.object({
    name: Yup.string()
      .max(100, "Tên loại sản phẩm ít hơn 100 kí tự")
      .min(3, "Tên loại sản phẩm ít nhất 4 kí tự")
      .required("Tên loại sản phẩm không được rỗng"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    // watch,
    reset,

  } = useForm({
    resolver: yupResolver(schemaValidation),
    mode: "onChange",
  });


  const onSubmit = async (values) => {

    if (isValid) {
      dispatch(updateCategory(values));
      reset({
        name: "",
      });
      toast.success('Chỉnh sửa loại sản phẩm thành công')

      setTimeout(() => {
        navigate("/category");
      }, 500)

    }
  };

  return (
    <Home name='Edit category'>
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
                          <label htmlFor="name">Loại sản phẩm</label>
                          <input
                            id="name"
                            className="form-control mb-3 mt-1"
                            defaultValue={category.name}
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
                      defaultValue={categoryId}
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
                      to={"/category"}
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

export default EditCategory;
