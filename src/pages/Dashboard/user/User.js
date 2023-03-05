import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, DropdownItem, DropdownMenu, DropdownToggle, Row, Table, UncontrolledDropdown } from "reactstrap";
import Home from "../home/Home";
import "./user.css"
import { Link } from "react-router-dom";

import ReactPaginate from "react-paginate";
import { checkFail, getUser,userDeleted } from "../../../redux/reducers/UserReducer";
import "../../../styles/pagination-dashboard.css";

import PageNotFound from "../pageNotFound/pageNotFound";
import { toast } from "react-toastify";
import useDebounce from "../../../hooks/useDebounce";
const User = () => {
  const user = useSelector((state) => state.user.userList);
  const auth = useSelector((state) => state.auth.currentUser);




  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const queryDebounce = useDebounce(searchTerm, 1000);

  const [pageNumber, setPageNumber] = useState(0);
  const searchedUser = user?.filter((item) => {
   if(user){
    if (searchTerm?.value === "") {
      return item;
    }
    if (item.username.toLowerCase().includes(queryDebounce.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
   }
   else{
    return []
   }
   
  });

  const userPerPage = 5;
  const visitedPage = pageNumber * userPerPage;
  const displayPage = searchedUser?.slice(
    visitedPage,
    visitedPage + userPerPage
  );

  const pageCount = Math.ceil(searchedUser?.length / userPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const hangdleDelete = (id)=>{
    dispatch(userDeleted(id));
    setTimeout(()=>{
      toast.success('Xóa loại sản phẩm thành công')
    },200)
 
  }

  return (
    
    <Home name='Users Page'>
    {!auth ? <PageNotFound></PageNotFound> : 
      <div id="page-wrapper">
        <div className="row m-0 pt-5">


          <div className="col-lg-12 pt-5">
            <div className="panel panel-info">
              <div className="panel-heading d-flex justify-content-between align-items-center px-3">
                Search &amp; Filter
                <a href="admin123/item">
                  <i className="ri-refresh-line"></i>
                </a>
              </div>
              <div className="panel-body body-top">
                <div className="row align-items-center pb-2">
                  <div className="status-list col-md-6 col-sm-12 px-4">
                    <a
                      className="btn m-b-sm btn-success btn-sm"
                      href="admin123/item/all"
                    >
                      ALL (4)
                    </a>
                    <a
                      className="btn m-b-sm btn btn-light btn-sm ms-2"
                      href="admin123/item/active"
                    >
                      ACTIVE (4)
                    </a>
                    <a
                      className="btn m-b-sm btn btn-light btn-sm ms-1"
                      href="admin123/item/inactive"
                    >
                      INACTIVE (0)
                    </a>
                  </div>
                  <div className="col-md-6 col-sm-12">
                    <form action="admin123/item/all" method="GET">
                      <div className="input-group">
                        <input
                         type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control me-2"
                          name="search"
                          placeholder="Search for..."
                        />
                        <input type="hidden" defaultValue="all" />
                        <span className="input-group-btn">
                          <button className="btn btn-info me-1" type="submit">
                            Search
                          </button>
                        </span>
                      
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Row>
            <Col className="d-flex justify-content-between pb-4 ps-3" xs="12">
              <UncontrolledDropdown className="me-2" direction="down">
                <DropdownToggle caret color="info">
                  Dropdown
                </DropdownToggle>
                <DropdownMenu data-popper-placement="bottom-start">
                  <DropdownItem>Active</DropdownItem>
                  <DropdownItem>InActive</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <Link onClick={()=>{dispatch(checkFail());}} to='/add-user'>
                <Button color="success" outline>Add user</Button>
              </Link>

            </Col>
          </Row>

          <div className="col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading">
                List User
              </div>
              <div className="panel-body">
                <div className="px-3 align-items-center pb-2">
                  <Table striped>
                    <thead>
                      <tr>
                        <th>Mã</th>
                        <th>Tên người dùng</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Quyền</th>
                        <th>Ảnh</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayPage?.map((items, index) => {
                        return (<tr key={index}>
                          <td>{items._id.slice(0, 24) + '...'}</td>
                          <td>{items.username}</td>
                          <td>{items.email}</td>
                          <td title={items.password}>{items.password.slice(0,10) + '...'}</td>
                          <td>{items.role}</td>
                          <td><img style={{width:'50px',height:'50px'}} src={items.image} alt={items.username} /></td>
                          <td>
                            <Link onClick={()=>{dispatch(checkFail());}} to={`/edit-user/${items._id}`} className="btn btn-outline-success me-1 pd-0"> <i className="ri-edit-box-line"></i></Link>
                            <Link onClick={()=>{hangdleDelete(items._id)}} className="btn btn-outline-danger"><i className="ri-delete-bin-5-line"></i></Link>
                          </td>
                        </tr>)
                      })}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
       
              <div className="panel-body">
                <div className="row align-items-center pb-2">
                  <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel={"Prev"}
                    nextLabel={"Next"}
                    containerClassName=" paginationBttnss "
                  />
                </div>
              </div>
            </div>
          </div>
          
    }
    
  
   
   
     
    </Home>
    
  );
};

export default User;
