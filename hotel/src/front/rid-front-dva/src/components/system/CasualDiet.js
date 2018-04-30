import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Form, Popconfirm, Tag, Card, Row, Col, Upload, Modal, Icon } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
const { Meta } = Card;
class CasualDiet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            orderModel: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }
    Cancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    add = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
            userName: null, price: null, fileList: [], path: null
        })
    }
    OK = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'casualDiet/insert',
                    payload: {
                        name: values.name,
                        price: values.price,
                        callback: () => {
                            this.setState({
                                modalVisible: false
                            });
                        },
                    }
                });
            }
        });
    }
    // // 改变页面
    // pageChangeHandler = (pagination) => {
    //     let page = pagination.current;
    //     this.props.dispatch(routerRedux.replace({
    //         pathname: '/system/taskFlow',
    //         query: { page }
    //     }));
    // }

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })
    handleCancel = () => this.setState({ previewVisible: false })
    order = (data) => {
        this.setState({
            orderModel: true, casualDietId: data.id, name: data.name, price: data.price
        })
    }
    orderOk = () => {
        this.props.dispatch({
            type: 'casualDiet/order',
            payload: {
                id: this.state.casualDietId,
                callback: () => {
                    this.setState({
                        orderModel: false
                    });
                },
            }
        });
    }
    orderCancel = () => {
        this.setState({
            orderModel: false
        })
    }
    render() {
        const props = this.props;
        const { getFieldDecorator } = props.form;
        let { list } = props;
        var url = "/system/casualDiet";
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const user = JSON.parse(sessionStorage.getItem('user'));
        let flg = user.flg;
        return (
            <MainLayout location={location} sider="system" url={url}>
                {
                    flg == 1 ? <div className="clearfix">
                        <Button onClick={this.add} className="pull-right" type="primary" icon="plus">新增</Button>
                    </div>:""
                }
                <Modal
                    visible={this.state.modalVisible}
                    title="添加"
                    onOk={this.OK}
                    confirmLoading={props.loading}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        <FormItem label="名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="价格" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('price', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="上传图片" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('upload', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(
                                <Upload
                                    action="/upload/picture"
                                    listType="picture-card"
                                    fileList={this.state.fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {this.state.fileList == null || this.state.fileList.length >= 1 ? null : uploadButton}
                                </Upload>)}
                        </FormItem>
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.orderModel}
                    title="信息"
                    onOk={this.orderOk}
                    confirmLoading={props.loading}
                    onCancel={this.orderCancel}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box">名称: {this.state.name}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">价格: {this.state.price}</div>
                        </Col>
                    </Row>
                </Modal>
                <div className="box20" />
                <Row  >
                    {
                        list.map((data, index) => {
                            return <Col className="gutter-row" span={6} key={index}>
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={data.path} />}
                                >
                                    <Meta
                                        title={data.name}
                                    />
                                    <br />
                                    <a onClick={() => { this.order(data) }}>订购</a>
                                </Card>
                            </Col>

                        })
                    }
                </Row>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.casualDiet;
    return {
        loading: state.loading.models.casualDiet,
        list,
        // total,
        // page
    };
}
CasualDiet = Form.create()(CasualDiet);
export default connect(mapStateToProps)(CasualDiet);