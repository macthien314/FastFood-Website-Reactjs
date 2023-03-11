import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet';
import Layout from '../components/Layout';
import CommonSection from '../components/UI/common-section/CommonSection';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../redux/reducers/authReducer';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const schema = yup.object({
      email: yup.string().email("phải có định dạng @gmail.com").required("This field is required"),
    
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
        console.log('values',values)
      if (isValid) {
  
        dispatch(forgotPassword(values));
        reset({
          email: '',
        });

        setTimeout(()=>{
          navigate("/reset_password");
        },2000)
  
      }
    };
  
   
  
  
    return (
        <Layout>
        <Helmet title="Reset Password">
          <CommonSection title="Reset Password" />
          <section>
            <Container>
              <Row>
              
                <Col lg="6" md="6" sm="12" className="m-auto text-center">
                  <form className="form mb-5" onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="">Reset Password</h4>
                  <p className="fs-7">Please enter the your email use to sign in</p>
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
  
                   
  
                    <button type="submit" className="addTOCart__btn w-75 py-2">
                      Next
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

export default ForgotPassword;