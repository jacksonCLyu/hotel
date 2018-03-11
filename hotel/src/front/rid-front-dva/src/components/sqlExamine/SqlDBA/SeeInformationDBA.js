import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Modal, Select, Row, Col } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../../MainLayout';
import Moment from 'moment'
import sqlPre from '../../pre.css'
import table from '../table.css'
var implement = 'none'
var back = 'none'
var err = 'none'
class SeeInformationDBA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailsModel: false
        };
    }

    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/sqlExamine/sqlDBA'
        }));
    }
    implement = () => {
        this.props.dispatch({
            type: 'seeInformationDBA/implementSql',
            payload: {
                id: this.props.id,
                callback: () => {
                    this.props.dispatch(routerRedux.push({
                        pathname: '/sqlExamine/sqlDBA'
                    }));
                },
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
            update, stateName, submitType, items } = props;
        var elapse = 'none';
        implement = 'none';
        back = 'none'
        let result = 'none'
        if (items.length > 0) {
            result = 'block'
        }
        if (elapseTime != undefined || elapseTime != null) {
            elapse = 'block'
        } else {
            elapse = 'none';
        }
        if (sqlState != 6) {
            if (sqlState == 3 || sqlState == 4) {
                implement = 'block';
                back = 'block'
            } else {
                back = 'block'
            }
        } else {
            back = 'block'
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
        var url = "/sqlExamine/sqlDBA"
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
                <div className="clearfix">
                    <Button className="pull-right" onClick={this.back} style={{ display: back }}>返回</Button>
                    &nbsp;
                    <Button className="pull-right" type="primary" onClick={this.implement} style={{ display: implement }}>执行</Button>
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
                        <Col className={sqlPre.col} >
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
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { dbName, createTime, applicant, sqlState, id, examineIp, examinePort, exerciserName,
        updateTime, elapseTime, masterIp, masterPort, description, sql, error, errorSql, create,
        update, stateName, submitType, items } = state.seeInformationDBA;
    return {
        loading: state.loading.models.seeInformationDBA,
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
        submitType,
        items
    };
}
export default connect(mapStateToProps)(SeeInformationDBA);