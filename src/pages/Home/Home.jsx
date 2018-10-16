

import React, { Component } from 'react';

import './Home.scss';

export default class Home extends Component {
  static displayName = 'Home';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className="home-body">
            <div className="home-style">
            
            </div>
            {/* <p className="content">
                欢迎来到中信银行接口测试系统
            </p>  */}
        </div>
    );
  }
}
