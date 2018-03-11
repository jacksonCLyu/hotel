import { Checkbox, Button, Select, Row, Col,Tooltip } from 'antd';
import { routerRedux } from 'dva/router';
import MainLayout from '../../MainLayout';
import { connect } from 'dva';
import { dataDict } from '../../../utils/dataDict';
import index from 'antd/lib/popconfirm';
const CheckboxGroup = Checkbox.Group;

var plainOptions = []; 
var defaultCheckedList = [];
var userId;

class UserEdit extends React.Component {

    state = {
        checkedList: defaultCheckedList,
        indeterminate: false,
        checkAll: false,
        type: 1,
        checked: false
    };
    onChange = (checkedList) => {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
            checked: true
        });
    }
    userSave = () => {
        this.props.dispatch({
            type: 'userEdit/userSaves',
            payload: {
                userId,
                resource: this.state.checkedList.length ? this.state.checkedList : [],
                type: this.state.type,
                callback: () => {
                    this.props.dispatch(routerRedux.push({
                        pathname: '/system/userManagementList'
                    }));
                },
            }
        });
        defaultCheckedList = [];
    }
    handleChange = (value) => {
        this.state.checkedList = [];
        this.setState({
            type: value
        })
        if (userId !== null) {
            if (value == 1) {
                this.props.dispatch({
                    type: 'userEdit/userEditDB',
                    payload: {
                        userId,
                    }
                });
            } else {
                this.props.dispatch({
                    type: 'userEdit/userEditRedis',
                    payload: {
                        userId,
                    }
                });
            }
        }
    }
    // 返回列表
    back = () => {
        this.props.dispatch(routerRedux.push({
            pathname: '/system/userManagementList'
        }));
        defaultCheckedList = [];
    }
    onCheckAllChange = (e) => {
        const props = this.props
        this.setState({
            indeterminate: false,
            checkedList: e.target.checked ? props.resource.map(v => v.id) : [],
            checkAll: e.target.checked,
            checked: true
        })
    }
    render() {
        const props = this.props;
        //取出props中的对应的值,例如取出list对应的值并赋值到dataSource中
        let { userInfo, resource, userResource, indeterminate, checkAll } = props;
        plainOptions = resource.map(v => ({ label: v.name + '[' + v.port + ']', value: v.id }));
        if (userResource != null) {
            defaultCheckedList = userResource.map(v => v.id);
        }else{
            defaultCheckedList=[]
        }
        userId = userInfo === null ? null : userInfo.id
        var url = "/system/userManagementList";
        return (
            <MainLayout location={location} sider="system" url={url}>
                <div>
                    <h3>{userInfo === null ? null : userInfo.name}</h3>
                    <Select id="type" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="1">数据库资源</Option>
                        <Option value="2">Redis资源</Option>
                    </Select>
                </div>
                <div>
                    <div>
                        <div style={{ borderBottom: '1px solid #E9E9E9', display: this.state.Checkbox }}>
                            <Checkbox
                                indeterminate={this.state.indeterminate}
                                onChange={this.onCheckAllChange}
                                checked={this.state.checkAll}
                            >
                                全选
                           </Checkbox>
                        </div>
                        <br />
                        <Checkbox.Group style={{ width: '100%' }} value={this.state.checked ? this.state.checkedList : defaultCheckedList} onChange={this.onChange}>
                            <Row >
                                {
                                    plainOptions.map((data, index) => {
                                        const isLong = data.label.length > 25;
                                        if(isLong){
                                            return <Col span={4} key={index}><Checkbox value={data.value}  ><Tooltip title={data.label}>{data.label.slice(0, 25)} </Tooltip></Checkbox></Col>
                                        }else{
                                            return <Col span={4} key={index}><Checkbox value={data.value}  >{data.label}</Checkbox></Col>
                                        }
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </div>

                </div>
                <br />
                <br />
                <div className="clearfix">
                    <Button className="pull-right" type="primary" onClick={this.userSave}>确定</Button>
                    &nbsp;&nbsp;
                    <Button className="pull-right" onClick={this.back} >返回</Button>
                </div>
            </MainLayout >
        );
    }
}
const mapStateToProps = (state) => {
    const { userInfo, userResource, resource, indeterminate, checkAll } = state.userEdit;
    return {
        loading: state.loading.models.exampleLog,
        userInfo,
        userResource,
        resource,
        indeterminate,
        checkAll
    };
}
export default connect(mapStateToProps)(UserEdit);