import React from 'react';
import { connect } from 'dva';
import { Tag, Select, Tooltip, Icon, Input, Form, Modal, Button, message } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../../MainLayout';
const FormItem = Form.Item;
class AddFlow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            modalVisible: false,
            taskTemplateId: null,
            //创建工作流参数
            crateFlowParams: {},
            models: false,
            //工作流名称
            name: null,
            templateID: null,
            flowTask: [],
            params: {},
            flowTaskId: null,
            flowTask: []
        };
    }
    selectTemplates = (value) => {
        let listTemplates = this.props.listTemplates
        listTemplates = listTemplates.filter(it => it.id == value)
        this.setState({
            templateID: listTemplates[0].id,
            tags: listTemplates[0].flowTemplateTasks
        })
    }
    showInput = (value) => {
        let taskTemplateId = value.target.name
        this.props.dispatch({
            type: 'addOrUpdteFlow/getServerAndConfig',
        });
        let flowTasks = this.props.flowTasks
        let flowTask
        if (flowTasks.length > 0) {
            flowTask = flowTasks.filter(it => it.templateTaskId == taskTemplateId)
        }
        let params = {}
        if (flowTask != null && flowTask.length > 0) {
            params = flowTask[0].params
            params = JSON.parse(params);
            this.setState(
                { modalVisible: true, flowTaskId: flowTask[0].id, flowTask: flowTask, params: params, taskTemplateId: taskTemplateId },
            );
        } else {
            this.setState(
                { modalVisible: true, taskTemplateId: taskTemplateId, params: params },
            );
        }
    }
    Cancel = () => {
        this.setState({
            modalVisible: false,
            models: false
        })
    }
    model = () => {
        let reusable = this.props.reusable
        this.setState({
            models: true,
            name: this.props.name,
            reusable: reusable == null || reusable == undefined ? 0 : reusable
        })
    }
    Ok = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let crateFlowParams = this.state.crateFlowParams;
                crateFlowParams[this.state.taskTemplateId] = values
                this.setState({ crateFlowParams: crateFlowParams })
                this.props.form.resetFields();
                this.setState({
                    modalVisible: false,
                })
            }
        });
    }
    reusableOk = () => {
        let templateID = this.state.templateID
        let crateFlowParams = this.state.crateFlowParams
        let name = this.state.name
        let taskFlowId = this.props.taskFlowId
        if (templateID == null) {
            if (taskFlowId == null) {
                Modal.warning({
                    content: "请选择模版",
                });
                this.setState({
                    models: false
                })
                return;
            }
        }
        if (crateFlowParams.length == 0) {
            if (taskFlowId == null) {
                Modal.warning({
                    content: "请添加任务参数",
                });
                this.setState({
                    models: false
                })
                return;
            }
        }
        if (name == null || name.length == 0) {
            message.warning("请输入工作流名称")
            return;
        }
        if (taskFlowId == null) {
            this.props.dispatch({
                type: 'addOrUpdteFlow/addFlow',
                payload: {
                    templateID: templateID,
                    crateFlowParams: crateFlowParams,
                    name: name,
                    callback: () => {
                        this.props.dispatch(routerRedux.replace({
                            pathname: '/system/taskFlow',
                        }))
                    },
                }
            })
        } else {
            this.props.dispatch({
                type: 'addOrUpdteFlow/updateFlow',
                payload: {
                    id: taskFlowId,
                    templateID: this.props.flowTasks[0].templateTask.templateId,
                    crateFlowParams: crateFlowParams,
                    name: name,
                    callback: () => {
                        this.props.dispatch(routerRedux.replace({
                            pathname: '/system/taskFlow',
                        }))
                    },
                }
            })
        }

    }
    inputValue = (value) => {
        let name = value.target.value;
        this.setState({ name: name })
    }
    selectValue = (value) => {
        this.setState({ reusable: value })
    }
    render() {
        const props = this.props;
        let { listTemplates, config, serverIP, name, flowTasks, taskFlowId, restartFlg } = props;
        const { getFieldDecorator, resetFields } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url = "/system/taskFlow";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="参数设置"
                    confirmLoading={props.loading}
                    onOk={this.Ok}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        <FormItem label="服务器IP" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('serverID', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.params != null ? this.state.params.serverID : null
                            })(
                                <Select style={{ width: "100%" }} showSearch
                                    optionFilterProp="children"
                                    placeholder="请选择服务器IP"
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
                        <FormItem label="数据库名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('db_name', {
                                initialValue: this.state.params != null ? this.state.params.db_name : null

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
                                initialValue: this.state.params != null ? this.state.params.port : null
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="版本" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('mysql_version', {
                                initialValue: this.state.params != null ? this.state.params.mysql_version : null
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
                                initialValue: this.state.params != null ? this.state.params.configID : null
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
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.models}
                    title="工作流名称"
                    confirmLoading={props.loading}
                    onOk={this.reusableOk}
                    onCancel={this.Cancel}>
                    <label>工作流名称:</label>
                    &nbsp;
                    <Input style={{ width: "80%" }} defaultValue={name != null ? name : null} onChange={this.inputValue} />
                </Modal>
                <div className="pull-left">
                    {
                        restartFlg == 0 ? taskFlowId == null ? <Select style={{ width: 150 }} showSearch
                            optionFilterProp="children"
                            placeholder="请选择模版"
                            onSelect={this.selectTemplates}
                        >
                            {
                                listTemplates.map((data, index) =>
                                    <Option value={data.id} key={index}>{data.name}</Option>
                                )
                            }
                        </Select> : "修改工作流：" : "重试工作流:"
                    }
                    <br />
                    <br />
                    <div>
                        {
                            this.state.tags.length > 0 ?
                                this.state.tags.map((tag, index) => {
                                    const isLongTag = tag.name.length > 20;
                                    const tagElem = (
                                        <Tag key={tag.id} value={tag.id} >
                                            <a name={tag.id} onClick={this.showInput}> {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}</a>
                                        </Tag>
                                    );
                                    return isLongTag ? <Tooltip title={tag.name} key={tag.id}>{tagElem}</Tooltip> : tagElem;
                                }) :
                                flowTasks.map((tag, index) => {
                                    const isLongTag = tag.templateTask.name.length > 20;
                                    const tagElem = (
                                        <Tag key={tag.templateTaskId} value={tag.templateTaskId} >
                                            <a name={tag.templateTaskId} onClick={this.showInput}> {isLongTag ? `${tag.templateTask.name.slice(0, 20)}...` : tag.templateTask.name}</a>
                                        </Tag>
                                    );
                                    return isLongTag ? <Tooltip title={tag.templateTask.name} key={tag.templateTaskId}>{tagElem}</Tooltip> : tagElem;
                                })
                        }
                    </div>
                    <br />
                    <div className="pull-right" style={{ marginLeft: 1100 }}>
                        {
                            restartFlg == 1 ? <Button onClick={this.model} className="pull-right" type="primary" >启动</Button> :
                                <Button onClick={this.model} className="pull-right" type="primary" icon="plus">保存</Button>
                        }
                        <Button onClick={this.black} className="pull-right"><Link to="/system/taskFlow">返回</Link></Button>
                    </div>
                </div>
            </MainLayout>
        );
    }
}

const mapStateToProps = (state) => {
    let { listTemplates, config, serverIP, name, flowTasks, taskFlowId, restartFlg } = state.addOrUpdteFlow;
    return {
        loading: state.loading.models.addOrUpdteFlow,
        listTemplates,
        config,
        serverIP,
        name,
        flowTasks,
        taskFlowId,
        restartFlg,

    };
}
AddFlow = Form.create()(AddFlow);
export default connect(mapStateToProps)(AddFlow);