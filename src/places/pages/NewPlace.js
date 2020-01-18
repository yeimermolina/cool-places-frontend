import React from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";

export default function NewPlace() {
  const [formData, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      }
    },
    false
  );

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
        ADD PLACE
      </Button>
    </form>
  );
}
