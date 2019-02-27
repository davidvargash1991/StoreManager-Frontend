import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Card, CardBody } from 'reactstrap';
import Header from '../home/header';

function Home() {
  return (
    <React.Fragment>
      <Header />    
      <div className="container">
        <Row>
          <h1>Store Manager</h1>
        </Row>
        <Row>
          <div className="col-md-3">
            <Card className="text-white bg-primary mb-3">
              <CardBody>
                <Row align="center">
                  <Link  to="/usersAdmin">
                    <img width="64" height="64" 
                         src={process.env.PUBLIC_URL +'/images/account.png'} 
                         alt="Menu" />
                  </Link>
                </Row>
                <Row align="center">
                  <Link className="text-white" to="/usersAdmin"><h3>Users</h3></Link>         
                </Row>
              </CardBody>              
            </Card>         
          </div>
          <div className="col-md-3">
            <Card className="text-white bg-success mb-3">
              <CardBody>
                <Row align="center">
                  <Link  to="/usersAdmin">
                    <img width="64" height="64" 
                         src={process.env.PUBLIC_URL +'/images/box.png'} 
                         alt="Menu" />
                  </Link>
                </Row>
                <Row align="center">
                  <Link className="text-white" to="/usersAdmin"><h3>Items</h3></Link>         
                </Row>
              </CardBody>              
            </Card>         
          </div>     
          <div className="col-md-3">
            <Card className="text-white bg-warning mb-3">
              <CardBody>
                <Row align="center">
                  <Link  to="/usersAdmin">
                    <img width="64" height="64" 
                         src={process.env.PUBLIC_URL +'/images/store.png'} 
                         alt="Menu" />
                  </Link>
                </Row>
                <Row align="center">
                  <Link className="text-white" to="/usersAdmin"><h3>Stores</h3></Link>         
                </Row>
              </CardBody>              
            </Card>         
          </div>         
          <div className="col-md-3">
            <Card className="text-white bg-info mb-3">
              <CardBody>
                <Row align="center">
                  <Link  to="/usersAdmin">
                    <img width="64" height="64" 
                         src={process.env.PUBLIC_URL +'/images/count.png'} 
                         alt="Menu" />
                  </Link>
                </Row>
                <Row align="center">
                  <Link className="text-white" to="/usersAdmin"><h3>Count</h3></Link>         
                </Row>
              </CardBody>              
            </Card>         
          </div>                    
        </Row>  
        <Row>
          <div className="col-md-3">
            <Card className="text-white bg-dark mb-3">
              <CardBody>
                <Row align="center">
                  <Link  to="/usersAdmin">
                    <img width="64" height="64" 
                         src={process.env.PUBLIC_URL +'/images/transfer.png'} 
                         alt="Menu" />
                  </Link>
                </Row>
                <Row align="center">
                  <Link className="text-white" to="/usersAdmin"><h3>Receive / Transfer</h3></Link>         
                </Row>
              </CardBody>              
            </Card>         
          </div>    
          <div className="col-md-3">
            <Card className="text-white bg-primary mb-3">
              <CardBody>
                <Row align="center">
                  <Link  to="/usersAdmin">
                    <img width="64" height="64" 
                         src={process.env.PUBLIC_URL +'/images/money.png'} 
                         alt="Menu" />
                  </Link>
                </Row>
                <Row align="center">
                  <Link className="text-white" to="/usersAdmin"><h3>Sell</h3></Link>         
                </Row>
              </CardBody>              
            </Card>         
          </div>           
        </Row>    
      </div>     
    </React.Fragment>
  );
}
export default Home;