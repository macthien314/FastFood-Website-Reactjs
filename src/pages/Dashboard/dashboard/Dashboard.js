import React from 'react';
import Home from '../home/Home';

import "./dashboard.css"
const Dashboard = () => {
    return (
      <Home>
         <div id="page-wrapper">
        <div className="row me-0">
          <div className="col-lg-12 ">
            <h1 className="page-header">Dashboard Page</h1>
          </div>
     
        <div className="col-lg-12">
          <div className="panel panel-info">
            <div className="panel-heading">
              Search &amp; Filter
              <a href="admin123/item">
                <span id="icon-reload" className="glyphicon glyphicon-refresh" />
              </a>
            </div>
            <div className="panel-body">
              <div className="row align-items-center pb-2">
                <div className="status-list col-sm-6 px-4">
                  <a className="btn m-b-sm btn-success btn-sm" href="admin123/item/all">
                    ALL (4)
                  </a>
                  <a className="btn m-b-sm btn btn-light btn-sm ms-2" href="admin123/item/active">
                    ACTIVE (4)
                  </a>
                  <a className="btn m-b-sm btn btn-light btn-sm ms-1" href="admin123/item/inactive">
                    INACTIVE (0)
                  </a>
                </div>
                <div className="col-sm-6">
                  <form action="admin123/item/all" method="GET">
                    <div className="input-group">
                      <input type="text" className="form-control me-1" name="search" placeholder="Search for..."  />
                      <input type="hidden" defaultValue="all" />
                      <span className="input-group-btn">
                        <button className="btn btn-info me-1" type="submit">Search</button>
                      </span>
                      <span className="input-group-btn me-1">
                        <button className="btn btn-success text-white" type="button"><a href="admin123/group/all">Clear</a></button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </Home>
       
    );
};

export default Dashboard;