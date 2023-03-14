import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import CommonSection from "../components/UI/common-section/CommonSection";

import { Container, Row, Col } from "reactstrap";
import ProductCard from "../components/UI/product-card/ProductCard";
import ReactPaginate from "react-paginate";
import { useDispatch } from 'react-redux';

import "../styles/all-foods.css";
import "../styles/pagination.css";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import useDebounce from "../hooks/useDebounce";
import { setProduct } from "../redux/reducers/ProductReducer";
import axios from "axios";

const AllFoods = () => {

  const products = useSelector(state => state.product.productList);
  const countProducts = useSelector(state => state.product.count);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);

  const queryDebounce = useDebounce(searchTerm, 2000);
  const [sortOrder, setSortOrder] = useState("");


  const productPerPage = 10;

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    setPageNumber(0); // reset page number to 0 when sort order changes
  }



  const pageCount = Math.ceil(countProducts / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected + 1);
    setActivePage(selected);
  };

  const fetchProducts = async (queryDebounce, sortOrder, pageNumber, productPerPage) => {
    try {
      const response = await axios.get(`https://fastfood314.up.railway.app/api/v1/product`, {
        params: {
          name: queryDebounce,
          sort: sortOrder,
          page: pageNumber, // add 1 to match the API page number (starting from 1)
          limit: productPerPage,
        },
      });
      return response.data.data;
    } catch (error) {
      return [];
    }
  }
  useEffect(() => {
    fetchProducts(queryDebounce, sortOrder, pageNumber, productPerPage).then((data) => {
      dispatch(setProduct(data));
    });
  }, [queryDebounce, sortOrder, pageNumber, productPerPage, dispatch]);
  return (
    <Layout>
      <Helmet title="All-Foods">
        <CommonSection title="All Foods" />

        <section>
          <Container>
            <Row>
              <Col lg="6" md="6" sm="6" xs="12">
                <div className="search__widget d-flex align-items-center justify-content-between ">
                  <input
                    type="text"
                    placeholder="I'm looking for...."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6" sm="6" xs="12" className="mb-5">
                <div className="sorting__widget text-end">
                  <label className="me-2" htmlFor="sortOrder">Sort by:</label>
                  <select className="w-50" id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="" >Default</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="price">Price: Low to High</option>
                    <option value="name">Name: A to Z</option>
                  </select>
                </div>
              </Col>

              {products.map((item) => (
                <Col lg="3" md="4" sm="6" xs="6" key={item.id} className="mb-4">
                  <ProductCard item={item} />
                </Col>
              ))}

              <div>
                <ReactPaginate
                  pageCount={pageCount}
                  onPageChange={changePage}
                  previousLabel={"Prev"}
                  nextLabel={"Next"}
                  containerClassName=" paginationBttns "
                  pageClassName="paginationPage"
                  activeClassName="paginationActive"
                />
              </div>
            </Row>
          </Container>
        </section>
      </Helmet>
    </Layout>
  );
};

export default AllFoods;
