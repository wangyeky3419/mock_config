import React, { Component } from 'react';
import { Button, Balloon } from '@icedesign/base';
import PropTypes from 'prop-types';

export default class DeleteBalloon extends Component {
    static propTypes = {
        handleRemove: PropTypes.func,
    };

    static defaultProps = {
        handleRemove:function (){},
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    handleHide(code){
        console.log(code)
        if (code === 1) {
            this.props.handleRemove();
        }
        this.setState({
            visible: false,
        });
    };

    handleVisible(visible){
        this.setState({ visible });
    };

    render() {
        const visibleTrigger = (
            <Button size="small" type="secondary" shape="warning">
                删除
            </Button>
        );

        const content = (
            <div>
                <div style={styles.contentText}>确认删除？</div>
                <Button
                    id="confirmBtn"
                    size="small"
                    type="normal"
                    shape="warning"
                    style={{ marginRight: '5px' }}
                    onClick={this.handleHide.bind(this, 1)}
                    >
                    确认
                </Button>
                <Button
                    id="cancelBtn"
                    size="small"
                    onClick={this.handleHide.bind(this, 0)}
                >
                    关闭
                </Button>
            </div>
        );

        return (
        <Balloon
            trigger={visibleTrigger}
            triggerType="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisible.bind(this)}
        >
            {content}
        </Balloon>
        );
    }
}

const styles = {
    contentText: {
        padding: '5px 0 15px',
    },
};
