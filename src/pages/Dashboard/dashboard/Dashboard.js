import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../home/Home';

const Dashboard = () => {

  return (
    <Home name='Dashboard Pages'> 
      <div>
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Order</div>
                <div className="number">40,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bx-cart-alt cart" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">38,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bxs-cart-add cart two" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Profit</div>
                <div className="number">$12,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt" />
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bx-cart cart three" />
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Return</div>
                <div className="number">11,086</div>
                <div className="indicator">
                  <i className="bx bx-down-arrow-alt down" />
                  <span className="text">Down From Today</span>
                </div>
              </div>
              <i className="bx bxs-cart-download cart four" />
            </div>
          </div>
          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Recent Sales</div>
              <div className="sales-details">
                <ul className="details">
                  <li className="topic">Date</li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                  <li><Link to="#">02 Jan 2021</Link></li>
                </ul>
                <ul className="details">
                  <li className="topic">Customer</li>
                  <li><Link to="#">Alex Doe</Link></li>
                  <li><Link to="#">David Mart</Link></li>
                  <li><Link to="#">Roe Parter</Link></li>
                  <li><Link to="#">Diana Penty</Link></li>
                  <li><Link to="#">Martin Paw</Link></li>
                  <li><Link to="#">Doe Alex</Link></li>
                  <li><Link to="#">Aiana Lexa</Link></li>
                  <li><Link to="#">Rexel Mags</Link></li>
                  <li><Link to="#">Tiana Loths</Link></li>
                </ul>
                <ul className="details">
                  <li className="topic">Sales</li>
                  <li><Link to="#">Delivered</Link></li>
                  <li><Link to="#">Pending</Link></li>
                  <li><Link to="#">Returned</Link></li>
                  <li><Link to="#">Delivered</Link></li>
                  <li><Link to="#">Pending</Link></li>
                  <li><Link to="#">Returned</Link></li>
                  <li><Link to="#">Delivered</Link></li>
                  <li><Link to="#">Pending</Link></li>
                  <li><Link to="#">Delivered</Link></li>
                </ul>
                <ul className="details">
                  <li className="topic">Total</li>
                  <li><Link to="#">$204.98</Link></li>
                  <li><Link to="#">$24.55</Link></li>
                  <li><Link to="#">$25.88</Link></li>
                  <li><Link to="#">$170.66</Link></li>
                  <li><Link to="#">$56.56</Link></li>
                  <li><Link href="#">$44.95</Link></li>
                  <li><Link to="#">$67.33</Link></li>
                  <li><Link to="#">$23.53</Link></li>
                  <li><Link to="#">$46.52</Link></li>
                </ul>
              </div>
              <div className="button">
                <Link to="#">See All</Link>
              </div>
            </div>
            <div className="top-sales box">
              <div className="title">Top Seling Product</div>
              <ul className="top-sales-details">
                <li>
                  <Link to="#">
                    {/*<img src="images/sunglasses.jpg" alt="">*/}
                    <span className="product">Vuitton Sunglasses</span>
                  </Link>
                  <span className="price">$1107</span>
                </li>
                <li>
                  <Link to="#">
                    {/*<img src="images/jeans.jpg" alt="">*/}
                    <span className="product">Hourglass Jeans </span>
                  </Link>
                  <span className="price">$1567</span>
                </li>
                <li>
                  <Link to="#">
                    {/* <img src="images/nike.jpg" alt="">*/}
                    <span className="product">Nike Sport Shoe</span>
                  </Link>
                  <span className="price">$1234</span>
                </li>
                <li>
                  <Link to="#">
                    {/*<img src="images/scarves.jpg" alt="">*/}
                    <span className="product">Hermes Silk Scarves.</span>
                  </Link>
                  <span className="price">$2312</span>
                </li>
                <li>
                  <Link to="#">
                    {/*<img src="images/blueBag.jpg" alt="">*/}
                    <span className="product">Succi Ladies Bag</span>
                  </Link>
                  <span className="price">$1456</span>
                </li>
                <li>
                  <Link to="#">
                    {/*<img src="images/bag.jpg" alt="">*/}
                    <span className="product">Gucci Womens's Bags</span>
                  </Link>
                  <span className="price">$2345</span>
                </li><li>
                  <Link to="#">
                    {/*<img src="images/addidas.jpg" alt="">*/}
                    <span className="product">Addidas Running Shoe</span>
                  </Link>
                  <span className="price">$2345</span>
                </li>
                <li>
                  <Link to="#">
                    {/*<img src="images/shirt.jpg" alt="">*/}
                    <span className="product">Bilack Wear's Shirt</span>
                  </Link>
                  <span className="price">$1245</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>



    </Home>

  );
};

export default Dashboard;