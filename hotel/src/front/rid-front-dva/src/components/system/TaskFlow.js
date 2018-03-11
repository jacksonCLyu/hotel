import React from 'react';
import { connect } from 'dva';
import { Table, Button, Input, Popconfirm, Tag } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import Popover from 'antd/lib/popover';
import { dataDict } from '../../utils/dataDict';
import router from '../../router';

class TaskFlow extends React.Component {

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
            pathname: '/system/taskFlow',
            query: { page }
        }));
    }
    del = (id) => {
        this.props.dispatch({
            type: "taskFlow/del",
            payload: {
                id,
                page: this.props.page
            }
        })
    }
    add = () => {
        this.props.dispatch(routerRedux.replace({
            pathname: '/system/addFlow',
        }))
    }
    run=(id)=>{
        this.props.dispatch({
            type:"taskFlow/run",
            payload:{
                id:id
            }
        })
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
            // {
            //     title: '是否可重用',
            //     dataIndex: 'reusable',
            //     key: 'reusable',
            //     render: (text) => {
            //         if (text) {
            //             return (
            //                 <Tag color='#87d068'>
            //                     可以
            //                 </Tag>
            //             );
            //         } else {
            //             return (
            //                 <div>
            //                     <Tag color='#f50'>
            //                         不可以
            //                     </Tag>
            //                 </div>
            //             )
            //         }

            //     }
            // },
            {
                title: '创建用户',
                dataIndex: 'createrName',
                key: 'createrName',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (text, record) => {
                    const val = dataDict("taskFlowState", text)
                    var color;
                    switch (text) {
                        case 0:
                            color = "#777"
                            break;
                        case 1:
                            color = "#f0ad4e"
                            break;
                        case 2:
                            color = "#f0ad4e"
                            break;
                        case 3:
                            color = "#d9534f"
                            break;
                        default:
                            break;
                    }
                    return (
                        <div>
                            <Tag color={color}>
                                {val}
                            </Tag>
                        </div>
                    );
                }
            },
            {
                title: '操作',
                width: 150,
                render: (text, record) => (

                    <div>
                        {
                            text.status == 0 ? <div><Link to={`/system/updateTaskFlow/${record.id}`}>修改</Link>
                                &nbsp;
                                <a  onClick={() => { this.run(record.id) }}>启动</a>
                                <Popconfirm title="确认删除?" onConfirm={() => { this.del(record.id) }}>
                                    <a style={{ marginLeft: 10 }}>删除</a>
                                </Popconfirm>
                            </div> : ""
                        }
                        {
                            text.status == 3 ? <Link to={`/system/restartTaskFlow/${record.id}`}>重试</Link>

                                : ""
                        }
                    </div>
                )
            }
        ];

        const props = this.props;
        let { list, total, page } = props;
        var url = "/system/taskFlow";
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
    const { list, total, page } = state.taskFlow;
    return {
        loading: state.loading.models.taskFlow,
        list,
        total,
        page
    };
}
export default connect(mapStateToProps)(TaskFlow);