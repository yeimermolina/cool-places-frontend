import React, { useState, useContext } from "react";
import "./Auth.css";
import Card from "../../shared/components/UI/Card";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/form-hook";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/contexts/auth-context";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const auth = useContext(AuthContext);
  const [formData, handleInput, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const login = e => {
    e.preventDefault();
    auth.login();
    console.log("LOGIN!");
  };

  const switchAuthMode = () => {
    if (!isLogin) {
      setFormData(
        {
          ...formData.inputs,
          name: undefined
        },
        formData.inputs.email.isValid && formData.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formData.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }
    setIsLogin(prevMode => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Login</h2>
      <hr />
      <form onSubmit={login}>
        {!isLogin && (
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid Name"
            onInput={handleInput}
          />
        )}
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address"
          onInput={handleInput}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password"
          onInput={handleInput}
        />
        <Button type="submit" disabled={!formData.isValid}>
          {isLogin ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>
      <Button inverse onClick={switchAuthMode}>
        SWITCH TO {isLogin ? "SIGNUP" : "LOGIN"}
      </Button>
    </Card>
  );
}
