import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Form, Popconfirm, Tag, Modal, Row, Col } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
class MyOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    // // 改变页面
    // pageChangeHandler = (pagination) => {
    //     let page = pagination.current;
    //     this.props.dispatch(routerRedux.replace({
    //         pathname: '/system/taskFlow',
    //         query: { page }
    //     }));
    // }
    del = (id) => {
        this.props.dispatch({
            type: 'myOrder/del',
            payload: {
                id,
            }
        });
    }
    payment = (id, roomNumber, userId, userName, price) => {
        this.setState({
            modalVisible: true,
            id, roomNumber, userId, price, userName
        });
    }
    Cancel = () => {
        this.setState({
            modalVisible: false,
        })
    }
    Pay = () => {
        this.props.dispatch({
            type: 'myOrder/pay',
            payload: {
                id:this.state.id,
                userId:this.state.userId,
                roomNumber:this.state.roomNumber,
                callback: () => {
                    this.setState({
                        modalVisible: false
                    });
                },
            }
        });
    }
    render() {

        const columns = [
            {
                title: '订单ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '房间编号',
                dataIndex: 'roomNumber',
                key: 'roomNumber'
            },
            {
                title: '订单价格',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '入住时间',
                dataIndex: 'checkTime',
                key: 'checkTime',
                render: (text, record) => {
                    return text.slice(0, 10)
                }
            },
            {
                title: '离开时间',
                dataIndex: 'leaveTime',
                key: 'leaveTime',
                render: (text, record) => {
                    return text.slice(0, 10)
                }
            },
            {
                title: '创建时间',
                dataIndex: 'crateTime',
                key: 'crateTime',
                render: (text, record) => {
                    return text.slice(0, 10)
                }
            },
            {
                title: '状态',
                dataIndex: 'flg',
                key: 'flg',
                render: (text, record) => {
                    const orderFlg = dataDict("orderFlg", text)
                    return (
                        <div>
                            <Tag>
                                {orderFlg}
                            </Tag>
                        </div>)
                }
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        {
                            record.flg == 1 ?
                                <a onClick={() => { this.payment(record.id, record.roomNumber, record.userId, record.userName, record.price) }}>支付</a>
                                : ""
                        }

                        <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        const props = this.props;
        let { list } = props;
        var url = "/system/myOrder";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="支付"
                    confirmLoading={props.loading}
                    onCancel={this.Cancel}
                    footer={[
                        <Button key="back" onClick={this.Cancel}>返回</Button>,
                        <Button key="back" type="primary" onClick={this.Pay}>支付</Button>,
                    ]}>
                    <Form layout="inline">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">订单号: {this.state.id}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">房间编号: {this.state.roomNumber}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">用户: {this.state.userName}&nbsp;</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">价格: {this.state.price}&nbsp;RMB</div>
                            </Col>
                        </Row>
                    </Form >
                </Modal>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={record => record.id}
                    loading={props.loading}
                    pagination={false}
                // //修改页面
                // onChange={this.pageChangeHandler}
                />
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.myOrder;
    return {
        loading: state.loading.models.myOrder,
        list,
        // total,
        // page
    };
}
export default connect(mapStateToProps)(MyOrder);