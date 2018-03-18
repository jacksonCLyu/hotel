import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Form, Popconfirm, Tag } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
class OtherOrders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
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
    del = (id) => {
        this.props.dispatch({
            type: 'otherOrders/del',
            payload: {
                id,
            }
        });
    }
    render() {

        const columns = [
            {
                title: '订单ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '项目名称',
                dataIndex: 'casualDietName',
                key: 'casualDietName'
            },
            {
                title: '订单价格',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                        <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                            <a style={{ marginLeft: 10 }}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
        ];
        const columns1 = [
            {
                title: '订单ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '项目名称',
                dataIndex: 'casualDietName',
                key: 'casualDietName'
            },
            {
                title: '订单价格',
                dataIndex: 'price',
                key: 'price'
            },
        ];
        const user = JSON.parse(sessionStorage.getItem('user'));
        let flg = user.flg;
        const props=this.props
        let { list } = props;
        var url = "/system/otherOrders";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div className="box20" />
                {
                    flg == 1 ? <Table
                        columns={columns}
                        dataSource={list}
                        rowKey={record => record.id}
                        loading={props.loading}
                        pagination={false}
                    // //修改页面
                    // onChange={this.pageChangeHandler}
                    /> : <Table
                            columns={columns1}
                            dataSource={list}
                            rowKey={record => record.id}
                            loading={props.loading}
                            pagination={false} />
                }

            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.otherOrders;
    return {
        loading: state.loading.models.otherOrders,
        list,
        // total,
        // page
    };
}
export default connect(mapStateToProps)(OtherOrders);