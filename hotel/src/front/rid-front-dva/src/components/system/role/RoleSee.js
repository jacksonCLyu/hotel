import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal, Select } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../../MainLayout';

const FormItem = Form.Item;

var roleID;
var inputValue=null;
class RoleSee extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null,
            //当前页码
            pageIndex:1
        };
    }
    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/system/roleManagementList'
        }));
    }
    // 添加用户
    userAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
        });
    }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.setState({
            pageIndex:page
        })
       this.props.dispatch({
           type:'roleSee/listInit',
           payload:{
               page,
               roleId: roleID,
           }
       })
    }
    // 取消
    userCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    // 添加 -> 确认
    userOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'roleSee/add',
                    payload: {
                        id: values.id,
                        roleId: roleID,
                        page:this.state.pageIndex,
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
    // 删除
    delUser = (id) => {
        this.props.dispatch({
            type: 'roleSee/deleteUserRole',
            payload: {
                boId: id,
                roleId: roleID,
                page:this.state.pageIndex,
            }
        });
    }
    screen = (e) => {
        inputValue= e.target.value
    }
     // 查询
     searchSubmit = () => {
        if(inputValue==null){
            Modal.error({
                content: "请输入查询条件",
            });
            return;
        }
        this.props.dispatch({
            type: 'roleSee/query',
            payload: {
                name: inputValue,
                roleId:this.props.roleId
            }
        });
    }
    render() {

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email',
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (
                    <div>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delUser(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list, users, roleId ,total, page: current} = props;
        roleID = roleId
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url="/system/roleManagementList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="请输入用户姓名"
                    onOk={this.userOk}
                    confirmLoading={props.loading}
                    onCancel={this.userCancel}>
                    <Form layout="horizontal">
                        <FormItem label="用户姓名" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('id', {

                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择用户">
                                    {
                                        users.map((data, index) =>
                                            <Option value={data.id.toString()} key={index}>{data.name}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="clearfix">
                    <div className="pull-left">
                        <Form layout="inline">
                            <FormItem >
                                <Input placeholder="姓名" style={{ width: 150 }} onChange={this.screen} />
                            </FormItem>
                            <Button onClick={this.searchSubmit}  type="primary" icon="search" >筛选</Button>
                        </Form>
                    </div>
                    <Button onClick={this.userAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                    &nbsp;
                    <Button className="pull-right" onClick={this.back} >返回</Button>
                </div>
                <br />
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
    const { list, users, roleId,total,page } = state.roleSee;
    return {
        loading: state.loading.models.roleSee,
        list,
        users,
        roleId,
        total,
        page
    };
}
RoleSee = Form.create()(RoleSee);
export default connect(mapStateToProps)(RoleSee);