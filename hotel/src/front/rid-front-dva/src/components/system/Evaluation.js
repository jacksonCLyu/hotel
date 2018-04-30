import React from 'react';
import { connect } from 'dva';
import { Modal, Table, Button, Input, Popconfirm, Tag, Form, Radio, Col, Row, Upload, Icon } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const user = JSON.parse(sessionStorage.getItem('user'));
const { TextArea } = Input;
class Evaluation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            //用来标记,当点击我的评论是置为true
            myflg: false,
            //评论详情
            evaDetails: false,
            //管理员回复
            replyModel: false,

            previewVisible: false,
            previewImage: '',
            fileList: [],
        };
    }
    // // 改变页面
    // pageChangeHandler = (pagination) => {
    //     let page = pagination.current;
    //     this.props.dispatch(routerRedux.replace({
    //         pathname: '/system/taskFlow',
    //         query: { page }
    //     }));
    // }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange = ({ fileList }) => this.setState({ fileList })
    handleCancel = () => this.setState({ previewVisible: false })

    add = () => {
        this.props.form.resetFields();
        this.setState({
            modalVisible: true,
            id: null, content: null, score: null, fileList: [], path: null
        })
    }
    Cancel = () => {
        this.setState({
            modalVisible: false
        })
    }
    cancelDetails = () => {
        this.setState({
            evaDetails: false
        })
    }
    del = (id) => {
        this.props.dispatch({
            type: 'evaluation/del',
            payload: {
                id,
            }
        });
    }
    OK = () => {
        this.props.form.validateFields((err, values) => {
            const user = JSON.parse(sessionStorage.getItem('user'));
            if (!err) {
                let id = this.state.id;
                if (id) {
                    this.props.dispatch({
                        type: 'evaluation/updateEvaOrComp',
                        payload: {
                            id: id,
                            content: values.content,
                            score: values.score,
                            number: values.upload ? values.upload.fileList.length : 0,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                } else {
                    this.props.dispatch({
                        type: 'evaluation/inserEvaOrComp',
                        payload: {
                            userId: user.id,
                            content: values.content,
                            score: values.score,
                            number: values.upload ? values.upload.fileList.length : 0,
                            callback: () => {
                                this.setState({
                                    modalVisible: false
                                });
                            },
                        }
                    });
                }
            }
        });
    }
    // 编辑
    edit = (id, content, score, path) => {
        let props = this.props;
        let fileList = [];
        let file = {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: path
        }
        fileList.push(file)
        props.form.resetFields();
        this.setState({
            modalVisible: true,
            id, content, score, fileList, path
        });
        if (!path) {
            this.setState({
                fileList: []
            });
        }
    }
    details = (id, content, score, userName, reply, adminName, path) => {
        let fileList = [];
        let file = {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: path
        }
        fileList.push(file)
        let props = this.props;
        props.form.resetFields();
        this.setState({
            evaDetails: true,
            id, content, score, userName, reply, adminName, fileList, path
        });
    }
    myEva = () => {
        this.setState({
            myflg: true
        })
        this.props.dispatch({
            type: 'evaluation/myEva',
            payload: {
                userId: user.id,
            }
        });
    }
    allEva = () => {
        this.setState({
            myflg: false
        })
        this.props.dispatch({
            type: 'evaluation/listInit',
        });
    }
    reply = (id, content, score, userName, path,reply) => {
        let props = this.props;
        let fileList = [];
        let file = {
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: path
        }
        fileList.push(file)
        props.form.resetFields();
        this.setState({
            replyModel: true,
            id, content, score, userName, fileList, path,textValue:null,reply
        });
    }
    replyCancel = () => {
        let props = this.props;
        props.form.resetFields();
        this.setState({
            replyModel: false,
            id: null, content: null, score: null, userName: null
        });
    }
    text = (text) => {
        let value = text.target.value
        this.setState({
            textValue: value
        })
    }
    replyOk = () => {
        this.props.dispatch({
            type: 'evaluation/replyEvaOrComp',
            payload: {
                id: this.state.id,
                adminId: user.id,
                reply: this.state.textValue,
                callback: () => {
                    this.setState({
                        replyModel: false
                    });
                },
            }
        });

    }
    render() {

        const columns = [
            {
                title: '用户',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '评论内容',
                dataIndex: 'content',
                key: 'content',
            },
            {
                title: '评分',
                dataIndex: 'score',
                key: 'score',
                render: (text, record) => {
                    const flgText = dataDict("score", text)
                    return (
                        <div>
                            <Tag>
                                {flgText}
                            </Tag>
                        </div>)
                }
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (

                    <div>
                        {
                            user.id == record.userId ? <div>
                                <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName, record.path) }}>详情</a>
                                &nbsp;
                                 <a onClick={() => { this.edit(record.id, record.content, record.score, record.path) }}>编辑</a>
                                <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                                    <a style={{ marginLeft: 10 }}>删除</a>
                                </Popconfirm></div> :
                                this.state.myflg ?
                                    <div>
                                        <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName, record.path) }}>详情</a>
                                        &nbsp;
                                    <a onClick={() => { this.edit(record.id, record.content, record.score, record.path) }}>编辑</a>
                                        <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                                            <a style={{ marginLeft: 10 }}>删除</a>
                                        </Popconfirm></div> :
                                    user.flg == 1 ? <div>
                                        <a onClick={() => { this.reply(record.id, record.content, record.score, record.userName, record.path,record.reply) }}>回复</a>
                                        &nbsp;
                                    <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName, record.path) }}>详情</a>
                                    </div> : <a onClick={() => { this.details(record.id, record.content, record.score, record.userName, record.reply, record.adminName, record.path) }}>详情</a>

                        }

                    </div>
                )
            }
        ];
        const props = this.props;
        const { getFieldDecorator } = props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        let { list } = props;
        var url = "/system/evaluationList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.modalVisible}
                    title="添加/编辑"
                    onOk={this.OK}
                    confirmLoading={props.loading}
                    onCancel={this.Cancel}>
                    <Form layout="horizontal">
                        <FormItem label="评分" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('score', {

                                initialValue: this.state.score || null
                            })(
                                <RadioGroup >
                                    <Radio key="1" value={1}>好</Radio>
                                    <Radio key="2" value={2}>中</Radio>
                                    <Radio key="3" value={3}>差</Radio>
                                </RadioGroup>)}
                        </FormItem>
                        <FormItem label="上传图片" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('upload')(
                                <Upload
                                    action="/upload/picture"
                                    listType="picture-card"
                                    fileList={this.state.fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                    {this.state.fileList == null || this.state.fileList.length >= 1 ? null : uploadButton}
                                </Upload>)}

                        </FormItem>
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>
                        <FormItem label="内容" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('content', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.content || null
                            })(<TextArea rows={3} style={{ width: 300 }} />)}
                        </FormItem>
                    </Form>
                </Modal>
                <Modal
                    visible={this.state.replyModel}
                    title="回复"
                    onOk={this.replyOk}
                    confirmLoading={props.loading}
                    onCancel={this.replyCancel}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">用户: {this.state.userName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">评分: {dataDict("score", this.state.score)}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">评论: {this.state.content}</div>
                        </Col>
                    </Row>
                    {
                        this.state.path ?
                            <div>
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">图片: <Upload
                                            action="/upload/picture"
                                            listType="picture-card"
                                            fileList={this.state.fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                            onRemove={false}
                                        >
                                            {this.state.fileList.length >= 1 ? null : uploadButton}
                                        </Upload></div>
                                    </Col>
                                </Row>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                </Modal>
                            </div> : null
                    }
                    <Row gutter={16}>
                        <Col className="gutter-row" span={16}>
                            <div className="gutter-box">回复: <TextArea rows={4} style={{ width: 500 }} value={this.state.textValue != null || this.state.textValue != undefined ? this.state.textValue : this.state.reply} onChange={this.text} /></div>
                        </Col>
                    </Row>

                </Modal >
                <Modal
                    visible={this.state.evaDetails}
                    title="评论详情"
                    confirmLoading={props.loading}
                    onCancel={this.cancelDetails}
                    footer={[
                        <Button key="back" onClick={this.cancelDetails}>返回</Button>,
                    ]}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">用户: {this.state.userName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">评分: {dataDict("score", this.state.score)}</div>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <div className="gutter-box">评论: {this.state.content}</div>
                        </Col>
                    </Row>
                    {
                        this.state.path ?
                            <div>
                                <Row gutter={16}>
                                    <Col className="gutter-row" span={4}>
                                        <div className="gutter-box">图片: <Upload
                                            action="/upload/picture"
                                            listType="picture-card"
                                            fileList={this.state.fileList}
                                            onPreview={this.handlePreview}
                                            onChange={this.handleChange}
                                            onRemove={false}
                                        >
                                            {this.state.fileList == null || this.state.fileList.length >= 1 ? null : uploadButton}
                                        </Upload></div>
                                    </Col>
                                </Row>
                                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                </Modal>
                            </div> : null
                    }

                    <Row gutter={16} >
                        <Col className="gutter-row" >
                            <div className="gutter-box"> 管理员: {this.state.adminName}</div>
                        </Col>
                    </Row>
                    <Row gutter={16} >
                        <Col className="gutter-row" >
                            <div className="gutter-box"> 回复: {this.state.reply}</div>
                        </Col>
                    </Row>
                </Modal>
                <div className="clearfix">
                    {
                        user.flg == 0 ? <div><Button onClick={this.myEva} className="pull-left" >我的评论</Button>
                            <Button onClick={this.allEva} className="pull-left" >所有评论</Button>
                            <Button onClick={this.add} className="pull-right" type="primary" icon="plus">新增</Button>
                        </div> : ""
                    }
                </div>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={record => record.id}
                    loading={props.loading}
                    pagination={false}
                // //修改页面
                // onChange={this.pageChangeHandler}
                />
            </MainLayout >
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.evaluation;
    return {
        loading: state.loading.models.evaluation,
        list,
        // total,
        // page
    };
}
Evaluation = Form.create()(Evaluation);
export default connect(mapStateToProps)(Evaluation);