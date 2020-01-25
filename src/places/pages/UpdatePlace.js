import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UI/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UI/Card";
import { AuthContext } from "../../shared/contexts/auth-context";

export default function UpdatePlace() {
  const placeId = useParams().placeId;
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [place, setPlace] = useState();
  const { loading, error, makeRequest, clearError } = useHttpClient();

  const [formData, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await makeRequest(`/places/${placeId}`);
        setFormData(
          {
            title: {
              value: response.place.title,
              isValid: true
            },
            description: {
              value: response.place.description,
              isValid: true
            }
          },
          true
        );
        setPlace(response.place);
      } catch (e) {}
    };

    fetchPlace();
  }, [setFormData, makeRequest, placeId]);

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try {
      await makeRequest(`/places/${placeId}`, "patch", {
        title: formData.inputs.title.value,
        description: formData.inputs.description.value
      });
      history.push(`/${auth.userId}/places`);
    } catch (e) {}
  };

  if (loading) {
    return (
      <div className="center">
        <LoadingSpinner asOverlay />
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      {!loading && place && (
        <form className="place-form" onSubmit={placeSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title"
            onInput={inputHandler}
            value={place.title}
            valid={true}
          />
          <Input
            id="description"
            label="Description"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description"
            onInput={inputHandler}
            value={place.description}
            valid={true}
          />
          <Button type="submit" disabled={!formData.isValid}>
            EDIT PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
}
