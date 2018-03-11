import React from 'react';
import { connect } from 'dva';
import { Button, Select, Upload, Icon, Form, Input } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;
var divResult = "none";
class RedisQuery extends React.Component {

    constructor(props) {
        super(props);
    }
    submit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'redisQuery/query',
                    payload: {
                        dbNum: values.DbNum,
                        type: values.Type,
                        key: values.Key,
                        resourceId: this.props.redisID,
                    }
                })
            }
        })
    }
    render() {
        const props = this.props;
        let { dbNum, redisID, result } = props;
        if (result) {
            divResult = "block"
        }
        const { getFieldDecorator } = props.form;
        var url = "redis/redisQuery/" + redisID;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10 },
        };
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Form>
                    <FormItem label="DbNum:"{...formItemLayout}>
                        {getFieldDecorator('DbNum', {
                            rules: [
                                {
                                    required: true,
                                },
                            ],
                        })
                            (<Select optionFilterProp="children"
                                placeholder="请选择DbNum">
                                {
                                    dbNum.map((data, index) => {
                                        return (<Option value={data} key={index}>{data}</Option>)

                                    })
                                }
                            </Select>)}
                    </FormItem>
                    <FormItem label="Type:"{...formItemLayout}>
                        {getFieldDecorator('Type', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })
                            (<Select optionFilterProp="children"
                                placeholder="请选择类型">
                                <Option value="1">String</Option>
                                <Option value="2">Hash</Option>
                                <Option value="3">Set</Option>
                                <Option value="4">List</Option>
                            </Select>)}
                    </FormItem>
                    <FormItem label="Key:"{...formItemLayout}>
                        {getFieldDecorator('Key', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                            })
                            (<Input />)}
                    </FormItem>
                    <br />
                    <div className="pull-right" >
                        <Button className="pull-right" type="primary" onClick={this.submit}>提交</Button>
                    </div>
                    <br />
                    <div style={{ display: divResult }}>
                        <h2>Result</h2>
                        <span>{result}</span>
                    </div>
                </Form>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { dbNum, redisID, result, resultDiv } = state.redisQuery;
    return {
        loading: state.loading.models.redisQuery,
        dbNum,
        redisID,
        result,
        resultDiv
    }
}
RedisQuery = Form.create()(RedisQuery);
export default connect(mapStateToProps)(RedisQuery);