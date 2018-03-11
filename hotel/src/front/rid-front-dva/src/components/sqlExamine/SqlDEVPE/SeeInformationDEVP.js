import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Select, Upload, Icon, Modal, Row, Col } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { URL } from '../../../constants';
import MainLayout from '../../MainLayout';
import sqlPre from '../../pre.css'
import table from '../table.css'
const FormItem = Form.Item;
var exitButton = 'none'
var deleteButton = 'none'
var err = 'none'
class SeeInformationDEVP extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            exhibition: "block",
            exit: "none",
            text: "block",
            file: "none",
            detailsModel: false
        };
    }
    sqlType = (value) => {
        if (value == 1) {
            this.setState({
                text: 'block',
                file: 'none'
            });
        } else if (value == 2) {
            this.setState({
                text: 'none',
                file: 'block'
            })
        }
    }
    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/sqlExamine/sqlDEVP'
        }));
    }
    break = () => {
        this.setState({
            exit: "none",
            exhibition: "block"
        })
    }
    exit = () => {
        this.setState({
            exit: "block",
            exhibition: "none"
        })
    }
    delete = () => {
        this.props.dispatch({
            type: 'seeInformationDEVP/delete',
            payload: {
                id: this.props.id,
                callback: () => {
                    this.props.dispatch(routerRedux.push({
                        pathname: '/sqlExamine/sqlDEVP'
                    }));
                },
            }
        });
    }
    submitSQL = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.mode == '文本') {
                    values.mode = '1'
                } else if (values.mode == '文件') {
                    values.mode = '2'
                }
                if (values.sqlType == 'DDL') {
                    values.sqlType = '1'
                } else if (values.sqlType == 'DML') {
                    values.sqlType = '2'
                }
                if (values.mode == 1) {
                    if (!values.sqlText) {
                        Modal.warning({
                            content: "SQL为空",
                        });
                        return;
                    }
                    this.props.dispatch({
                        type: 'seeInformationDEVP/addSqlExamine',
                        payload: {
                            resourceId: values.resourceId,
                            desc: values.describe,
                            sqlType: values.sqlType,
                            sql: values.sqlText,
                            id: values.sqlID,
                            callback: () => {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/sqlExamine/sqlDEVP'
                                }));
                            },
                        }
                    });
                } else {
                    if (!values.sqlFile) {
                        Modal.warning({
                            content: "SQL文件为空",
                        });
                        return;
                    }
                    this.props.dispatch({
                        type: 'seeInformationDEVP/addSqlFileExamineNew',
                        payload: {
                            resourceId: values.resourceId,
                            desc: values.describe,
                            sqlType: values.sqlType,
                            id: values.sqlID,
                            callback: () => {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/sqlExamine/sqlDEVP'
                                }));
                            },
                        }
                    })
                }
            }
        });
    }
    detailSql = () => {
        this.setState({
            detailsModel: true
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
    render() {
        const props = this.props;
        let { dbName, createTime, applicant, sqlState, id, examineIp, examinePort, exerciserName,
            updateTime, elapseTime, masterIp, masterPort, description, sql, error, errorSql, create,
            update, stateName, resourceId, type, submitType, items } = props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        let result = 'none'
        if (items.length > 0) {
            result = 'block'
        }
        exitButton = 'none'
        deleteButton = 'none'
        var elapse = 'none';
        if (elapseTime != undefined || elapseTime != null) {
            elapse = 'block'
        } else {
            elapse = 'none';
        }
        if (sqlState != 6) {
            if (sqlState != 7 && sqlState != 8) {
                exitButton = 'block'
                deleteButton = 'block'
            }
        }
        if (sqlState == 2 || sqlState == 5) {
            var color = '#F00'
        } else if (sqlState == 6) {
            var color = '#00a65a'
        }

        err = 'none'
        if (error != null) {
            err = 'block'
        }
        var submit = 'block';
        var submitFile = 'none';
        if (submitType == 2) {
            submit = 'none';
            submitFile = 'block';
        }
        var url = "/sqlExamine/sqlDEVP"
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.detailsModel}
                    title="SQL详情"
                    confirmLoading={props.loading}
                    onOk={this.detailsOk}
                    onCancel={this.detailsCancel}>
                    <div>
                        <textarea rows="10" cols="80" value={sql} readOnly />
                    </div>
                </Modal>
                <div style={{ display: this.state.exhibition }}>
                    <div className="clearfix">
                        <Button className="pull-right" onClick={this.back}>返回</Button>
                        &nbsp;
                    <Button className="pull-right" onClick={this.delete} style={{ display: deleteButton }}>撤销</Button>
                        &nbsp;
                    <Button className="pull-right" onClick={this.exit} style={{ display: exitButton }}>修改</Button>
                    </div>
                    <br />
                    <div  >
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <div className="gutter-box">id: {id}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <div className="gutter-box">库名: {dbName}</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">实验库: {examineIp}:{examinePort}</div>
                            </Col>
                            <Col className="gutter-row" span={4}>
                                <div className="gutter-box">主库: {masterIp}:{masterPort}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <div className="gutter-box">申请人: {applicant}</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">申请时间: {create}</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">进度: {stateName}</div>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={4}>
                                <div className="gutter-box">审核人: {exerciserName}</div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="gutter-box">审核时间: {update}</div>
                            </Col>
                            <Col className="gutter-row" span={6} style={{ display: elapse }}>
                                <div className="gutter-box">执行时间: {elapseTime}&nbsp;s</div>
                            </Col>
                        </Row>
                        <Row gutter={16} >
                            <Col className="gutter-row" >
                                <div className="gutter-box"> 描述: {description}</div>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: submit }}>
                            <Col className={sqlPre.col}>
                                SQL:<pre className={sqlPre.pre} >{sql}</pre>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: submitFile }}>
                            <Col className="gutter-row" >
                                SQL:&nbsp;&nbsp;<a onClick={() => { this.detailSql() }}>SQL脚本</a>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: result }}>
                            <Col className="gutter-row" >
                                <div style={{ maxHeight: 400, overflowY: "auto" }}>
                                    <table className={table.table} bordercolor="#0000FF">
                                        <tr className={table.tr}>
                                            <th className={table.td}>执行SQL</th>
                                            <th className={table.td}>受影响行</th>
                                        </tr>
                                        {items.map(data =>
                                            <tr className={table.tr}>
                                                <td className={table.td}>{data.sqlItem}</td>
                                                <td className={table.td}>{data.rowAffected}</td>
                                            </tr>
                                        )}
                                    </table>
                                </div>
                            </Col>
                        </Row>
                        <br />
                        <Row gutter={16} style={{ display: err }}>
                            <Col className={sqlPre.col}  >
                                异常原因：<pre className={sqlPre.pre} >{error}</pre>
                            </Col>
                        </Row>
                        <Row gutter={16} style={{ display: err }}>
                            <Col className={sqlPre.col}  >
                                异常SQL:<pre className={sqlPre.pre} >{errorSql}</pre>
                            </Col>
                        </Row>

                    </div>
                </div>
                <div style={{ display: this.state.exit }}>
                    <Form>
                        <FormItem label="资源ID:"{...formItemLayout} style={{ display: "none" }}>
                            {getFieldDecorator('resourceId', {
                                rules: [
                                    {
                                        required: true,
                                    }
                                ],
                                initialValue: resourceId
                            })(<Input readOnly />)}
                        </FormItem>
                        <FormItem label="sqlID:"{...formItemLayout} style={{ display: "none" }}>
                            {getFieldDecorator('sqlID', {
                                rules: [
                                    {
                                        required: true,
                                    }
                                ],
                                initialValue: id
                            })(<Input readOnly />)}
                        </FormItem>
                        <FormItem label="SQL类型:" {...formItemLayout}>
                            {getFieldDecorator('sqlType', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: type == 1 ? 'DDL' : 'DML'
                            })(
                                <Select style={{ width: 120 }} >
                                    <Option value='2'>DML</Option>
                                    <Option value='1'>DDL</Option>
                                </Select>
                                )}
                        </FormItem>
                        <FormItem label="方式:"{...formItemLayout}>
                            {getFieldDecorator('mode', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: '文本'
                            })(
                                <Select style={{ width: 120 }}
                                    onChange={this.sqlType}>
                                    <Option value='1'>文本</Option>
                                    <Option value='2'>文件</Option>
                                </Select>
                                )}
                        </FormItem>
                        <FormItem label="SQL:" {...formItemLayout} style={{ display: this.state.text }}>
                            {getFieldDecorator('sqlText', {
                                initialValue: sql
                            })(
                                <textarea rows="5" cols="100" />
                                )}
                        </FormItem>
                        <FormItem label="SQL文件:"  {...formItemLayout} style={{ display: this.state.file }} >
                            {getFieldDecorator('sqlFile')(
                                <div className="file">
                                    <Upload action={URL + 'api/sqlExamine/addSqlFile'} name='file'>
                                        <Button>
                                            <Icon type="upload" />请选择文件
                                    </Button>
                                    </Upload>
                                </div>
                            )}
                        </FormItem>
                        <FormItem label="描述" {...formItemLayout}>
                            {getFieldDecorator('describe', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: description
                            })(
                                <textarea rows="5" cols="100" />
                                )}
                        </FormItem>
                        <div className="clearfix" style={{ marginLeft: 1100 }}>
                            <Button className="pull-right" type="primary" onClick={this.submitSQL}>提交</Button>
                            <Button className="pull-right" onClick={this.break}>返回</Button>
                        </div>
                    </Form>
                </div>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { dbName, createTime, applicant, sqlState, id, examineIp, examinePort, exerciserName,
        updateTime, elapseTime, masterIp, masterPort, description, sql, error, errorSql, create,
        update, stateName, resourceId, type, submitType, items } = state.seeInformationDEVP;
    return {
        loading: state.loading.models.seeInformationDEVP,
        dbName,
        createTime,
        applicant,
        sqlState,
        id,
        examineIp,
        examinePort,
        exerciserName,
        updateTime,
        elapseTime,
        masterIp,
        masterPort,
        description,
        sql,
        error,
        errorSql,
        create,
        update,
        stateName,
        resourceId,
        type,
        submitType,
        items
    };
}
SeeInformationDEVP = Form.create()(SeeInformationDEVP);
export default connect(mapStateToProps)(SeeInformationDEVP);