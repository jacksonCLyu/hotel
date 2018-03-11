import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal, Select, Card, Row, Col } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';


const FormItem = Form.Item;

class DbResource extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            detailsModel: false,
            modalVisible: false,
            displayDB: 'block',
            displayRedis: 'none',
            DB: 'none',
            redis: 'none',
            page: 1,
            type: 1,
            serverIP: null,
            resourceName: null,
            resourcePort: null,
            //标致是mysql资源或rides:1:mysql,2:redis
            flg: 1
        };
    }
    // 创建实例
    exampleAdd = () => {
        this.props.form.resetFields();
        this.props.dispatch({
            type: 'dbResource/serverIpAndConfig',
        });
        this.setState({
            modalVisible: true,
        });
    }
    //启动实例
    startExample = (id) => {
        this.props.dispatch({
            type: 'dbResource/start',
            payload: {
                id,
                jumpPage: () => {
                    this.props.dispatch(routerRedux.push({
                        pathname: '/system/exampleLog'
                    }));
                }
            }
        });
    }
    resourceType = (value) => {
        if (value === 1) {
            this.setState({
                DB: 'block',
                redis: 'none'
            });
        } else if (value === 2) {
            this.setState({
                DB: 'none',
                redis: 'block'
            })
        }
    }
    // 取消
    exampleCancel = () => {
        this.setState({
            modalVisible: false,
            DB: 'none',
            redis: 'none'
        });
    }
    //关闭详情弹窗
    detailsCancel = () => {
        this.setState({
            detailsModel: false
        });
    }
    // 添加/编辑 -> 确认
    exampleOk = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'dbResource/add',
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
                        jumpPage: () => {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/system/exampleLog'
                            }));
                        }
                    }
                });
            }
        });

    }
    // 删除
    delDbResource = (id) => {
        this.props.dispatch({
            type: 'dbResource/del',
            payload: {
                id,
                page: this.state.page,
                type: this.state.type,
                serverIP: this.state.serverIP,
                resourceName: this.state.resourceName,
                resourcePort: this.state.resourcePort
            }
        });
    }
    //资源详情
    detailDB = (id) => {
        this.setState({
            detailsModel: true
        });
        this.props.dispatch({
            type: 'dbResource/detailDB',
            payload: {
                dbID: id,
            }
        });
    }
    // 改变页面mysql
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.setState({
            page: page
        });
        this.props.dispatch({
            type: 'dbResource/listInit',
            payload: {
                page: page,
                type: this.props.type,
                server: this.props.server,
                resourceName: this.props.resourceName,
                resourcePort: this.props.resourcePort
            }
        });
    }

    // redis
    redisPageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.props.dispatch({
            type: 'dbResource/queryRedis',
            payload: {
                page: page,
            }
        });
    }
    // 查询
    queryResource = () => {
        this.props.form.validateFields((err, values) => {
            this.setState({
                type: values.selectType,
                serverIP: values.selectServerIP,
                resourceName: values.resourceName,
                resourcePort: values.resourcePort
            });
            if (values.selectType === 1 || values.selectType === null) {
                this.setState({
                    displayDB: 'block',
                    displayRedis: 'none'
                });
                this.props.dispatch({
                    type: 'dbResource/queryDB',
                    payload: {
                        type: values.selectType,
                        serverIP: values.selectServerIP,
                        resourceName: values.resourceName,
                        resourcePort: values.resourcePort
                    }
                });
            } else if (values.selectType === 2) {
                this.setState({
                    displayDB: 'none',
                    displayRedis: 'block'
                });
                this.props.dispatch({
                    type: 'dbResource/queryRedis',
                    payload: {
                        page: 1,
                        redisIP: values.redisIP,
                        redisPort: values.redisPort,
                        redisName: values.redisName
                    }
                });
            }
        });
    }
    // 删除
    delRedis = (id) => {
        this.props.dispatch({
            type: 'dbResource/delRedis',
            payload: {
                id,
            }
        });
    }
    typeFlg = (value) => {
        this.setState({
            flg: value
        })
    }
    exampleRedisAdd=()=>{
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/resource/addRedis',
        }))
    }
    render() {

        const columns = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
                render: (text, record) => <a onClick={() => { this.detailDB(record.id) }}>{record.name}</a>
            },
            {
                title: 'ip地址',
                dataIndex: 'ip',
                key: 'ip',
            },
            {
                title: '端口',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (
                    <div>
                        <Link to={`/system/dbEdit/${record.id}`}>修改</Link>
                        &nbsp;
                        <Popconfirm title="确认启动?" onConfirm={() => { this.startExample(record.id) }}>
                            <a style={{ marginLeft: 10 }}>启动</a>
                        </Popconfirm>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delDbResource(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        const columns3 = [
            {
                title: '从库IP',
                dataIndex: 'ip',
                key: 'ip',
            },
            {
                title: '从库端口',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '从库版本',
                dataIndex: 'dbVersion',
                key: 'dbVersion',
            },
        ];
        const columns2 = [
            {
                title: '检查库IP',
                dataIndex: 'ip',
                key: 'ip',
            },
            {
                title: '检查库端口',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '检查库版本',
                dataIndex: 'dbVersion',
                key: 'dbVersion',
            },
        ];
        const columns1 = [
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Ip地址',
                dataIndex: 'ip',
                key: 'ip',
            },
            {
                title: '端口号',
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (
                    <div>
                        <Link to={`/system/resource/redisEdit/${record.id}`}>修改</Link>
                        &nbsp;
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delRedis(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        //取出props中的对应的值,例如取出list对应的值并赋值到dataSource中
        let { list: dataSource, total, page: current, config, serverIP, listType, listServer, listRedis, totalRedis, pageRedis,
            slaves, examine, examineId, dbVersion, name, port, ip, id, typeName, type, server, resourceName, resourcePort } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url = "/system/dbResourceList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="创建实例"
                    onOk={this.exampleOk}
                    confirmLoading={props.loading}
                    onCancel={this.exampleCancel}>
                    <Form layout="horizontal">
                        <FormItem label="资源类型" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('resourceType', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择资源类型"
                                    onChange={this.resourceType}
                                >
                                    {
                                        listType.map((data, index) =>
                                            <Option value={data.type} key={index}>{data.typeName}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                        <FormItem label="服务器" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('serverID', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择服务器"
                                >
                                    {
                                        serverIP.map((data, index) => {

                                            return data.remarks.length == 0 ?
                                                <Option value={data.id.toString()} key={index}>{data.ip}</Option> :
                                                <Option value={data.id.toString()} key={index}>{data.remarks}({data.ip})</Option>
                                        }
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                        <div className="DB" style={{ display: this.state.DB }}>
                            <FormItem label="数据库名称" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('db_name', {

                                })(<Input />)}
                            </FormItem>
                            <FormItem label="端口号" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('port', {
                                    rules: [
                                        {
                                            pattern: '^(1(02[4-9]|0[3-9][0-9]|[1-9][0-9]{2})|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$',
                                            message: '端口号在1024-65535之间'
                                        },
                                    ],
                                })(<Input />)}
                            </FormItem>
                            <FormItem label="版本" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('mysql_version', {

                                })(
                                    <Select style={{ width: "100%" }}
                                        optionFilterProp="children"
                                        placeholder="请选择MySQL版本"
                                    >
                                        <Option value="5.6">5.6</Option>
                                        <Option value="5.7">5.7</Option>
                                    </Select>
                                    )}
                            </FormItem>
                            <FormItem label="配置模版" hasFeedback {...formItemLayout}>
                                {getFieldDecorator('configID', {

                                })(
                                    <Select style={{ width: "100%" }} showSearch
                                        optionFilterProp="children"
                                        placeholder="请选择配置模版"
                                    >
                                        {
                                            config.map((data, index) =>
                                                <Option value={data.id.toString()} key={index}>{data.name}</Option>
                                            )
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                        </div>
                        <div className="redis" style={{ display: this.state.redis }}>

                        </div>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.detailsModel}
                    title="资源详情"
                    confirmLoading={props.loading}
                    onCancel={this.detailsCancel}
                    footer={[
                        <Button key="back" type="primary" onClick={this.detailsCancel}>返回</Button>,
                    ]}
                >
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">资源类型: {typeName}</div>
                        </Col>
                        <Col className="gutter-row" span={15}>
                            <div className="gutter-box">资源名称: {name}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">主库IP: {ip}</div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">主库端口: {port}</div>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <div className="gutter-box">主库版本: {dbVersion}</div>
                        </Col>
                    </Row>
                    <Card title="从库管理" bordered={false}>
                        <Table
                            columns={columns3}
                            dataSource={slaves}
                            rowKey={record => record.id}
                            loading={props.loading}
                            pagination={false}
                        />
                    </Card>
                    <Card title="检查库管理" bordered={false}>
                        <Table
                            columns={columns2}
                            dataSource={examine}
                            rowKey={record => record.id}
                            loading={props.loading}
                            pagination={false}
                        />
                    </Card>
                </Modal>
                <div className="clearfix">
                    <div className="pull-left">
                        <Form layout="inline">
                            <FormItem >
                                {getFieldDecorator('selectType', {
                                    initialValue: 1
                                })(
                                    <Select style={{ width: 150 }} showSearch
                                        optionFilterProp="children"
                                        placeholder="请选择资源类型"
                                        onSelect={this.typeFlg}
                                    >
                                        {
                                            listType.map((data, index) =>
                                                <Option value={data.type} key={index}>{data.typeName}</Option>
                                            )
                                        }
                                    </Select>
                                    )}
                            </FormItem>
                            {
                                this.state.flg == 1 ?
                                    <FormItem >
                                        {getFieldDecorator('selectServerIP')(
                                            <Select style={{ width: 150 }} showSearch
                                                optionFilterProp="children"
                                                placeholder="请选择服务器IP"
                                                allowClear={true}
                                            >
                                                {
                                                    listServer.map((data, index) =>
                                                        <Option value={data.ip} key={index}>{data.ip}</Option>
                                                    )
                                                }
                                            </Select>
                                        )}
                                    </FormItem> :
                                    <FormItem>
                                        {getFieldDecorator('redisIP')(
                                            <Input placeholder="Ip地址" />
                                        )}
                                    </FormItem>
                            }
                            {
                                this.state.flg == 1 ?
                                    <FormItem >
                                        {getFieldDecorator('resourcePort', {
                                        })(
                                            <Input placeholder="端口号"
                                            />
                                            )}
                                    </FormItem> :
                                    <FormItem>
                                        {getFieldDecorator('redisPort')(
                                            <Input placeholder="端口号" />
                                        )}
                                    </FormItem>
                            }
                            {
                                this.state.flg == 1 ?
                                    <FormItem >
                                        {getFieldDecorator('resourceName', {
                                        })(
                                            <Input placeholder="资源名称"
                                            />
                                            )}
                                    </FormItem> :
                                    <FormItem>
                                        {getFieldDecorator('redisName')(
                                            <Input placeholder="名称" />
                                        )}
                                    </FormItem>
                            }
                            <Button onClick={this.queryResource}  type="primary" icon="search" >筛选</Button>
                        </Form>
                    </div>
                    {
                        this.state.type == 1 ?
                            <div className="pull-right">
                                <Button onClick={this.exampleAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                            </div> :
                            <div className="pull-right">
                                <Button onClick={this.exampleRedisAdd} className="pull-right" type="primary" icon="plus">新增</Button>
                            </div>
                    }

                </div>
                <div className="box20" />
                <div className="dbResource" style={{ display: this.state.displayDB }}>
                    <Table
                        columns={columns}
                        dataSource={dataSource || []}
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
                </div>
                <div className="redisResource" style={{ display: this.state.displayRedis }}>
                    <Table
                        columns={columns1}
                        dataSource={listRedis}
                        rowKey={record => record.id}
                        loading={props.loading}
                        pagination={{
                            total: totalRedis,
                            current: pageRedis,
                            pageSize: 10
                        }}
                        //修改页面
                        onChange={this.redisPageChangeHandler}
                    />
                </div>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list, total, page, config, serverIP, listType, listServer, listRedis, totalRedis, pageRedis
        , slaves, examine, examineId, dbVersion, name, port, ip, id, typeName
        , type, server, resourceName, resourcePort } = state.dbResource;
    return {
        loading: state.loading.models.dbResource,
        list,
        total,
        page,
        config,
        serverIP,
        listType,
        listServer,
        listRedis,
        totalRedis,
        pageRedis,
        slaves,
        examine,
        examineId,
        dbVersion,
        name,
        port,
        ip,
        id,
        typeName,
        type,
        server,
        resourceName,
        resourcePort,
    };
}
DbResource = Form.create()(DbResource);
export default connect(mapStateToProps)(DbResource);