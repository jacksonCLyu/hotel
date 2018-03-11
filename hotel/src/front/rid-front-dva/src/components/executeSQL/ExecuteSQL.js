import React from 'react';
import { connect } from 'dva';
import { Button, Select, Upload, Icon, Form, Input, Modal } from 'antd';
import { routerRedux, Link } from 'dva/router';
import { URL } from '../../constants';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;
class ExecuteSQL extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "block",
            file: "none"
        }
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
    submitSQL = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.mode == 1) {
                    if (!values.sqlText) {
                        Modal.warning({
                            content: "SQL为空",
                        });
                        return;
                    }
                    this.props.dispatch({
                        type: 'executeSQL/addSqlExamine',
                        payload: {
                            resourceId: values.resourceId,
                            desc: values.describe,
                            sqlType: values.sqlType,
                            sql: values.sqlText,
                            jumpPage: () => {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/sqlExamine/sqlDEVP'
                                }));
                            }
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
                        type: 'executeSQL/addSqlFileExamineNew',
                        payload: {
                            resourceId: values.resourceId,
                            desc: values.describe,
                            sqlType: values.sqlType,
                            jumpPage: () => {
                                this.props.dispatch(routerRedux.push({
                                    pathname: '/sqlExamine/sqlDEVP'
                                }));
                            }
                        }
                    })
                }
            }
        });
    }
    render() {
        const props = this.props;
        let { resourceId } = props;
        const { getFieldDecorator } = props.form;
        var url = "request/executeSQL/" + resourceId;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        return (
            <MainLayout location={location} sider="system" url={url}>
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
                    <FormItem label="SQL类型:" {...formItemLayout}>
                        {getFieldDecorator('sqlType', {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                            initialValue: "2"
                        })(
                            <Select style={{ width: 120 }} >
                                <Option value="2">DML</Option>
                                <Option value="1">DDL</Option>
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
                            initialValue: "1"
                        })(
                            <Select style={{ width: 120 }}
                                onChange={this.sqlType}>
                                <Option value="1">文本</Option>
                                <Option value="2">文件</Option>
                            </Select>
                            )}
                    </FormItem>
                    <FormItem label="SQL:" {...formItemLayout} style={{ display: this.state.text }}>
                        {getFieldDecorator('sqlText')(
                            <div className="text" >
                                <textarea rows="5" cols="100" />
                            </div>
                        )}
                    </FormItem>
                    <FormItem label="SQL文件:"  {...formItemLayout} style={{ display: this.state.file }} >
                        {getFieldDecorator('sqlFile')(
                            <div className="file">
                                <Upload action={URL + 'api/sqlExamine/addSqlFile'} name='file' >
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
                        })(
                            <textarea rows="5" cols="100" />
                            )}
                    </FormItem>
                    <div className="clearfix" style={{ marginLeft: 1100 }}>
                        <Button className="pull-right" type="primary" onClick={this.submitSQL}>提交</Button>
                    </div>
                </Form>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { resourceId } = state.executeSQL;
    return {
        loading: state.loading.models.executeSQL,
        resourceId,
    }
}
ExecuteSQL = Form.create()(ExecuteSQL);
export default connect(mapStateToProps)(ExecuteSQL);