import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import Home from "../home/Home";
import "./user.css"
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { getUser } from "../../../redux/reducers/UserReducer";
const User = () => {
  const user = useSelector((state) => state.user.userList);



  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");

  const [pageNumber, setPageNumber] = useState(0);

  const searchedUser = user.filter((item) => {
    if (searchTerm.value === "") {
      return item;
    }
    if (item.username.toLowerCase().includes(searchTerm.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  const userPerPage = 5;
  const visitedPage = pageNumber * userPerPage;
  const displayPage = searchedUser.slice(
    visitedPage,
    visitedPage + userPerPage
  );

  const pageCount = Math.ceil(searchedUser.length / userPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <Home>
      <div id="page-wrapper">
        <div className="row me-0">
          <div className="col-lg-12 ">
            <h1 className="page-header">User Page</h1>
          </div>

          <div className="col-lg-12">
            <div className="panel panel-info">
              <div className="panel-heading d-flex justify-content-between align-items-center px-3">
                Search &amp; Filter
                <a href="admin123/item">
                  <i className="ri-refresh-line"></i>
                </a>
              </div>
              <div className="panel-body">
                <div className="row align-items-center pb-2">
                  <div className="status-list col-sm-6 px-4">
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
                  <div className="col-sm-6">
                    <form action="admin123/item/all" method="GET">
                      <div className="input-group">
                        <input
                         type="text"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control me-1"
                          name="search"
                          placeholder="Search for..."
                        />
                        <input type="hidden" defaultValue="all" />
                        <span className="input-group-btn">
                          <button className="btn btn-info me-1" type="submit">
                            Search
                          </button>
                        </span>
                        <span className="input-group-btn me-1">
                          <button className="btn btn-success text-color" type="button">
                            <a href="admin123/group/all">Clear</a>
                          </button>
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                      {displayPage.map((items, index) => {
                        return (<tr>
                          <td>{items._id.slice(0, 24) + '...'}</td>
                          <td>{items.username}</td>
                          <td>{items.email}</td>
                          <td title={items.password}>{items.password.slice(0,10) + '...'}</td>
                          <td>{items.role}</td>
                          <td>
                            <Link className="btn btn-outline-success me-1 pd-0"> <i className="ri-edit-box-line"></i></Link>
                            <Link className="btn btn-outline-danger"><i className="ri-delete-bin-5-line"></i></Link>
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
                    containerClassName=" paginationBttns "
                  />
                </div>
              </div>
            </div>
          </div>
     
    </Home>
  );
};

export default User;
