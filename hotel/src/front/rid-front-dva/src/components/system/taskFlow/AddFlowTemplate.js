import React from 'react';
import { connect } from 'dva';
import { Tag, Select, Tooltip, Icon, Input, Form, Modal, Button } from 'antd';
import { routerRedux, Link } from 'dva/router';
import require from 'cuid'
import MainLayout from '../../MainLayout';
const FormItem = Form.Item;
const list = [
    {
        name: '创建数据库实例',
        id: '1',
    },
    {
        name: '启动实例',
        id: '2',
    },
    {
        name: '更新数据库密码',
        id: '3',
    },
    {
        name: '创建数据库',
        id: '4'
    }
];
const paramsList = [{ id: 1, name: '全局', }, { id: 2, name: '内联', }, { id: 3, name: '管道', }]
var inputValue = '';
var templateName;
var boo = true;
class AddFlowTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            inputVisible: false,
            modalVisible: false,
            nameFlg: true,
            templateName: null,
            nodeKey: null,
            preNodeKey: null,
            nextNodeKey: null
        };
    }
    onFocus = () => {
        this.setState({
            nameFlg: false,
            templateName: this.props.name
        })
    }
    handleClose = (removedTag) => {
        var tags = [];
        if (this.state.tags.length != 0) {
            tags = this.state.tags.filter(tag => tag.bizType !== removedTag.bizType);
        } else {
            tags = this.props.tags.filter(tag => tag.bizType !== removedTag.bizType);
        }
        this.setState({ tags });
    }

    showInput = () => {
        this.setState(
            { modalVisible: true },
        );
    }
    getTemplateName = (value) => {
        templateName = value.target.value;
        this.setState({
            templateName: value.target.value
        })
    }
    handleInputChange = (e) => {
        inputValue = e;
    }
    save = () => {
        let id = this.props.id;
        if (templateName == null || templateName == undefined) {
            if (this.props.name == null || this.props.name == undefined) {
                Modal.error({
                    content: "模版名称为空请检查",
                });
                return;
            } else {
                templateName = this.props.name;
            }
        }
        let flowTasks = [];
        let tags = this.state.tags
        if (tags.length == 0) {
            tags = this.props.tags
        }
        for (let index = 0; index < tags.length; index++) {
            const element = tags[index];
            let flowTask = {
                nodeKey: element.nodeKey,
                preNodeKey: element.preNodeKey,
                nextNodeKey: element.nextNodeKey,
                bizType: element.bizType,
                name: element.name,
            }
            flowTasks[index] = flowTask;
        }
        let json = {
            name: templateName,
            flowTemplateTasks: flowTasks
        }
        if (id != null) {
            this.props.dispatch({
                type: 'flowTemplate/updateTemplate',
                payload: {
                    id,
                    json: json,
                    callback: () => {
                        this.props.dispatch(routerRedux.replace({
                            pathname: '/system/flowTemplate',
                        }))
                    },
                }
            });
        } else {
            this.props.dispatch({
                type: 'flowTemplate/addFlowTemplate',
                payload: {
                    json: json,
                    callback: () => {
                        this.props.dispatch(routerRedux.replace({
                            pathname: '/system/flowTemplate',
                        }))
                    },
                }
            });
        }
        boo = true;
        templateName = null;
    }
    handleInputConfirm = (values) => {
        let tags = this.state.tags;
        if(tags.length==0){
            tags=this.props.tags
        }
        if (tags.length > 0) {
            for (let index = 0; index < tags.length; index++) {
                for (let i = 0; i < tags.length - index; i++) {
                    if (tags[i].bizType > values.bizType) {
                        this.setState({
                            inputVisible: false,
                        });
                        Modal.error({
                            content: "执行顺序有误",
                        });
                        return;
                    }
                }
            }
        }
        for (let index = 0; index < tags.length; index++) {
            const element = tags[index].bizType;
            if (element == values.bizType) {
                Modal.error({
                    content: "任务已存在",
                });
                this.setState({
                    tags,
                    inputVisible: false,
                });
                inputValue = ''
                return
            }
        }
        if (inputValue) {
            if (values.name) {
                let preNodeKey = this.state.nodeKey
                let nodeKey = require('cuid')
                let nextNodeKey = this.state.nextNodeKey
                this.setState({
                    nodeKey: nodeKey,
                    preNodeKey: preNodeKey,
                    nextNodeKey: nextNodeKey,
                })
                let tagList = [{
                    bizType: values.bizType,
                    name: values.name,
                    // paramsChannel: values.paramsChannel,
                    nodeKey: nodeKey,
                    preNodeKey: preNodeKey,
                    nextNodeKey: nextNodeKey,
                }]
                tags = [...tags, ...tagList];
                const element = tags[tags.length - 1];
                if (element) {
                    tags[tags.length - 1].nextNodeKey = nodeKey
                }
                this.setState({
                    tags,
                    inputVisible: false,
                });
                inputValue = ''
                return
            }
        }
        let preNodeKey = this.state.nodeKey
        let nodeKey = require('cuid')
        let nextNodeKey = this.state.nextNodeKey
        this.setState({
            nodeKey: nodeKey,
            preNodeKey: preNodeKey,
            nextNodeKey: nextNodeKey,
        })
        let tagList = [{
            bizType: values.bizType,
            name: list.filter(it => it.id == values.bizType)[0].name,
            // paramsChannel: values.paramsChannel,
            nodeKey: nodeKey,
            preNodeKey: preNodeKey,
            nextNodeKey: nextNodeKey,
        }]
        const element = tags[tags.length - 1];
        if (element) {
            tags[tags.length - 1].nextNodeKey = nodeKey
        }
        tags = [...tags, ...tagList];
        this.setState({
            tags,
            inputVisible: false,
        });
        inputValue = ''
    }
    Ok = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.name != null) {
                    inputValue = values.name
                }
                this.setState({
                    modalVisible: false,
                    inputVisible: true
                })
            }
            if (values.bizType != null) {// && values.paramsChannel != null) {
                this.handleInputConfirm(values)
                //重置form表单的字段
                this.props.form.resetFields();
            }

        });
        boo = false;

    }
    Cancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    black = () => {
        boo = true;
        templateName = null;
    }
    render() {
        let { tags, inputVisible } = this.state;
        const props = this.props;
        let { tags: tagsList, id, name } = props;
        if (id && boo) {
            tags = tagsList
        }
        const { getFieldDecorator, resetFields } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        var url = "/system/flowTemplate";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="模块设置"
                    confirmLoading={props.loading}
                    onOk={this.Ok}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        <FormItem label="模块名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('name', {
                                initialValue: null
                            })
                                (<Input placeholder="模块名称" />)}
                        </FormItem>
                        <FormItem label="任务类型" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('bizType', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: null
                            })(
                                <Select style={{ width: "100%" }}
                                    ref={this.saveInputRef}
                                    optionFilterProp="children"
                                    placeholder="请选择任务"
                                    onChange={this.handleInputChange}
                                >
                                    {
                                        list.map((data, index) =>
                                            <Option value={data.id} key={index}>{data.name}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem>
                        {/* <FormItem label="参数来源" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('paramsChannel', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: null
                            })(
                                <Select style={{ width: "100%" }}
                                    optionFilterProp="children"
                                    placeholder="参数来源"
                                >
                                    {
                                        paramsList.map((data, index) =>
                                            <Option value={data.id} key={index}>{data.name}</Option>
                                        )
                                    }
                                </Select>
                                )}
                        </FormItem> */}
                    </Form>
                </Modal>
                <div className="clearfix">
                    <Form layout="inline">
                        <div className="pull-left">
                            <Input placeholder="模块名称" onChange={this.getTemplateName} onFocus={this.onFocus} value={this.state.nameFlg ? this.props.name : this.state.templateName} />
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            {tags.length > 0 ?
                                tags.map((tag, index) => {
                                    const isLongTag = tag.name.length > 20;
                                    const tagElem = (
                                        <Tag key={tag.id} closable={true} afterClose={() => this.handleClose(tag)}>
                                            {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
                                        </Tag>
                                    );
                                    return isLongTag ? <Tooltip title={tag.name} key={tag.id}>{tagElem}</Tooltip> : tagElem;
                                }) : ""}
                            {!inputVisible && (
                                <Tag
                                    onClick={this.showInput}
                                    style={{ background: '#fff', borderStyle: 'dashed' }}
                                >
                                    <Icon type="plus" /> 新增任务块
                                </Tag>
                            )}
                        </div>
                        <br />
                        <br />
                    </Form>
                    <div>
                        <Button onClick={this.save} className="pull-right" type="primary" icon="plus">保存</Button>

                        <Button onClick={this.black} className="pull-right"><Link to="/system/flowTemplate">返回</Link></Button>
                    </div>
                </div>
            </MainLayout>
        );
    }
}
const mapStateToProps = (state) => {
    const { tags, id, name } = state.flowTemplate;
    return {
        loading: state.loading.models.flowTemplate,
        tags,
        id,
        name
    };
}
AddFlowTemplate = Form.create()(AddFlowTemplate);
export default connect(mapStateToProps)(AddFlowTemplate);