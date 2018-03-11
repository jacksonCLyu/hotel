import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Modal } from 'antd';
import { routerRedux ,Link } from 'dva/router';
import MainLayout from '../MainLayout';

const FormItem = Form.Item;


class RedisManagement extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            companyId: null
        };
    }
     // 改变页面
     pageChangeHandler = (pagination) => {
        let page = pagination.current;
        //routerRedux.replace往history中添加内容
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/redisManagementList',
            query: { page }
        }));
    }
    // 删除
    delRedis = (id) => {
        this.props.dispatch({
            type: 'redisManagement/del',
            payload: {
                id,
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
                title: '类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '名称',
                dataIndex: 'name',
                key: 'name',
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
                width: 100,
                render: (text, record) => (
                    <div>
                        <a ><Link to={`/system/redisEdit/${record.id}`}>修改</Link></a>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.delRedis(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        var url="/system/redisManagementList";
        const props = this.props;
        let { list: dataSource,total,page: current } = props;
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div className="box20" />
                <Table
                    columns={columns}
                    dataSource={dataSource}
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
            </MainLayout>
        )
    }
}
const mapStateToProps = (state) => {
    const { list, total, page } = state.redisManagement;
    return {
        loading: state.loading.models.redisManagement,
        list,
        total,
        page
    };
}
RedisManagement = Form.create()(RedisManagement);
export default connect(mapStateToProps)(RedisManagement);