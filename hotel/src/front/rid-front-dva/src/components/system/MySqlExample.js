import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Radio, Modal, Select, Spin, Cascader, DatePicker } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
class MySqlExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            pageIndex:1
        };
    }
    // 创建实例
    exampleAdd = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
        });
    }
    // 删除实例
    delExample = (id) => {
        this.props.dispatch({
            type: 'mySqlExample/del',
            payload: {
                id,
            }
        });
    }
    startExample = (id) => {
        this.props.dispatch({
            type: 'mySqlExample/start',
            payload: {
                id,
            }
        });
    }

    // 添加/编辑 -> 确认
    exampleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'mySqlExample/add',
                    payload: {
                        dbName: values.db_name,
                        port: values.port,
                        version: values.mysql_version,
                        serverID: values.serverID,
                        configID: values.configID,
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
    // 修改MySQL版本，ip与配置信息跟着变
    handleChange = (value) => {
        this.props.form.resetFields(['leaderId']);
        this.props.dispatch({
            type: 'mySqlExample/serverIpAndConfig',
            payload: {
                version: value,
            },
        });
    }
    // 取消
    exampleCancel = () => {
        this.setState({
            modalVisible: false
        });
    }
    // // 查询
    // queryExampleLog = () => {
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             let arg = {};
    //             let time = values['createTime'];
    //             if(time && time.length > 0){
    //                 arg.startDate = time[0].format('YYYY-MM-DD');
    //                 arg.endDate = time[1].format('YYYY-MM-DD');
    //                 arg.date = time;
    //             };
    //             this.props.dispatch({
    //                 type: 'mySqlExample/query',
    //                 payload: arg
    //             });
    //         }
    //     });
    // }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.setState({
        pageIndex:page  
        }
            
        )
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/exampleLog',
            query: { page }
        }));
    }
    render() {

        const columns = [
            {
                title: '序号',
                key: 'id',
                render: (text, record, index) => (`${index + 1}`)
            },
            {
                title: 'dbName',
                dataIndex: 'db_name',
                key: 'db_name',
            },
            {
                title: '创建人',
                dataIndex: 'user_name',
                key: 'user_name',
            },
            {
                title: '端口号',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '服务器IP',
                dataIndex: 'serverIP',
                key: 'serverIP',
            },
            {
                title: '数据库版本',
                dataIndex: 'mysql_version',
                key: 'mysql_version',
            },
            {
                title: '执行状态',
                dataIndex: 'reason',
                key: 'reason',
                render: (text, record) =>< Link  to = {`/system/exampleLog/${record.id}/${this.state.pageIndex}`}> { text }</Link >,
            },
{
    title: '创建时间',
        dataIndex: 'create_time',
            key: 'create_time',
            },
            // {
            //     title: '操作',
            //     width: 100,
            //     render: (text, record) => (
            //         <div>
            //             <Popconfirm title="确认启动?" onConfirm={() => { this.startExample(record.id) }}>
            //                 <a style={{ marginLeft: 10 }}>启动</a>
            //             </Popconfirm>
            //             <Popconfirm title="确认删除?" onConfirm={() => { this.delExample(record.id) }}>
            //                 <a style={{ marginLeft: 10 }}>删除</a>
            //             </Popconfirm>
            //         </div>
            //     )
            // }
        ];

const props = this.props;
let { list, config, serverIP, total, page: current } = props;
const { getFieldDecorator } = props.form;
const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
};
var url = "/system/exampleLog";
return (
    <MainLayout location={location} sider="system" url={url}>
        <Modal
            visible={this.state.modalVisible}
            title="创建实例"
            onOk={this.exampleOk}
            confirmLoading={props.loading}
            onCancel={this.exampleCancel}>
            <Form layout="horizontal">
                <FormItem label="数据库名称" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('db_name', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="端口号" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('port', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="版本" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('mysql_version', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(
                        <Select style={{ width: "100%" }}
                            optionFilterProp="children"
                            placeholder="请选择MySQL版本"
                            onChange={this.handleChange}>
                            <Option value="5.6">5.6</Option>
                            <Option value="5.7">5.7</Option>
                        </Select>
                        )}
                </FormItem>
                <FormItem label="服务器IP" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('serverID', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(
                        <Select style={{ width: "100%" }} showSearch
                            optionFilterProp="children"
                            placeholder="请选择服务器IP"
                        >
                            <Option value={null}>请先选择MySQL版本</Option>
                            {
                                serverIP.map((data, index) =>
                                    <Option value={data.id.toString()} key={index}>{data.ip}</Option>
                                )
                            }
                        </Select>
                        )}
                </FormItem>
                <FormItem label="配置模版" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('configID', {
                        rules: [
                            {
                                required: true,
                            },
                        ],
                    })(
                        <Select style={{ width: "100%" }} showSearch
                            optionFilterProp="children"
                            placeholder="请选择配置模版"
                        >
                            <Option value={null}>请先选择MySQL版本</Option>
                            {
                                config.map((data, index) =>
                                    <Option value={data.id.toString()} key={index}>{data.name}</Option>
                                )
                            }
                        </Select>
                        )}
                </FormItem>
            </Form>
        </Modal>
        {/* <div className="clearfix">
                    <div className="pull-left">
                        <Form layout="inline">
                            <FormItem label="创建时间">
                                {getFieldDecorator('createTime', {
                                    rules: [{ type: 'array' }],
                                })(
                                    <RangePicker />
                                    )}
                            </FormItem>
                            <Button onClick={this.queryExampleLog}  type="primary" icon="search" >查询</Button>
                        </Form>
                    </div>
                </div> */}
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
    </MainLayout >
)
    }
}

const mapStateToProps = (state) => {
    const { list, config, serverIP, total, page } = state.mySqlExample;
    return {
        loading: state.loading.models.mySqlExample,
        list,
        total,
        config,
        page,
        serverIP
    };
}
MySqlExample = Form.create()(MySqlExample);
export default connect(mapStateToProps)(MySqlExample);