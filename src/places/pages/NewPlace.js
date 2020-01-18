import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";
import "./NewPlace.css";
import Button from "../../shared/components/FormElements/Button";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid
          }
        },
        isValid: formIsValid
      };
    default:
      return state;
  }
};

export default function NewPlace() {
  const [formData, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid
    });
  }, []);

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formData.inputs);
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        placeholder="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(10)]}
        errorText="Enter a valid description"
        onInput={inputHandler}
      />
      <Input
        id="address"
        type="text"
        element="input"
        label="Address"
        placeholder="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Enter a valid address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formData.isValid}>
        ADD PLACE {formData.isValid}
      </Button>
    </form>
  );
}
