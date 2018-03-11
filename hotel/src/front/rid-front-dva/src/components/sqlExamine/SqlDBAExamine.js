import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal, Select, DatePicker, Tag, Tooltip } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

class SqlDBAExamine extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null,
            ID: null,
            dbName: null,
            userName: null,
            describe: null,
            sqlState: null,
            createTime: null,
        };
    }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                let arg = {
                    id: fieldsValue.ID,
                    dbName: fieldsValue.dbName,
                    userName: fieldsValue.userName,
                    describe: fieldsValue.describe,
                    sqlState: fieldsValue.sqlState,
                    page: page
                }
                let time = fieldsValue['createTime'];
                if (time && time.length > 0) {
                    arg.startDate = time[0].format('YYYY-MM-DD');
                    arg.endDate = time[1].format('YYYY-MM-DD');
                    arg.date = time;
                };
                this.props.dispatch({
                    type: 'sqlDBAExamine/search',
                    payload: arg
                });
            }
        });
    }
    // 查询
    searchSubmit = () => {
        let props = this.props;
        props.form.validateFields((err, fieldsValue) => {
            if (!err) {
                let arg = {
                    id: fieldsValue.ID,
                    dbName: fieldsValue.dbName,
                    userName: fieldsValue.userName,
                    describe: fieldsValue.describe,
                    sqlState: fieldsValue.sqlState,
                }
                let time = fieldsValue['createTime'];
                if (time && time.length > 0) {
                    arg.startDate = time[0].format('YYYY-MM-DD');
                    arg.endDate = time[1].format('YYYY-MM-DD');
                    arg.date = time;
                };
                props.dispatch({
                    type: 'sqlDBAExamine/search',
                    payload: arg
                });
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
                title: '数据库',
                dataIndex: 'dbName',
                key: 'dbName',
            },
            {
                title: 'SQL类型',
                dataIndex: 'type',
                key: 'type',
                render: (text, record) => {
                    const val = dataDict("sqlType", text)
                    return (
                        <div>
                            <Tag>
                                {val}
                            </Tag>
                        </div>
                    );
                }
            },
            {
                title: '申请人',
                dataIndex: 'applicant',
                key: 'applicant',
            },
            {
                title: '更新时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
            },
            {
                title: '描述',
                dataIndex: 'description',
                key: 'description',
                render: (text, record) => {
                    const isLong = text.length > 20;
                    if (isLong) {
                        return <Tooltip title={text}>{text.slice(0, 20)} </Tooltip>
                    } else {
                        return text;
                    }
                }
            },
            {
                title: '执行状态',
                dataIndex: 'state',
                key: 'state',
                render: (text, record) => {
                    const val = dataDict("implementState", text)
                    var color;
                    switch (text) {
                        case 2:
                            color = "#d9534f"
                            break;
                        case 5:
                            color = "#d9534f"
                            break;
                        case 1, 7, 8:
                            color = "#777"
                            break;
                        case 7:
                            color = "#777"
                            break;
                        case 8:
                            color = "#777"
                            break;
                        case 6:
                            color = "#5cb85c"
                            break;
                        case 4:
                            color = "#f0ad4e"
                            break;
                        case 3:
                            color = "#337ab7"
                            break;
                        default:
                            break;
                    }
                    return (
                        <div>
                            <Tag color={color}>
                                {val}
                            </Tag>
                        </div>
                    );
                }
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <Link to={`/SqlDBA/getDBAExamine/${record.id}`}>查看</Link>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list, total, page: current } = props;
        const { getFieldDecorator } = props.form;
        var url = "/sqlExamine/sqlDBA"
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div className="clearfix">
                    <div className="pull-left">
                        <Form layout="inline">
                            <FormItem >
                                {getFieldDecorator('ID')(
                                    <Input placeholder="id" style={{ width: 100 }} />
                                )}
                            </FormItem>
                            <FormItem >
                                {getFieldDecorator('dbName')(
                                    <Input placeholder="数据库" style={{ width: 100 }} />
                                )}
                            </FormItem>
                            <FormItem >
                                {getFieldDecorator('userName')(
                                    <Input placeholder="申请人"
                                    />
                                )}
                            </FormItem>
                            <FormItem >
                                {getFieldDecorator('describe')(
                                    <Input placeholder="描述"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('sqlState')(
                                    <Select style={{ width: 150 }} showSearch
                                        optionFilterProp="children"
                                        placeholder="执行状态"
                                        allowClear={true}>
                                        <Option value={"1,2,3,4,5,6,7,8"}>全部</Option>
                                        <Option value={1}>已提交</Option>
                                        <Option value={2}>实验库执行失败</Option>
                                        <Option value={3}>实验库执行成功</Option>
                                        <Option value={7}>实验库执行中</Option>
                                        <Option value={4}>DBA审核SQL</Option>
                                        <Option value={5}>主库执行失败</Option>
                                        <Option value={6}>主库执行成功</Option>
                                        <Option value={8}>主库执行中</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="时间段">
                                {getFieldDecorator('createTime', {
                                    rules: [{ type: 'array' }],
                                })(
                                    <RangePicker />
                                    )}
                            </FormItem>
                            <Button onClick={this.searchSubmit} type="primary" icon="search" >筛选</Button>
                        </Form>
                    </div>
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
    const { list, total, page } = state.sqlDBAExamine;
    return {
        loading: state.loading.models.sqlDBAExamine,
        list,
        total,
        page
    };
}
SqlDBAExamine = Form.create()(SqlDBAExamine);
export default connect(mapStateToProps)(SqlDBAExamine);