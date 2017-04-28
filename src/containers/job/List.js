import React, {PropTypes, Component} from 'react';
import {action, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import {progressStart, progressDone} from '../../helpers/progress';
import jobActions from '../../actions/job';
import menuActions from '../../actions/menu';
import {Table, Badge, Menu, Dropdown, Button, Icon} from 'antd';
import {browserHistory} from 'react-router';
import './job.scss';

@inject("job")
@observer
export default class JobList extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    progressStart();
    return Promise.all([
      menuActions.setTDK(states, '岗位列表'),
      jobActions.fetchJobList(states, query)
    ]);
  }

  state = {
    loading: false
  };

  handleTableChange = (pagination) => {
    browserHistory.push(`/job?current=${pagination.current}&skip=${(pagination.current - 1) * pagination.pageSize}`);
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
        <Table onChange={this.handleTableChange} loading={this.state.loading} rowKey="id" columns={columns}
               className="job-list__table"
               pagination={toJS(this.props.job.jobList.pagination)} dataSource={toJS(this.props.job.jobList.datas)}/>
      </div>
    );
  }
}


JobList.propTypes = {
  job: PropTypes.object
};