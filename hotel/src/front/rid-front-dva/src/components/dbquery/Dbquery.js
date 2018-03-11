import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Checkbox, Select, Table, Icon, Tabs, Dropdown, Menu, Modal, Row, Col, Tooltip } from 'antd';
import { routerRedux, Link } from 'dva/router';
import MainLayout from '../MainLayout';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
import getExcelData from './exportExcel';
import { Controlled as CodeMirror } from 'react-codemirror2'
import { commands } from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/addon/hint/show-hint.css';
require('codemirror/mode/sql/sql');
require('codemirror/addon/hint/sql-hint');
require('codemirror/addon/hint/show-hint');
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
//存放每个tab标签对应的sql
var sqlText = []
const exclude = { "8": "backspace", "9": "tab", "13": "enter", "16": "shift", "17": "ctrl", "18": "alt", "19": "pause", "20": "capslock", "27": "escape", "33": "pageup", "34": "pagedown", "35": "end", "36": "home", "37": "left", "38": "up", "39": "right", "40": "down", "45": "insert", "46": "delete", "91": "left window key", "92": "right window key", "93": "select", "107": "add", "109": "subtract", "110": "decimal point", "111": "divide", "112": "f1", "113": "f2", "114": "f3", "115": "f4", "116": "f5", "117": "f6", "118": "f7", "119": "f8", "120": "f9", "121": "f10", "122": "f11", "123": "f12", "144": "numlock", "145": "scrolllock", "186": "semicolon", "187": "equalsign", "188": "comma", "189": "dash", "190": "period", "191": "slash", "192": "graveaccent", "220": "backslash", "222": "quote" };
class Dbquery extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 1;
        const panes = [
            { title: "Tab", key: '0', closable: false, tabIndex: '0' }
        ];
        this.state = {
            tableList: 'none',
            dataInfo: 'block',
            executeSQL: "block",
            checkedList: [],
            indeterminate: false,
            checkAll: false,
            Checkbox: "none",
            span: "block",
            //用来区别导出表数据或表结构 0:表结构,1:表数据
            type: 0,
            //标签
            activeKey: panes[0].key,
            panes,
            //表名
            dbName: null,
            tabIndex: 0,
            //模版内容
            sqlTemplate: null,
            sqlTemplateID: null,
            nameModel: false,
            templateName: null,
            sqlValue: null,
            selectionSQL: null,
            //更新或新增:1更新2新增
            flg: null,
            exportExcel: false,
            updateTemplate: false,
            deleteTemplate: false,
        };
    }
    onChange = (value) => {
        const props = this.props
        this.setState({
            checkedList: value,
            indeterminate: value.length ? true : false,
            checkAll: value.length == props.dbNameList.length
        })

    }
    onCheckAllChange = (e) => {
        const props = this.props
        this.setState({
            indeterminate: false,
            checkedList: e.target.checked ? props.dbNameList.map(it => it.dbName) : [],
            checkAll: e.target.checked
        })
    }
    tableList = () => {
        this.setState({
            tableList: 'block',
            executeSQL: 'none',
            Checkbox: 'block',
            dataInfo: "none",
            type: 0,
        })
    }
    tableData = () => {
        this.setState({
            tableList: 'block',
            executeSQL: 'none',
            Checkbox: 'none',
            type: 1,
            dataInfo: "none"
        })
    }
    break = () => {
        this.setState({
            tableList: 'none',
            executeSQL: 'block',
            dataInfo: "block",
            checkedList: [],
            indeterminate: false,
            checkAll: false,
        })
    }
    submit = () => {
        if (this.state.type == 0) {
            this.props.dispatch({
                type: 'dbquery/exportDdl',
                payload: {
                    resourceId: this.props.resourceId,
                    tableNames: this.state.checkedList,
                }
            });
        } else {
            if (this.state.checkedList.length != 1) {
                Modal.warning({
                    content: "只能dump一张表",
                });
                return;
            }
            this.props.dispatch({
                type: 'dbquery/exportTableData',
                payload: {
                    resourceId: this.props.resourceId,
                    tableNames: this.state.checkedList,
                }
            });
        }
    }
    querySchemaIndex = (value, a) => {
        let tableName = value.target.text
        this.setState({
            dbName: tableName,
            sqlValue: tableName,
            exportExcel: true
        })
        this.setState({
            executeSQL: "block",
            dataInfo: "block",
            span: "none",
            tableList: "none",
        })
        if (tableName == null || tableName == undefined || tableName.length == 0) {
            Modal.warning({
                content: "请选择表!",
            });
            return;
        }
        this.props.dispatch({
            type: 'dbquery/querySchema',
            payload: {
                resourceId: this.props.resourceId,
                tableName: tableName,
                type: 1
            }
        });
    }
    exportExcel = () => {
        if (this.props.queryData.length == 0) {
            Modal.warning({
                content: "没有数据",
            });
            return;
        }
        var arr = [];
        arr.push([this.props.columns].concat(this.props.result))
        var eleLink = document.createElement('a');
        eleLink.download = "data.xlsx";
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        var blob = new Blob([getExcelData(arr)], { type: "application/octet-stream" });
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink);
    }
    implement = () => {
        let tabIndex = this.state.tabIndex
        let sql = sqlText.filter(sql => sql.tabID == tabIndex)
        let selected = this.state.selectionSQL;
        if (selected != null && selected.length > 0 && selected != "") {
            this.setState({
                exportExcel: true
            })
            this.props.dispatch({
                type: 'dbquery/query',
                payload: {
                    resourceId: this.props.resourceId,
                    sql: selected
                }
            });
            return;
        }
        if (sql.length == 0) {
            return;
        }
        let sqlTxt = sql[0]
        if (sqlTxt.content == null || sqlTxt.content.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        this.setState({
            exportExcel: true
        })
        this.props.dispatch({
            type: 'dbquery/query',
            payload: {
                resourceId: this.props.resourceId,
                sql: sqlTxt.content,
            }
        });
    }
    showProcessList = () => {
        this.setState({
            executeSQL: "block",
            dataInfo: "block",
            span: "none",
            tableList: "none",
            exportExcel: true
        })
        this.props.dispatch({
            type: 'dbquery/showProcessList',
            payload: {
                resourceId: this.props.resourceId,
            }
        });
    }
    querySchemaField = (value) => {
        let tableName = value.target.text
        this.setState({
            dbName: tableName,
            sqlValue: tableName,
            exportExcel: true
        })
        this.setState({
            executeSQL: "block",
            dataInfo: "block",
            span: "none",
            tableList: "none",
        })
        if (tableName == null) {
            Modal.warning({
                content: "请选择表!",
            });
            return;
        }
        this.props.dispatch({
            type: 'dbquery/querySchema',
            payload: {
                resourceId: this.props.resourceId,
                tableName: tableName,
                type: 2
            }

        });
        this.setState({
            span: "none",
            tableList: "none",
        })
    }
    downloadExcel = () => {
        let tabIndex = this.state.tabIndex
        let sql = sqlText.filter(sql => sql.tabID == tabIndex)
        if (sql.length == 0) {
            return;
        }
        let sqlTxt = sql[0]
        if (sqlTxt.content == null || sqlTxt.content.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        this.props.dispatch({
            type: 'dbquery/exportExcel',
            payload: {
                resourceId: this.props.resourceId,
                sql: sqlTxt.content,
            }
        });


    }
    downloadCsv = () => {
        let tabIndex = this.state.tabIndex
        let sql = sqlText.filter(sql => sql.tabID == tabIndex)
        if (sql.length == 0) {
            return;
        }
        let sqlTxt = sql[0]
        if (sqlTxt.content == null || sqlTxt.content.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        this.props.dispatch({
            type: 'dbquery/exportCsv',
            payload: {
                resourceId: this.props.resourceId,
                sql: sqlTxt.content,
            }
        });

    }
    onChangeTabs = (activeKey) => {
        this.setState({ activeKey, selectionSQL: null });
        let index = activeKey.substr(activeKey.length - 1, 1)
        const sql = sqlText.filter(sql => sql.tabID == index)
        if (sql.length == 0) {
            this.setState({ tabIndex: index, sqlValue: null });
            return;
        }
        this.setState({ tabIndex: index, sqlValue: sql[0].content });
        this.props.dispatch({
            type: 'dbquery/query',
            payload: {
                resourceId: this.props.resourceId,
                sql: sql[0].content,
            }
        });

    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        let tabIndex = this.newTabIndex++;
        const activeKey = `newTab${tabIndex}`;
        panes.push({ title: `Tab ${tabIndex}`, key: activeKey, tabIndex: tabIndex });
        this.setState({ panes, activeKey, tabIndex: tabIndex, boo: false, sqlValue: null });
    }
    remove = (targetKey) => {
        this.setState({
            selectionSQL: null
        })
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        let index = activeKey.substr(activeKey.length - 1, 1)
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        const lastSql = sqlText.filter(sql => sql.tabID == lastIndex);
        const sqlList = sqlText.filter(sql => sql.tabID != index);
        sqlText = sqlList;
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey, tabIndex: lastIndex });
        if (lastSql.length == 0 || lastSql[0].content == "") {
            return;
        }
        this.props.dispatch({
            type: 'dbquery/query',
            payload: {
                resourceId: this.props.resourceId,
                sql: lastSql[0].content,
            }
        });
        this.newTabIndex--
    }
    textValue = (editor, data, value) => {
        this.setState({
            sqlValue: value,
        })
        if (sqlText.length > 0) {
            for (let index = 0; index < sqlText.length; index++) {
                const element = sqlText[index];
                if (element.tabID == this.state.tabIndex) {
                    sqlText[index].content = value
                    return;
                }
            }
        }
        sqlText.push({ tabID: this.state.tabIndex, content: value });
    }

    onBlur = (editor, data) => {
        if (editor.getSelection()) {
            this.setState({
                selectionSQL: editor.getSelection()
            })
        } else {
            this.setState({
                selectionSQL: null
            })
        }
    }
    update = () => {
        let tabIndex = this.state.tabIndex
        let sql = sqlText.filter(sql => sql.tabID == tabIndex)
        if (sql.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        let sqlTxt = sql[0]
        if (sqlTxt.content == null || sqlTxt.content.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        if (this.state.sqlTemplateID) {
            this.setState({
                nameModel: true,
                flg: 1
            })
        } else {
            Modal.warning({
                content: "请选择更新的模版",
            });
            return;
        }
    }
    delete = () => {
        if (this.state.sqlTemplateID) {
            this.props.dispatch({
                type: 'dbquery/delete',
                payload: {
                    id: this.state.sqlTemplateID,
                    resourceId: this.props.resourceId,
                }
            });
        } else {
            Modal.warning({
                content: "请选择删除的模版",
            });
            return;
        }
    }
    insert = () => {
        let tabIndex = this.state.tabIndex
        let sql = sqlText.filter(sql => sql.tabID == tabIndex)
        if (sql.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        let sqlTxt = sql[0]
        if (sqlTxt.content == null || sqlTxt.content.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        } else {
            this.setState({
                nameModel: true,
                flg: 2
            })
        }
    }
    sqlTemplate = (value) => {
        this.setState({
            updateTemplate: true,
            deleteTemplate: true
        })
        let sqlTemplateList = this.props.sqlTemplateList
        for (let index = 0; index < sqlTemplateList.length; index++) {
            const element = sqlTemplateList[index];
            if (value == element.id) {
                this.setState({
                    sqlTemplate: element.sqlContent,
                    sqlTemplateID: element.id,
                    templateName: element.name,
                    sqlValue: element.sqlContent
                })
                if (sqlText.length > 0) {
                    for (let index = 0; index < sqlText.length; index++) {
                        const element1 = sqlText[index];
                        if (element1.tabID == this.state.tabIndex) {
                            sqlText[index].content = element.sqlContent
                            this.setState({
                                sqlValue: element.sqlContent
                            })
                            return;
                        }
                    }
                }
                this.setState({
                    sqlValue: element.sqlContent
                })
                sqlText.push({ tabID: this.state.tabIndex, content: element.sqlContent });
                return;
            }
        }
        this.setState({
            sqlTemplate: null,
            sqlTemplateID: null,
            sqlValue: null
        })
    }
    // 取消
    cancel = () => {
        this.setState({
            nameModel: false
        });
    }
    Ok = () => {
        let templateName;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                templateName = values.templateName
            }
        });
        let tabIndex = this.state.tabIndex
        let sql = sqlText.filter(sql => sql.tabID == tabIndex)
        if (sql.length == 0) {
            return;
        }
        let sqlTxt = sqlText[0]
        if (sqlTxt.content == null || sqlTxt.content.length == 0) {
            Modal.warning({
                content: "sql为空!",
            });
            return;
        }
        if (this.state.flg == 1) {
            this.props.dispatch({
                type: 'dbquery/update',
                payload: {
                    id: this.state.sqlTemplateID,
                    resourceId: this.props.resourceId,
                    name: templateName,
                    sqlContent: sqlTxt.content,
                }
            });
        } else {
            this.props.dispatch({
                type: 'dbquery/add',
                payload: {
                    resourceId: this.props.resourceId,
                    name: templateName,
                    sqlContent: sqlTxt.content
                }
            });
        }
        this.setState({
            nameModel: false
        })
    }
    onKeyUp = (editor, event) => {
        let str = editor.getValue().trim()
        str = str.substr(str.length - 4)
        str = str.toUpperCase()
        var c = event.keyCode || event.which;
        if (!editor.state.completionActive && !exclude.hasOwnProperty(c.toString()) && !(event.ctrlKey && c === 86)) {
            if (str == 'FROM' || str == 'JOIN') {
                editor.showHint({ tables: this.props.dbNameList.map(it => ({ text: it.dbName })) })
            } else {
                commands.autocomplete(editor);
            }
        };
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <Button onClick={this.downloadExcel}>
                        下载excel
                    </Button>
                </Menu.Item>
                <Menu.Item>
                    <Button onClick={this.downloadCsv}>
                        下载csv
                    </Button>
                </Menu.Item>
            </Menu>
        );
        const props = this.props;
        let { dbNameList, resourceId, columns, queryData, result, sqlTemplateList } = props;
        if (!dbNameList) {
            dbNameList = [];
        }
        const allOptions = dbNameList.map(v => (v.dbName));
        const { getFieldDecorator } = props.form;
        let len=columns.length
        let width=100/len+"%"
        console.log(width)
        columns = columns.map(v => ({
            title: v,
            dataIndex: v,
            key: v,
            width: width,
            render: (text, record) => {
                if (text) {
                    const isLong = text.length >10;
                    if (isLong) {
                        return <Tooltip title={text}>{text.slice(0, 10)} </Tooltip>
                    } else {
                        return text;
                    }
                }else{
                    return "" 
                }
            }
        }));
        var url = "dbquery/queryTables/" + resourceId;
        let sqlTemplate = this.state.sqlTemplate
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const menuSelect1 = (
            <Menu style={{ height: 200, overflowY: "auto", overflowX: "hidden" }}>
                {
                    dbNameList.map((data, index) =>
                        <Menu.Item key={index} >
                            <a onClick={this.querySchemaIndex}  >{data.dbName}</a>
                        </Menu.Item>
                    )
                }
            </Menu>
        );
        const menuSelect2 = (
            <Menu style={{ height: 200, overflowY: "auto", overflowX: "hidden" }}>
                {
                    dbNameList.map((data, index) =>
                        <Menu.Item key={index} >
                            <a onClick={this.querySchemaField}  >{data.dbName}</a>
                        </Menu.Item>
                    )
                }
            </Menu>
        );
        return (
            <MainLayout location={location} sider="system" url={url}>
                <Modal
                    visible={this.state.nameModel}
                    title="SQL模版名称"
                    onOk={this.Ok}
                    confirmLoading={props.loading}
                    onCancel={this.cancel}>
                    <Form layout="horizontal">
                        <FormItem label="SQL模版名称" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('templateName', {
                                rules: [
                                    {
                                        required: true,
                                    },
                                ],
                                initialValue: this.state.templateName || null
                            })(<Input />)}
                        </FormItem>
                    </Form>
                </Modal>
                <div className="clearfix">
                    <div className="pull-left">
                        <Button onClick={this.tableList}   >导出表结构</Button>&nbsp;
                        <Button onClick={this.tableData}>导出表数据</Button>&nbsp;
                        <Dropdown overlay={menuSelect1} >
                            <Button style={{ marginLeft: 8 }}  >
                                导出索引信息
                            </Button>
                        </Dropdown>
                        <Dropdown overlay={menuSelect2} >
                            <Button style={{ marginLeft: 8 }}  >
                                查询表字段信息
                            </Button>
                        </Dropdown>
                        &nbsp;
                        {/* <Button  onClick={this.querySchemaIndex} ></Button> */}
                        {/* <Button onClick={this.querySchemaField}>查询表字段信息</Button> */}
                        <Button onClick={this.showProcessList} >任务列表</Button>
                    </div>
                </div>
                <br />
                <div className="box20" >
                    <div style={{ display: this.state.executeSQL }}>
                        <Select style={{ width: "15%" }} showSearch
                            optionFilterProp="children"
                            placeholder="选择SQL模版"
                            onSelect={this.sqlTemplate}
                            allowClear={true}
                        >
                            {
                                sqlTemplateList.map((data, index) =>
                                    <Option value={data.id} key={index}>{data.name}</Option>
                                )
                            }
                        </Select>
                        <br />
                        <br />
                        <Tabs
                            activeKey={this.state.activeKey}
                            onChange={this.onChangeTabs}
                            onEdit={this.onEdit}
                            type="editable-card">
                            {this.state.panes.map(pane =>
                                <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                    <Form>
                                        <FormItem >
                                            {/* <textarea rows="5" cols="100" onChange={this.textValue} value={this.state.boo ? this.state.sqlTxt : sqlTemplate}></textarea> */}
                                            <CodeMirror
                                                value={this.state.sqlValue}
                                                options={{
                                                    mode: 'text/x-mysql',
                                                    // lineSeparator:';',
                                                    readOnly: false,
                                                    indentWithTabs: true,
                                                    smartIndent: true,
                                                    lineNumbers: true,
                                                    // inputStyle:'contenteditable',
                                                    matchBrackets: true,
                                                    lineWiseCopyCut: true,
                                                    autofocus: true,
                                                }}
                                                onBeforeChange={(editor, data, value) => {
                                                    this.setState({ sqlValue: value });
                                                }}
                                                onChange={this.textValue}
                                                onKeyUp={this.onKeyUp}
                                                onBlur={this.onBlur}
                                            />

                                        </FormItem>
                                    </Form>
                                    <Button onClick={this.implement} type="primary" >执行</Button> &nbsp;
                                    {this.state.exportExcel == true ? <Button onClick={this.exportExcel} icon="download" type="primary">导出excel</Button> : ''}
                                    <Dropdown overlay={menu}>
                                        <Button style={{ marginLeft: 8 }} type="primary">
                                            直接下载
                                        </Button>
                                    </Dropdown>
                                    &nbsp;
                                    &nbsp;
                                    <Button type="primary" onClick={this.insert}>新增模版</Button>
                                    &nbsp;
                                    &nbsp;

                                    {
                                        this.state.updateTemplate == true ?
                                            <Button type="primary" onClick={this.update}>
                                                更新模版
                                        </Button> : ""
                                    }
                                    &nbsp;
                                    &nbsp;

                                    {
                                        this.state.deleteTemplate == true ?
                                            <Button type="primary" onClick={this.delete}>
                                                删除模版
                                        </Button> : ""
                                    }
                                    <br />
                                    <br />
                                    <div style={{ display: this.state.dataInfo }}>
                                        <span style={{ display: this.state.span }}>提示：默认显示10条，超过10条请使用limit限定。</span>
                                        <Table
                                            columns={columns}
                                            dataSource={queryData}
                                            rowKey={record => record.id}
                                            loading={props.loading}
                                            pagination={false}
                                            scroll={{ x: 1500, y: 500}}
                                        />
                                    </div>
                                </TabPane>
                            )}
                        </Tabs>
                    </div>
                    <br />
                    <div style={{ display: this.state.tableList }}>
                        <Button onClick={this.submit} >提交</Button>
                        <Button onClick={this.break}>返回</Button>
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
                            <CheckboxGroup value={this.state.checkedList} onChange={this.onChange}>
                                <Row >
                                    {
                                        allOptions.map((data, index) => {
                                            const isLong = data.length > 30
                                            if (isLong) {
                                                return <Col span={6} key={index}><Checkbox value={data}><Tooltip title={data}>{data.slice(0, 30)} </Tooltip></Checkbox></Col>
                                            } else {
                                                return <Col span={6} key={index}><Checkbox value={data}>{data}</Checkbox></Col>
                                            }

                                        })
                                    }
                                </Row >
                            </CheckboxGroup>
                        </div>
                    </div>
                </div>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    const { dbNameList, resourceId, columns, queryData, result, sqlTemplateList } = state.dbquery;
    return {
        loading: state.loading.models.dbquery,
        dbNameList,
        resourceId,
        columns,
        queryData,
        result,
        sqlTemplateList
    };
}
Dbquery = Form.create()(Dbquery);
export default connect(mapStateToProps)(Dbquery);