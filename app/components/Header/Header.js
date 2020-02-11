import React from 'react';
import './style.scss';
import { Row, Col } from 'antd';

import telzio from '../../assets/images/telzio.svg'

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
        <Row type="flex" justify="space-between" align="middle">
          <Col span={10}>
            <div className="logo"><img src={telzio} height='50' /></div>
          </Col>
        </Row>
    );
  }
}

export default Header;
