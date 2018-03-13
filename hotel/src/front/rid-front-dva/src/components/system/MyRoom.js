import React from 'react';
import { connect } from 'dva';
import {  Table, Button, Input, Form,Popconfirm ,Tag} from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
const FormItem = Form.Item;
class MyRoom extends React.Component {

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
    unsubscribe = (roomNumber) => {
        this.props.dispatch({
            type: 'myRoom/unsubscribe',
            payload: {
                roomNumber,
            }
        });
    }
    render() {

        const columns = [
            {
                title: '房间编号',
                dataIndex: 'roomNumber',
                key: 'roomNumber',
            },
            {
                title: '入住时间',
                dataIndex: 'checkTime',
                key: 'checkTime',
                render: (text, record) => {
                    return text.slice(0, 10)
                }
            },
            {
                title: '离开时间',
                dataIndex: 'leaveTime',
                key: 'leaveTime',
                render: (text, record) => {
                    return text.slice(0, 10)
                }
            },
            {
                title: '房间标准',
                dataIndex: 'standard',
                key: 'standard',
                render: (text, record) => {
                    const standardText = dataDict("roomStandard", text)
                    return (
                        <div>
                            <Tag>
                                {standardText}
                            </Tag>
                        </div>)
                }
            },
            {
                title: '操作',
                width: 100,
                render: (text, record) => (
                    <div>
                       <a onClick={() => { this.unsubscribe(record.roomNumber) }}>退订</a>
                    </div>
                )
            }
        ];
        const props = this.props;
        let { list } = props;
        var url = "/system/myRoom";
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
    const { list } = state.myRoom;
    return {
        loading: state.loading.models.myRoom,
        list,
        // total,
        // page
    };
}
export default connect(mapStateToProps)(MyRoom);