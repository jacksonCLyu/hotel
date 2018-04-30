import React from 'react';
import { connect } from 'dva';
import { Modal, Table, Button, Input, Popconfirm, Tag, Form, Select, Row, Col, DatePicker } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import { dataDict } from '../../utils/dataDict';
import Popover from 'antd/lib/popover';
const { RangePicker } = DatePicker;
const FormItem = Form.Item;
class RoomList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            bookModal: false,
            roomFlg: false
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
    add = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
            id: null, roomNumber: null, price: null, standard: null
        })
    }
    Cancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    roomCancel = () => {
        this.setState({
            bookModal: false
        })
    }
    del = (id) => {
        this.props.dispatch({
            type: 'roomList/del',
            payload: {
                id,
            }
        });
    }
    OK = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let id = this.state.id;
                if (id) {
                    this.props.dispatch({
                        type: 'roomList/exit',
                        payload: {
                            id: id,
                            roomNumber: values.roomNumber,
                            price: values.price,
                            standard: values.standard,
                            flg: values.flg,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: 'roomList/add',
                        payload: {
                            id: null,
                            roomNumber: values.roomNumber,
                            price: values.price,
                            standard: values.standard,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                }
            }
        });
    }
    // 编辑
    edit = (id, roomNumber, price, standard, flg) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            modalVisible: true,
            id, roomNumber, price, standard, flg
        });
    }

    roomOK = () => {
        this.props.form.validateFields((err, values) => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                let arg = {
                    id: this.state.id,
                    roomNumber: this.state.roomNumber,
                    price: this.state.price,
                    userId: user.id,
                }
                let time = values.checkTime
                if (time && time.length > 0) {
                    arg.checkTime = time[0].format('YYYY-MM-DD');
                    arg.leaveTime = time[1].format('YYYY-MM-DD');
                };
                this.props.dispatch({
                    type: 'roomList/book',
                    payload: {
                        id: arg.id,
                        roomNumber: arg.roomNumber,
                        price: arg.price,
                        userId: user.id,
                        checkTime: arg.checkTime,
                        leaveTime: arg.leaveTime,
                        jumpPage: () => {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/system/myOrder'
                            }));
                        }
                    }
                });
            }
        });
    }
    // 预订
    book = (id, roomNumber, price, standard, flg) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            bookModal: true,
            id, roomNumber, price, standard, flg
        });
    }
    onChange = (value, dateString) => {
        this.setState({
            roomFlg: true
        })
        let checkTime, leaveTime
        if (value && value.length > 0) {
            checkTime = value[0].format('YYYY-MM-DD');
            leaveTime = value[1].format('YYYY-MM-DD');
        };
        this.props.dispatch({
            type: 'roomList/searchRoom',
            payload: {
                checkTime: checkTime,
                leaveTime: leaveTime,
            }
        });
    }
    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));

        const columns = [
            {
                title: '房间编号',
                dataIndex: 'roomNumber',
                key: 'roomNumber',
            },
            {
                title: '房间价格(RMB)',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '房间标准',
                dataIndex: 'standard',
                key: 'standard',
                render: (text, record) => {
                    const standardText = dataDict("roomStandard", text)
                    return (
                        <div>
                            <Tag>
                                {standardText}
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
                            user.flg == 1 ?
                                <div>
                                    <a onClick={() => { this.edit(record.id, record.roomNumber, record.price, record.standard, record.flg) }}>修改</a>
                                    <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                                        <a style={{ marginLeft: 10 }}>删除</a>
                                    </Popconfirm>
                                </div> :
                                record.flg == 1 ?
                                    <a onClick={() => { this.book(record.id, record.roomNumber, record.price, record.standard, record.flg) }}>预订</a> : null
                        }
                    </div>
                )
            }
        ];
        const props = this.props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        let { list } = props;
        var url = "/system/roomList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="添加房间"
                    onOk={this.OK}
                    confirmLoading={props.loading}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        <FormItem label="房间编号" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('roomNumber', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.roomNumber || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="房间价格" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('price', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.price || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="房间标准" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('standard', {
                                rules: [{
                                    required: true,
                                }],
                                initialValue: this.state.standard || null
                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择房间标准"
                                >
                                    <Option value={1} >标间</Option>
                                    <Option value={2} >大床房</Option>
                                    <Option value={3} >情侣主题</Option>
                                    <Option value={4} >豪华总统间</Option>
                                </Select>
                            )}
                        </FormItem>
                        {/*更新是时才能更新房间状态,默认新增的房间都是能住*/}
                        {
                            this.state.id ?
                                <FormItem label="房间状态" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('flg', {
                                        initialValue: this.state.flg || null
                                    })(
                                        <Select style={{ width: "100%" }} showSearch
                                            optionFilterProp="children"
                                            placeholder="请选择状态"
                                        >
                                            <Option value={1} >房间可住</Option>
                                            <Option value={2} >房间不可住</Option>
                                        </Select>
                                    )}
                                </FormItem> : ""
                        }

                    </Form>
                </Modal>
                <Modal
                    visible={this.state.bookModal}
                    title="房间预订"
                    onOk={this.roomOK}
                    confirmLoading={props.loading}
                    onCancel={this.roomCancel}>
                    <Form layout="inline">
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">房间编号: {this.state.roomNumber}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">房间标准: {dataDict("roomStandard", this.state.standard)}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <div className="gutter-box">房间价格: {this.state.price}&nbsp;RMB</div>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col className="gutter-row" span={24}>
                                <FormItem label="预定日期">
                                    {getFieldDecorator('checkTime', {
                                        rules: [{ type: 'array' }],
                                    })(
                                        <RangePicker />
                                    )}
                                </FormItem>

                            </Col>
                        </Row>
                    </Form >
                </Modal>
                {
                    user.flg == 1 ?
                        <div className="clearfix">
                            <Button onClick={this.add} className="pull-right" type="primary" icon="plus">新增</Button>
                        </div> : ""
                }


                预订日期:&nbsp;<RangePicker onChange={this.onChange} />
                <div className="box20" />
                {
                    this.state.roomFlg || user.flg == 1 ? <Table
                        columns={columns}
                        dataSource={list}
                        rowKey={record => record.id}
                        loading={props.loading}
                        pagination={false}
                    // //修改页面
                    // onChange={this.pageChangeHandler}
                    /> : ""
                }
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.roomList;
    return {
        loading: state.loading.models.roomList,
        list,
        // total,
        // page
    };
}
RoomList = Form.create()(RoomList);
export default connect(mapStateToProps)(RoomList);