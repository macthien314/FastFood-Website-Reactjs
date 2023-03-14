import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "reactstrap";
import Home from "../home/Home";
import "./product.css";
import { getCategory } from "../../../redux/reducers/CategoryReducer";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { getProduct } from "../../../redux/reducers/ProductReducer";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const productId = params.id;

  const category = useSelector((state) => state.category.categoryList);

  const product = useSelector((state) =>
    state.product.productList.find((product) => product._id === productId)
  );

  const schemaValidation = Yup.object({
    name: Yup.string()
      .max(100, "Tên sản phẩm ít hơn 100 kí tự")
      .min(3, "Tên sản phẩm ít nhất 4 kí tự")
      .required("Tên sản phẩm không được rỗng"),
    price: Yup.string()
      .max(100, "Giá sản phẩm phải nhỏ hơn 100")
      .min(1, "Giá sản phẩm phải lớn hơn 0")
      .required("Giá sản phẩm không được rỗng"),
    desc: Yup.string()
      .max(200, "Mô tả phải nhỏ hơn 200 kí tự")
      .min(10, "Mô tả phải ít nhất 10 kí tự")
      .required("Phải có mô tả sản phẩm"),
    image01: Yup.string().required("Ảnh không được rỗng"),
    image02: Yup.string().required("Ảnh không được rỗng"),
    image03: Yup.string().required("Ảnh không được rỗng"),
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
      name: `${product.name}`,
      price: `${product.price}`,
      desc: `${product.desc}`,
      image1: `${product.image01}`,
      image2: `${product.image02}`,
      image3: `${product.image03}`,
      category_id: `${product.category_id}`,
    },
  });
  const [image1, setImage1] = useState(product.image01);
  const [image2, setImage2] = useState(product.image02);
  const [image3, setImage3] = useState(product.image03);
  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image01", image1);
    formData.append("image02", image2);
    formData.append("image03", image3);
    formData.append("name", values.name);
    formData.append("desc", values.desc);
    formData.append("price", values.price);
    formData.append("category_id", values.category_id);

    if (isValid) {
      reset({
        name: "",
        price: "",
        desc: "",
        image01: "",
        image02: "",
        image03: "",
      });
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.put(
          `https://fastfood314.up.railway.app/api/v1/product/edit/${productId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success === true) {
          navigate("/product");
          toast.success("Sửa sản phẩm thành công");
          dispatch(getProduct());
        } else {
          toast.error("Sửa sản phẩm thất bại");
          navigate("/edit-product/{productId}");
        }

        
      } catch (error) {}
    }
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <Home name="Edit product">
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
                          <label htmlFor="name">Tên sản phẩm</label>
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
                      <Col xs="6">
                        <div className="form-group mt-4">
                          <label htmlFor="price">Giá</label>
                          <input
                            id="price"
                            className="form-control mb-3 mt-1"
                            type="string"
                            {...register("price")}
                          />
                          {errors?.price && (
                            <div className="text-danger">
                              {errors.price?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="form-group">
                      <label htmlFor="desc">Mô tả</label>
                      <textarea
                        className="form-control"
                        {...register("desc")}
                        id="desc"
                        cols="10"
                        rows="5"
                        resize="none"
                      ></textarea>
                      {errors?.desc && (
                        <div className="text-danger">
                          {errors.desc?.message}
                        </div>
                      )}
                    </div>
                    <Row>
                      <Col xs="4">
                        <div className="form-group mt-4">
                          <label htmlFor="image01">Ảnh 1</label>
                          <input
                            id="image01"
                            className="form-control"
                            type="file"
                            {...register("image01", {
                              onChange: (e) => setImage1(e.target.files[0]),
                            })}
                          />
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={product.image01}
                            alt=""
                          ></img>
                          {errors?.image01 && (
                            <div className="text-danger">
                              {errors.image01?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="form-group mt-4">
                          <label htmlFor="image02">Ảnh 2</label>
                          <input
                            id="image02"
                            className="form-control"
                            type="file"
                            {...register("image02", {
                              onChange: (e) => setImage2(e.target.files[0]),
                            })}
                          />
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={product.image02}
                            alt=""
                          ></img>
                          {errors?.image02 && (
                            <div className="text-danger">
                              {errors.image02?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col xs="4">
                        <div className="form-group mt-4">
                          <label htmlFor="image03">Ảnh 3</label>
                          <input
                            id="image03"
                            className="form-control"
                            type="file"
                            {...register("image03", {
                              onChange: (e) => setImage3(e.target.files[0]),
                            })}
                          />
                          <img
                            style={{ width: "100px", height: "100px" }}
                            src={product.image03}
                            alt=""
                          ></img>

                          {errors?.image03 && (
                            <div className="text-danger">
                              {errors.image03?.message}
                            </div>
                          )}
                        </div>
                      </Col>
                    </Row>
                    <div className="form-group mt-4">
                      <label>Tên loại sản phẩm</label>
                      {/* <select  {...register("category_id", {
                                                onChange: (e) => handleClickOption(e.target.value)
                                            })} */}

                      <select
                        {...register("category_id")}
                        className="form-control mb-3 mt-1"
                      >
                        {category.map((items, index) => {
                          return (
                            <option key={index} value={items.id}>
                              {items.name}
                            </option>
                          );
                        })}
                      </select>
                      {/* {formik.touched.category && formik.errors.category ? (
                                                <div className="text-danger">{formik.errors.category}</div>
                                            ) : null} */}
                    </div>
                    <input
                      className="form-control"
                      name="id"
                      {...register("id")}
                      type="hidden"
                    />

                    <button type="submit" className="btn btn-primary me-2">
                      Submit
                    </button>
                    <Link
                      type="button"
                      to={"/product"}
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

export default EditProduct;
