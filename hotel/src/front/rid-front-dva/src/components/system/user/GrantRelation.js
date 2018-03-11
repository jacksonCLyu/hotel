import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal, Select } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../../MainLayout';


const FormItem = Form.Item;
var userId;
class GrantRelation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null
        };
    }
    // 删除
    delResourceGrantRelation = (id) => {
        this.props.dispatch({
            type: 'grantRelation/del',
            payload: {
                id,
                userId: userId
            }
        });
    }
    // 取消
    resourceCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    // 添加用户
    resourceAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
        });
    }
    // 添加 -> 确认
    resourceOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'grantRelation/add',
                    payload: {
                        resourceId: values.resourceId,
                        grantUserId: userId,
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
    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/system/userManagementList'
        }));
    }

    render() {
        const columns = [
            {
                title: '资源Id',
                dataIndex: 'resourceId',
                key: 'resourceId',
            },
            {
                title: '资源名称',
                dataIndex: 'resourceName',
                key: 'resourceName',
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delResourceGrantRelation(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        //取出props中的对应的值,例如取出list对应的值并赋值到dataSource中
        let { resources, selectResources, grantUserId } = props;
        const { getFieldDecorator } = props.form;
        userId = grantUserId;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url = "/system/userManagementList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div className="clearfix">
                    <Button className="pull-right" type="primary" onClick={this.resourceAdd} >添加资源</Button>
                    <Button className="pull-right" onClick={this.back}>返回</Button>
                </div>
                <Modal
                    visible={this.state.modalVisible}
                    title="添加资源"
                    onOk={this.resourceOk}
                    confirmLoading={props.loading}
                    onCancel={this.resourceCancel}>
                    <Form layout="horizontal">
                        <FormItem label="请输入资源名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('resourceId', {

                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择资源">
                                    {
                                        selectResources.map((data, index) =>
                                            <Option value={data.id.toString()} key={index}>{data.name}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={resources}
                    rowKey={record => record.id}
                    loading={props.loading}
                />
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { resources, grantUserId, selectResources } = state.grantRelation;
    return {
        loading: state.loading.models.grantRelation,
        resources,
        grantUserId,
        selectResources
    };
}
GrantRelation = Form.create()(GrantRelation);
export default connect(mapStateToProps)(GrantRelation);