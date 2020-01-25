import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceForm.css";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import { AuthContext } from "../../shared/contexts/auth-context";

export default function NewPlace() {
  const { loading, error, makeRequest, clearError } = useHttpClient();
  const { userId } = useContext(AuthContext);
  const history = useHistory();
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

  const placeSubmitHandler = async event => {
    event.preventDefault();

    try {
      await makeRequest("/places", "post", {
        title: formData.inputs.title.value,
        description: formData.inputs.description.value,
        address: formData.inputs.address.value,
        creator: userId
      });
      history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {loading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
}
