import React from 'react';
import { connect } from 'dva';
import { Table, Button, Form, Input, Popconfirm, Radio, Modal, Select, TreeSelect, Spin, Cascader } from 'antd';
import { routerRedux,Link } from 'dva/router';
import MainLayout from '../../MainLayout';
import textarea from './textarea.css';
class ExampleLog extends React.Component {

    
    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/system/exampleLog',
            query: { page:this.props.page }
        }));
    }
    render() {
        const props = this.props;
        let { exampleLog,page } = props;
        var url ="/system/exampleLog";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div className="clearfix">
                    <Button className="pull-right"  onClick={this.back} >返回</Button>
                </div>
                <br />
                <div className="box20" >
                    <textarea className={textarea.textarea} value={exampleLog} readonly="readonly"/>
                </div>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { exampleLog ,page} = state.exampleLog;
    return {
        loading: state.loading.models.exampleLog,
        exampleLog,
        page
    };
}
export default connect(mapStateToProps)(ExampleLog);