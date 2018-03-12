import React from 'react';
import { connect } from 'dva';
import {  Table, Button, Input, Form,Popconfirm ,Tag} from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
class OrderList extends React.Component {

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
            type: 'orderList/del',
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
                title: '房间编号',
                dataIndex: 'roomNumber',
                key: 'roomNumber'
            },
            {
                title: '订单价格',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '入住时间',
                dataIndex: 'checkTime',
                key: 'checkTime',
                render:(text, record)=>{
                    return text.slice(0,10)
                }
            },
            {
                title: '离开时间',
                dataIndex: 'leaveTime',
                key: 'leaveTime',
                render:(text, record)=>{
                    return text.slice(0,10)
                }
            },
            {
                title: '状态',
                dataIndex: 'flg',
                key: 'flg',
                render: (text, record) => {
                    const orderFlg = dataDict("orderFlg", text)
                    return (
                        <div>
                            <Tag>
                                {orderFlg}
                            </Tag>
                        </div>)
                }
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
        const props = this.props;
        let { list } = props;
        var url = "/system/orderList";
        return (
            <MainLayout location={location} sider="system" url={url}>
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
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { list } = state.orderList;
    return {
        loading: state.loading.models.orderList,
        list,
        // total,
        // page
    };
}
export default connect(mapStateToProps)(OrderList);