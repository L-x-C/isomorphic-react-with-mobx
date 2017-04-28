import React, {PropTypes, Component} from 'react';
import {action, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import accountActions from '../../actions/account';
import menuActions from '../../actions/menu';
import {progressStart, progressDone} from '../../helpers/progress';
import {generateParticle, removeParticle} from '../../helpers/utils';
import {Form, Input, Select, Button, Icon, Tooltip, message} from 'antd';
import './account.scss';

const Option = Select.Option;
const FormItem = Form.Item;

export default class Signup extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    progressStart();
    return Promise.all([
      menuActions.setTDK(states, '注册')
    ]);
  }

  state = {
    geetestChallenge: '',
    geetestValidate: '',
    geetestSeccode: ''
  };

  componentDidMount() {
    generateParticle();
  }

  componentWillUnmount() {
    removeParticle();
  }

  render() {
    return (
      <div className="account">
        <div className="account__wrapper">
          <p className="account-title">注册</p>
          <WrappedSignupFormForm {...this.state} />
        </div>
      </div>
    );
  }
}

@inject("account")
@observer
class SignupForm extends React.Component {
  state = {
    code_msg: true, //可否发送短信验证
    code_msg_timer: 0,
    code_tel: true, //可否发送电话验证
    code_tel_timer: 0
  };

  handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        accountActions.createAccount({
          phone: this.props.form.getFieldValue('phone'),
          pin: this.props.form.getFieldValue('pin'),
          password: this.props.form.getFieldValue('password')
        });
      }
    });
  };

  sendCodeMsg = (isPhone) => {
    let form = this.props.form;
    form.validateFields(['phone'], (err, values) => {
      if (!err) {
        let obj = {
          phone: form.getFieldValue('prefix') + ' ' + form.getFieldValue('phone'),
          target: 'register'
        };

        if (isPhone) {
          obj['isVoiceMessage'] = 'true';
          this.setState({
            code_tel: false
          });
          this.startTimer('code_tel');
        } else {
          this.setState({
            code_msg: false
          });
          this.startTimer('code_msg');
        }

        accountActions.sendCodeMsg(obj).then(res => {
          if (!res.success) {
            if (isPhone) {
              this.setState({
                code_tel: true
              });
            } else {
              this.setState({
                code_msg: true
              });
            }
          }
        });
      }
    });
  };

  startTimer = (type) => {
    this.setState({
      [`${type}_timer`]: 60
    });
    let timer = setInterval(() => {
      let time = this.state[`${type}_timer`];
      if (time === 0) {
        this.setState({
          [type]: true
        });
        clearInterval(timer);
      } else {
        this.setState({
          [`${type}_timer`]: --time
        });
      }
    }, 1000);
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Form className="account-form">
        <FormItem className="account-signup__phone">
          {getFieldDecorator('phone', {
            validateTrigger: 'onBlur',
            rules: [{required: true, message: '必填'}, {pattern: /^1[345789]\d{9}$/, message: '手机格式不正确'}]
          })(
            <Input placeholder="请输入手机号"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('pin', {
            rules: [{required: true, message: '必填'}]
          })(
            <Input style={{width: "80%"}} placeholder="请输入验证码"/>
          )}
          <Tooltip title={this.state.code_msg ? "短信验证": `已发送，${this.state.code_msg_timer}秒后可再次发送`}>
            <Icon type="message" className="account-code__btn" onClick={() => {this.state.code_msg && this.sendCodeMsg();}}/>
          </Tooltip>
          <Tooltip title={this.state.code_tel ? "电话验证": `已发送，${this.state.code_tel_timer}秒后可再次发送`}>
            <Icon type="phone" className="account-code__btn" onClick={() => {this.state.code_tel && this.sendCodeMsg(true);}}/>
          </Tooltip>
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{required: true, message: '必填'}]
          })(
            <Input placeholder="请输入密码" type="password"/>
          )}
        </FormItem>
        <FormItem >
          <Button className="account-create" onClick={this.handleSubmit}>创建</Button>
        </FormItem>
      </Form>
    );
  }
}

let WrappedSignupFormForm = Form.create()(SignupForm);


Signup.propTypes = {
  job: PropTypes.object
};

SignupForm.propTypes = {
  form: PropTypes.object,
  account: PropTypes.object,
  geetestChallenge: PropTypes.string,
  geetestValidate: PropTypes.string,
  geetestSeccode: PropTypes.string
};
