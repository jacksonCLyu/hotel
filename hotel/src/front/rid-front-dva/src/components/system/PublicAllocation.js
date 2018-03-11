import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Radio, Modal, Select, TreeSelect, Spin, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import MainLayout from '../MainLayout';
import Pre from '../pre.css'
const FormItem = Form.Item;
class PublicAllocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            detailsModel: false,
            companyId: null,
            page: 1
        };
    }
    // 新增配置
    configAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
            configID: null,
            type: null,
            name: null,
            config: ""
        });
    }
    detailsOk = () => {
        this.setState({
            detailsModel: false,
        })
    }
    // 取消
    detailsCancel = () => {
        this.setState({
            detailsModel: false
        });
    }
    // 添加/编辑 -> 确认
    configOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let configID = this.state.configID;
                if (configID === null) {
                    this.props.dispatch({
                        type: 'publicAllocation/add',
                        payload: {
                            configID: null,
                            name: values.name,
                            type: values.type,
                            config: values.configurationInformation,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                            page: this.state.page
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: 'publicAllocation/edit',
                        payload: {
                            configID: configID,
                            name: values.name,
                            type: values.type,
                            config: values.configurationInformation,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                            page: this.state.page
                        }
                    });
                }

            }
        });
    }
    // 删除
    delConfig = (id) => {
        this.props.dispatch({
            type: 'publicAllocation/del',
            payload: {
                id,
                page: this.state.page
            }
        });
    }
    // 编辑
    configEdit = (configID, type, name, config) => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            modalVisible: true,
            configID: configID,
            resourceType: type,
            name: name,
            config: config
        });
    }
    // 取消
    configCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    //资源详情
    detailConfig = (id) => {
        this.setState({
            detailsModel: true
        });
        this.props.dispatch({
            type: 'publicAllocation/detailConfig',
            payload: {
                configID: id,
            }
        });
    }
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.setState({
            page: page
        })
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/confList',
            query: { page }
        }));
    }
    render() {

        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a onClick={() => { this.detailConfig(record.id) }}>{record.name}</a>
            },
            {
                title: '资源类型',
                dataIndex: 'typeName',
                key: 'typeName',
            },
            {
                title: '引用次数',
                dataIndex: 'citation_times',
                key: 'citation_times',
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <a onClick={() => { this.configEdit(record.id, record.type, record.name, record.configuration_information) }}>修改</a>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delConfig(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list, resourceType, configID, name, config, configType, citationTimes, total, page: current } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url = "/system/confList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="创建配置模版"
                    onOk={this.configOk}
                    confirmLoading={props.loading}
                    onCancel={this.configCancel}>
                    <Form layout="horizontal">
                        <FormItem label="名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.name || null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="资源类型" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('type', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.resourceType || null
                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择资源类型"
                                >
                                    {
                                        resourceType.map((data, index) =>
                                            <Option value={data.type} key={index}>{data.typeName}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                        <FormItem label="配置信息" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('configurationInformation', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.config || ""
                            })(<textarea rows="10" cols="50" />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.detailsModel}
                    title="配置详情"
                    confirmLoading={props.loading}
                    onCancel={this.detailsCancel}
                    footer={[
                        <Button key="back" type="primary" onClick={this.detailsCancel}>返回</Button>,
                    ]}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">名称: {name}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">资源类型: {configType}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8} >
                            <div className="gutter-box">引用次数: {citationTimes}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        &nbsp;&nbsp;配置信息:
                        <Col className="gutter-row" >
                            <pre className={Pre.pre} >{config}</pre>
                        </Col>
                    </Row>
                </Modal>
                <div className="clearfix">
                    <Button onClick={this.configAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                </div>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={record => record.id}
                    loading={props.loading}
                    pagination={{
                        total: total,
                        current: current,
                        pageSize: 10
                    }}
                    //修改页面
                    onChange={this.pageChangeHandler}
                />
            </MainLayout>
        )
    }
}
const mapStateToProps = (state) => {
    const { list, resourceType, configID, name, config, configType, citationTimes, total, page } = state.publicAllocation;
    return {
        loading: state.loading.models.publicAllocation,
        list,
        resourceType,
        configID,
        name,
        config,
        configType,
        citationTimes,
        total,
        page
    };
}
PublicAllocation = Form.create()(PublicAllocation);
export default connect(mapStateToProps)(PublicAllocation);