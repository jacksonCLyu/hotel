import { Button, Form, Input, Select, Card, Table, Popconfirm, Col, Row, Divider, message } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../../MainLayout';
import styles from '../../style.less';
import assign from 'core-js/library/fn/object/assign'
const FormItem = Form.Item;
class Db extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slavesData: null,
            examineData: null,
            //用来标记主库,默认为true,当选择删除时只有一条数据时为false
            slavesFlg: true
        };
        this.cacheData = this.props.slaves.map(item => ({ ...item }));
        this.cacheDataExamine = this.props.examine.map(item => ({ ...item }));
    }
    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/system/dbResourceList'
        }));
    }
    dbResourceSave = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'db/edit',
                    payload: {
                        id: this.props.id,
                        dbName: values.name,
                        ip: values.ip,
                        port: values.port,
                        dbVersion: values.dbVersion,
                        slaves: this.state.slavesData === null ? this.props.slaves : this.state.slavesData,
                        examine: this.state.examineData === null ? this.props.examine : this.state.examineData,
                        callback: () => {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/system/dbResourceList'
                            }))
                        }
                    }
                });
            }
        });
    }

    handleFieldChangeSlaves(e, fieldName, id) {
        const newData = [...this.state.slavesData];
        const target = this.getRowByKeySlaves(id);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({ slavesData: newData });
        }
    }
    saveRowSlaves(e, id) {
        e.persist();
        setTimeout(() => {
            if (document.activeElement.tagName === 'INPUT' &&
                document.activeElement !== e.target) {
                return;
            }
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            var inspectPort = /^(1(02[4-9]|0[3-9][0-9]|[1-9][0-9]{2})|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
            const target = this.getRowByKeySlaves(id);
            if(!inspectPort.test(target.port)){
                message.error('端口号不正确,请检查');
                return;
            }
            if (!target.ip || !target.port || !target.dbVersion) {
                message.error('请填写完整信息。');
                e.target.focus();
                return;
            }
            delete target.isNew;
            this.toggleEditableSlaves(e, id);
        }, 10);
    }
    getRowByKeySlaves(id) {
        let slavesData = this.state.slavesData;
        if (slavesData == null || slavesData.length == 0) {
            return this.props.slaves.filter(item => item.id === id)[0];
        } else {
            return this.state.slavesData.filter(item => item.id === id)[0];
        }

    }
    index = 0;
    cacheOriginData = {};
    toggleEditableSlaves(e, id) {
        e.preventDefault();
        const target = this.getRowByKeySlaves(id);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[id] = { ...target };
            }
            target.editable = !target.editable;
            let slavesData = this.state.slavesData;
            if (slavesData == null || slavesData.length == 0) {
                this.setState({ slavesData: [...this.props.slaves] });
            } else {
                this.setState({ slavesData: [...slavesData] });
            }

        }
    }
    handleKeyPressSlaves(e, id) {
        if (e.id === 'Enter') {
            this.saveRowSlaves(e, id);
        }
    }
    newMemberSlaves = () => {
        let slavesData = this.state.slavesData
        let slavesFlg = this.state.slavesFlg
        let newData;
        if (slavesData == null) {
            if (slavesFlg) {
                newData = [...this.props.slaves]
            } else {
                newData = []
            }
        } else {
            newData = [...slavesData]
        }
        newData.push({
            id: this.index,
            ip: '',
            port: '',
            dbVersion: '',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ slavesData: newData });
    }
    removeSlaves(id) {
        let slavesData = this.state.slavesData;
        if (slavesData == null || slavesData.length == 0) {
            this.setState({
                slavesFlg: false
            })
            const newData = this.props.slaves.filter(item => item.id !== id);
            this.setState({ slavesData: newData });
        } else {
            const newData = this.state.slavesData.filter(item => item.id !== id);
            this.setState({ slavesData: newData });
        }
    }
    cancelSlaves(e, id) {
        this.clickedCancel = true;
        e.preventDefault();
        const target = this.getRowByKeySlaves(id);
        if (this.cacheOriginData[id]) {
            assign(target, this.cacheOriginData[id]);
            target.editable = false;
            delete this.cacheOriginData[id];
        }
        this.setState({ slavesData: [...this.state.slavesData] });
    }

    handleFieldChangeExamine(e, fieldName, id) {
        const newData = [...this.state.examineData];
        const target = this.getRowByKeyExamine(id);
        if (target) {
            target[fieldName] = e.target.value;
            this.setState({ examineData: newData });
        }
    }
    saveRowExamine(e, id) {
        e.persist();
        setTimeout(() => {
            if (document.activeElement.tagName === 'INPUT' &&
                document.activeElement !== e.target) {
                return;
            }
            if (this.clickedCancel) {
                this.clickedCancel = false;
                return;
            }
            var inspectPort = /^(1(02[4-9]|0[3-9][0-9]|[1-9][0-9]{2})|[2-9][0-9]{3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/
            const target = this.getRowByKeyExamine(id);
            if(!inspectPort.test(target.port)){
                message.error('端口号不正确,请检查');
                return;
            }
            if (!target.ip || !target.port || !target.dbVersion) {
                message.error('请填写完整信息。');
                e.target.focus();
                return;
            }
            delete target.isNew;
            this.toggleEditableExamine(e, id);
        }, 10);
    }
    getRowByKeyExamine(id) {
        let examineData = this.state.examineData;
        if (examineData == null || examineData.length == 0) {
            return this.props.examine.filter(item => item.id === id)[0];
        } else {
            return this.state.examineData.filter(item => item.id === id)[0];
        }
    }
    index = 0;
    cacheOriginData = {};
    toggleEditableExamine(e, id) {
        e.preventDefault();
        const target = this.getRowByKeyExamine(id);
        if (target) {
            // 进入编辑状态时保存原始数据
            if (!target.editable) {
                this.cacheOriginData[id] = { ...target };
            }
            target.editable = !target.editable;
            let examineData = this.state.examineData;
            if (examineData == null || examineData.length == 0) {
                this.setState({ examineData: [...this.props.examine] });
            } else {
                this.setState({ examineData: [...examineData] });
            }
        }
    }
    handleKeyPressExamine(e, id) {
        if (e.id === 'Enter') {
            this.saveRowExamine(e, id);
        }
    }
    newMemberExamine = () => {
        let examineData = this.state.examineData
        let newData
        if (examineData == null) {
            newData = [];
        } else {
            newData = [...examineData];
        }
        newData.push({
            id: this.index,
            ip: '',
            port: '',
            dbVersion: '',
            editable: true,
            isNew: true,
        });
        this.index += 1;
        this.setState({ examineData: newData });
    }
    removeExamine(id) {
        let examineData = this.state.examineData;
        if (examineData == null || examineData.length == 0) {
            const newData = this.props.examine.filter(item => item.id !== id);
            this.setState({ examineData: newData });
        } else {
            const newData = this.state.examineData.filter(item => item.id !== id);
            this.setState({ examineData: newData });
        }
    }
    cancelExamine(e, id) {
        this.clickedCancel = true;
        e.preventDefault();
        const target = this.getRowByKeyExamine(id);
        if (this.cacheOriginData[id]) {
            assign(target, this.cacheOriginData[id]);
            target.editable = false;
            delete this.cacheOriginData[id];
        }
        let examineData=this.state.examineData
        if(examineData==null||examineData==undefined){
            examineData=[]
        }
        this.setState({ examineData: [...examineData] });
    }
    render() {
        const columns = [{
            title: '从库IP',
            dataIndex: 'ip',
            width: '25%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => this.handleFieldChangeSlaves(e, 'ip', record.id)}
                            onBlur={e => this.saveRowSlaves(e, record.id)}
                            onKeyPress={e => this.handleKeyPressSlaves(e, record.id)}
                            placeholder="从库IP"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '从库端口',
            dataIndex: 'port',
            width: '25%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => this.handleFieldChangeSlaves(e, 'port', record.id)}
                            onBlur={e => this.saveRowSlaves(e, record.id)}
                            onKeyPress={e => this.handleKeyPressSlaves(e, record.id)}
                            placeholder="从库端口"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '从库版本',
            dataIndex: 'dbVersion',
            width: '25%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => this.handleFieldChangeSlaves(e, 'dbVersion', record.id)}
                            onBlur={e => this.saveRowSlaves(e, record.id)}
                            onKeyPress={e => this.handleKeyPressSlaves(e, record.id)}
                            placeholder="从库版本"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={e => this.saveRowSlaves(e, record.id)}>保存</a>
                                <Divider type="vertical" />
                                <a onClick={() => this.removeSlaves(record.id)}>删除</a>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={e => this.saveRowSlaves(e, record.id)}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => this.cancelSlaves(e, record.id)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        <a onClick={e => this.toggleEditableSlaves(e, record.id)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.removeSlaves(record.id)}>删除</a>
                    </span>
                );
            },
        }];

        const columns1 = [{
            title: '检查库IP',
            dataIndex: 'ip',
            width: '25%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => this.handleFieldChangeExamine(e, 'ip', record.id)}
                            onBlur={e => this.saveRowExamine(e, record.id)}
                            onKeyPress={e => this.handleKeyPressExamine(e, record.id)}
                            placeholder="检查库IP"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '检查库端口',
            dataIndex: 'port',
            width: '25%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => this.handleFieldChangeExamine(e, 'port', record.id)}
                            onBlur={e => this.saveRowExamine(e, record.id)}
                            onKeyPress={e => this.handleKeyPressExamine(e, record.id)}
                            placeholder="检查库端口"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '检查库版本',
            dataIndex: 'dbVersion',
            width: '25%',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            onChange={e => this.handleFieldChangeExamine(e, 'dbVersion', record.id)}
                            onBlur={e => this.saveRowExamine(e, record.id)}
                            onKeyPress={e => this.handleKeyPressExamine(e, record.id)}
                            placeholder="检查库版本"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={e => this.saveRowExamine(e, record.id)}>保存</a>
                                <Divider type="vertical" />
                                <a onClick={() => this.removeExamine(record.id)}>删除</a>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={e => this.saveRowExamine(e, record.id)}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => this.cancelExamine(e, record.id)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        <a onClick={e => this.toggleEditableExamine(e, record.id)}>编辑</a>
                        <Divider type="vertical" />
                        <a onClick={() => this.removeExamine(record.id)}>删除</a>
                    </span>
                );
            },
        }];
        const props = this.props;
        let { slaves, examine, examineId, dbVersion, name, port, ip, id } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        var url = "/system/dbResourceList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Form layout="vertical" hideRequiredMark>
                    <Card title="主库信息" className={styles.card} bordered={true}>
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <FormItem label="资源类型:" >
                                    {getFieldDecorator('type', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                        initialValue: "MySQL"
                                    })(<Input readOnly />)}
                                </FormItem>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <FormItem label="资源名称:" >
                                    {getFieldDecorator('name', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                        initialValue: name || null
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                                <FormItem label="主库IP:" >
                                    {getFieldDecorator('ip', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                        initialValue: ip || null
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col lg={6} md={12} sm={24}>
                                <FormItem label="主库端口:">
                                    {getFieldDecorator('port', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                        initialValue: port || null
                                    })(<Input />)}
                                </FormItem>
                            </Col>
                            <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                                <FormItem label="主库版本:" >
                                    {getFieldDecorator('dbVersion', {
                                        rules: [
                                            {
                                                required: true,
                                            },
                                        ],
                                        initialValue: dbVersion || null
                                    })(
                                        <Select style={{ width: "100%" }}
                                            optionFilterProp="children"
                                            placeholder="请选择MySQL版本">
                                            <Option value="5.6">5.6</Option>
                                            <Option value="5.7">5.7</Option>
                                        </Select>)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Card>
                    <Card title="从库管理" className={styles.card} bordered={true}>
                        <Table
                            columns={columns}
                            dataSource={this.state.slavesData == null ? this.props.slaves : this.state.slavesData}
                            pagination={false}
                            rowClassName={(record) => {
                                return record.editable ? styles.editable : '';
                            }}
                        />
                        <Button
                            style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                            type="dashed"
                            onClick={this.newMemberSlaves}
                            icon="plus"
                        >
                            新增从库
                        </Button>
                    </Card>
                    <Card title="检查库管理" className={styles.card} bordered={true}>
                        <Table
                            columns={columns1}
                            dataSource={this.state.examineData == null ? this.props.examine : this.state.examineData}
                            pagination={false}
                            rowClassName={(record) => {
                                return record.editable ? styles.editable : '';
                            }}
                        />
                        {
                            this.state.examineData != null ? this.state.examineData.length == 0 ? <Button
                                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                                type="dashed"
                                onClick={this.newMemberExamine}
                                icon="plus"
                            > 新增检查库
                                </Button> : "" : this.props.examine.length == 0 ? <Button
                                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                                    type="dashed"
                                    onClick={this.newMemberExamine}
                                    icon="plus"
                                > 新增检查库
                            </Button> : ""

                        }
                    </Card>
                </Form>
                <div className="clearfix" style={{ marginLeft: 1100 }}>
                    <Button className="pull-right" type="primary" onClick={this.dbResourceSave}>确定</Button>
                    &nbsp;&nbsp;
                    <Button className="pull-right" onClick={this.back}>返回</Button>
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    const { slaves, examine, examineId, dbVersion, name, port, ip, id } = state.db;
    return {
        loading: state.loading.models.db,
        slaves,
        examine,
        examineId,
        dbVersion,
        name,
        port,
        ip,
        id
    };
}
Db = Form.create()(Db);
export default connect(mapStateToProps)(Db);
