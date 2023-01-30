import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "reactstrap";
import Home from "../home/Home";
import "./product.css";
import { getCategory } from "../../../redux/reducers/CategoryReducer";

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { addProduct } from "../../../redux/reducers/ProductReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const category = useSelector((state) => state.category.categoryList);
    const schemaValidation = Yup.object({
        title: Yup.string()
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
        // category: Yup.string().required("Ảnh không được rỗng"),
    })
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
        console.log("onSubmit ~ values", values);
        if (isValid) {
            dispatch(addProduct(values))
            console.log("send data to backend");
            // after successfuly submitted
            // then reset form
            reset({
                title: "",
                price: "",
                desc: "",
                image01: "",
                image02: "",
                image03: "",
            });
            toast.success('Thêm loại sản phẩm thành công')

            setTimeout(() => {
                navigate("/product");
            }, 100)

        }


    }

    useEffect(() => {
        dispatch(getCategory());
    }, [dispatch]);


    return (
        <Home>
            <div id="page-wrapper">
                <Row className=" me-0">
                    <div className="col-lg-12 ">
                        <h1 className="page-header">Add Product</h1>
                    </div>
                </Row>

                <Col xs="12">
                    <div className="panel panel-info">
                        <div className="panel-heading fs-4">Form</div>
                        <div className="panel-body">
                            <div className="px-3 align-items-center pb-2">
                                <Col xs="12">
                                    <Form
                                        enctype="multipart/form-data"
                                        autoComplete="off"
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <Row>
                                            <Col xs="6">
                                                <div className="form-group mt-4">
                                                    <label htmlFor="title">Tên sản phẩm</label>
                                                    <input
                                                        id="title"
                                                        className="form-control mb-3 mt-1"
                                                        {...register("title")}
                                                    />
                                                    {errors?.title && (
                                                        <div className="text-danger">{errors.title?.message}</div>
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
                                                        <div className="text-danger">{errors.price?.message}</div>
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
                                                <div className="text-danger">{errors.desc?.message}</div>
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
                                                        {...register("image01")}
                                                    />
                                                    {errors?.image01 && (
                                                        <div className="text-danger">{errors.image01?.message}</div>
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
                                                        {...register("image02")}
                                                    />
                                                    {errors?.image02 && (
                                                        <div className="text-danger">{errors.image02?.message}</div>
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
                                                        {...register("image03")}
                                                    />
                                                    {errors?.image03 && (
                                                        <div className="text-danger">{errors.image03?.message}</div>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="form-group mt-4">
                                            <label >Tên loại sản phẩm</label>
                                            <select
                                                {...register("category")}
                                                className="form-control mb-3 mt-1"
                                            >
                                                {category.map((items, index) => {
                                                    return <option value={items.name}>{items.name}</option>;
                                                })}
                                            </select>
                                            {/* {formik.touched.category && formik.errors.category ? (
                                                <div className="text-danger">{formik.errors.category}</div>
                                            ) : null} */}
                                        </div>
                                        <input
                                            className="form-control"
                                            name="id"
                                            defaultValue
                                            type="hidden"
                                        />
                                        <button type="submit" className="btn btn-primary me-2">
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

export default AddProduct;
