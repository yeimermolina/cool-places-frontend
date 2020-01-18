import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from "../../shared/utils/validator";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UI/Card";

const PLACES = [
  {
    id: "p1",
    title: "New York",
    description: "New York City!",
    imageUrl:
      "https://www.visittheusa.cl/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-04/7010d1e88b80578f3d4e6fc09c2a2379.jpeg?itok=YLMbh1Rm",
    address: "New York",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: "u1"
  },
  {
    id: "p2",
    title: "New York",
    description: "New York City!",
    imageUrl:
      "https://www.visittheusa.cl/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-04/7010d1e88b80578f3d4e6fc09c2a2379.jpeg?itok=YLMbh1Rm",
    address: "New York",
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creatorId: "u2"
  }
];

export default function UpdatePlace() {
  const placeId = useParams().placeId;
  const [loading, setLoading] = useState(true);

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

  const place = PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if (place) {
      setFormData(
        {
          title: {
            value: place.title,
            isValid: true
          },
          description: {
            value: place.description,
            isValid: true
          }
        },
        true
      );
    }

    setLoading(false);
  }, [setFormData, place]);

  const placeSubmitHandler = event => {
    event.preventDefault();
    console.log(formData.inputs);
  };

  if (!place) {
    return (
      <div className="center">
        <Card>
          <h2>Place not found</h2>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="center">
        <h2>Loading</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
        value={formData.inputs.title.value}
        valid={formData.inputs.title.isValid}
      />
      <Input
        id="description"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description"
        onInput={inputHandler}
        value={formData.inputs.description.value}
        valid={formData.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formData.isValid}>
        EDIT PLACE
      </Button>
    </form>
  );
}
