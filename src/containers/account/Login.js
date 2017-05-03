import React, {PropTypes, Component} from 'react';
import {action, toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router';
import accountActions from '../../actions/account';
import menuActions from '../../actions/menu';
import {generateParticle, removeParticle} from '../../helpers/utils';
import {Form, Input, Button, Icon, Checkbox} from 'antd';
import './account.scss';

const FormItem = Form.Item;

export default class Login extends Component {
  @action
  static onEnter({states, pathname, query, params}) {
    return Promise.all([
      menuActions.setTDK(states, '登录')
    ]);
  }

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
          <p className="account-title">登录</p>
          <WrappedLoginFormForm />
        </div>
      </div>
    );
  }
}

@inject("account")
@observer
class LoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        accountActions.login(this.props.form.getFieldsValue());
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Form className="account-form" onSubmit={this.handleSubmit}>
        <FormItem className="account-login__input_prefix">
          {getFieldDecorator('identity', {
            rules: [{required: true, message: '必填'}]
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="请输入手机号"/>
          )}
        </FormItem>
        <FormItem className="account-login__input_prefix">
          {getFieldDecorator('password', {
            rules: [{required: true, message: '必填'}]
          })(
            <Input addonBefore={<Icon type="lock" />} placeholder="请输入密码" type="password"/>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>记住我，下次自动登录</Checkbox>
          )}
          <Link to="/account/forget" className="account-form__forget">忘记密码</Link>
        </FormItem>
        <FormItem>
          <Button className="account-create" htmlType="submit">登录</Button>
        </FormItem>
        <FormItem>
          <p>还没有账号？现在<Link to="/account/signup">注册</Link></p>
        </FormItem>
      </Form>
    );
  }
}

let WrappedLoginFormForm = Form.create()(LoginForm);


Login.propTypes = {
  job: PropTypes.object
};

LoginForm.propTypes = {
  form: PropTypes.object,
  account: PropTypes.object,
  geetestChallenge: PropTypes.string,
  geetestValidate: PropTypes.string,
  geetestSeccode: PropTypes.string
};