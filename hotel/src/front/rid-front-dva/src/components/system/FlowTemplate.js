import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Icon,Popconfirm } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import {dataDict} from '../../utils/dataDict';
class FlowTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    // 改变页面
    pageChangeHandler = (pagination) => {
        let page = pagination.current;
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/flowTemplate',
            query: { page }
        }));
    }
    add = () => {
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/addFlowTemplate',
        }))
    }
    // 删除
    del = (id) => {
        this.props.dispatch({
            type: 'flowTemplate/del',
            payload: {
                id,
                page:this.props.page
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
                title: '名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '模板块',
                dataIndex: 'flowTemplateTasks',
                key: 'flowTemplateTasks',
                render: (text) => {
                    if (text && text.length == 0) {
                        return "无";
                    };
                    if (text && text.length == 1) {
                        return <p key={text[0].id}>{dataDict('bizType', text[0].bizType)}</p>
                    };
                    return <Popover content={
                        text.map((data, index) =>
                            <p key={data.id}>{dataDict('bizType', data.bizType)}</p>
                        )
                    }>共{text.length}个模板块 <Icon type="question-circle-o" /></Popover>
                }
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (
                    <div>
                        <Link to={`/system/updateflowTemplate/${record.id}`}>修改</Link>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list, total, page } = props;
        var url="/system/flowTemplate";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div className="clearfix">
                    <Button onClick={this.add} className="pull-right" type="primary" icon="plus">新增</Button>
                </div>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={record => record.id}
                    loading={props.loading}
                    pagination={{
                        total: total,
                        current: page,
                        pageSize: 10
                    }}
                    //修改页面
                    onChange={this.pageChangeHandler}
                />
            </MainLayout >
        )
    }
}

const mapStateToProps = (state) => {
    const { list, total, page } = state.flowTemplate;
    return {
        loading: state.loading.models.flowTemplate,
        list,
        total,
        page
    };
}
export default connect(mapStateToProps)(FlowTemplate);