import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Validator from "validator";
import {
  Form,
  Button,
  Message,
  Divider,
  Header,
  Icon,
  Container
} from "semantic-ui-react";
import InlineError from "../../messages/InlineError";
import { Link } from "react-router-dom";
import { login } from "../../actions/auth";

class Login extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    loading: false,
    errors: {}
  };
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .login(this.state.data)
        .then(() => this.props.history.push("/"))
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    if (!data.password) errors.password = "Can't be blank";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Container text>
        <Header as="h2" icon textAlign="center">
          <Icon name="sign in" circular />
          <Header.Content>SIGN IN</Header.Content>
        </Header>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.global && (
            <Message negative>
              <Message.Header>Something went wrong</Message.Header>
              <p>{errors.global}</p>
            </Message>
          )}
          <Form.Field error={!!errors.email}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@example.com"
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Make it secure"
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <p>
            <Link to="/forgot_password">Forgot Password?</Link>
          </p>
          <Link to="/signup" className="ui primary button">
            Register
          </Link>
          <Button primary>Login</Button>
          <Divider horizontal>Or</Divider>
        </Form>
      </Container>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(Login);
