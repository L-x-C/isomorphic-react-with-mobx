import React, {PropTypes, Component} from 'react';
import {action, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import {progressStart, progressDone} from '../../helpers/progress';
import jobActions from '../../actions/job';
import menuActions from '../../actions/menu';
import {Table, Button, Modal, Input, InputNumber, Form} from 'antd';
import {browserHistory} from 'react-router';
import './job.scss';

const FormItem = Form.Item;

@inject("job")
@observer
export default class JobList extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    progressStart();
    return Promise.all([
      menuActions.setTDK(states, '列表'),
      jobActions.fetchJobList(states, query)
    ]);
  }

  state = {
    loading: false,
    visible: false
  };

  handleTableChange = (pagination) => {
    browserHistory.push(`/job?current=${pagination.current}&skip=${(pagination.current - 1) * pagination.pageSize}`);
  };

  showModal = () => {
    this.form.resetFields();
    this.setState({
      visible: true
    });
  };

  saveFormRef = (form) => {
    this.form = form;
  };

  handleOk = () => {
    this.form.validateFields((err, value) => {
      if (err) {
        return;
      }
      jobActions.addList(this.props.job, this.form.getFieldsValue()).then(res => {
        this.setState({
          visible: false
        });
      });
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    }];

    return (
      <div className="job-container job-list__container">
        <Button onClick={this.showModal} type="primary">新增列表</Button>

        <Table onChange={this.handleTableChange} loading={this.state.loading} rowKey="id" columns={columns}
               className="job-list__table"
               pagination={toJS(this.props.job.jobList.pagination)} dataSource={toJS(this.props.job.jobList.datas)}/>

        <WrappedPopupModal
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleOk}
        />
      </div>
    );
  }
}

class PopupModal extends React.Component {
  render() {
    let {visible, onCancel, onCreate, form} = this.props;
    let {getFieldDecorator} = form;
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    };
    return (
      <Modal title="新增" visible={visible} onOk={onCreate} onCancel={onCancel}>
        <Form>
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {
              rules: [
                {required: true, message: '必填', whitespace: true}
              ]
            })(
              <Input placeholder="请输入名称"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="年龄">
            {getFieldDecorator('age', {})(
              <InputNumber placeholder="请输入年龄"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="地址">
            {getFieldDecorator('address', {})(
              <Input placeholder="请输入地址"/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

let WrappedPopupModal = Form.create()(PopupModal);


JobList.propTypes = {
  job: PropTypes.object
};
PopupModal.propTypes = {
  form: PropTypes.object,
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onCreate: PropTypes.func
};