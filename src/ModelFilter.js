import React from 'react'
import { Row, Col, Button, Tag, Space, Modal, Checkbox, notification } from 'antd'
import { FilterOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import './ModelFilter.css'
class ModelFiler extends React.Component {
    constructor(props) {
        super();
        this.state = {
            visible: false,
            labelText: props.labelText ? props.labelText : '选项',
            options: props.options ? props.options : [],
            value: props.value ? props.value : [],
            modelValue: props.value ? props.value : [],
            max: props.max,
        }
    };

    handleClose = removedTag => {
        const value = this.state.value.filter(tag => tag !== removedTag);
        this.setState({ value, modelValue: value }, () => {
            console.log(this.state);
        });
    };

    handleClickSelectMore = () => {
        this.setState({ visible: true });
    }

    onChange = checkedList => {
        this.setState({
            modelValue: checkedList,
        });
    };

    handleOk = () => {
        let flag = this.state.max && this.state.modelValue.length > this.state.max;
        console.log("flag", flag, this.state.modelValue.length, this.state.max);
        if (flag) {
            console.log('ok false');
            this.openNotification();
        } else {
            console.log('ok true');
            this.setState({ visible: false, value: this.state.modelValue }, () => {
                // 更新过滤条件
                if (this.props.onChange) {
                    this.props.onChange(this.state.value);
                }
            });
        }
    }

    openNotification = () => {
        notification.open({
            message: '提示',
            description:
                `您一次最多只能选择${this.state.max}个`
        });
    };

    handleCancel = () => {
        console.log('cancle true');
        this.setState({ visible: false, modelValue: this.state.value });
    }

    componentWillReceiveProps(nextProps) {
        console.log('update', this.props, nextProps);
        this.state = {
            labelText: nextProps.labelText ? nextProps.labelText : '选项',
            options: nextProps.options ? nextProps.options : [],
            value: nextProps.value ? nextProps.value : [],
            max: nextProps.max ? nextProps : 5,
        }
    };

    render() {
        const { visible, labelText, options, value, modelValue, max } = this.state;
        return (
            <Row className="filterContainer" justify="space-between" align="middle">
                <Col span={2}>
                    <span>{this.props.labelText}{':'}</span>
                </Col>
                <Col span={20}>
                    {
                        value.map((tag, index) => {
                            return (
                                <Tag closable color="#108ee9" key={this.props.name + "t_" + index} onClose={this.handleClose.bind(this, tag)}>{tag}</Tag>
                            )
                        })
                    }
                </Col>
                <Col span={2}>
                    <Button type="link" icon={<FilterOutlined />} onClick={this.handleClickSelectMore}>选择</Button>
                </Col>
                <Modal
                    title={`选择 - ${labelText}`}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText={'确定'}
                    cancelText={'取消'}
                >
                    <Space>
                        <Checkbox.Group options={options} value={modelValue} onChange={this.onChange} />
                    </Space>
                </Modal>
            </Row>
        )
    }
}
export default ModelFiler