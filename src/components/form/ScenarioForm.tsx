import React, { useState, ChangeEvent, FormEvent } from "react";
import BreadCrumb from "../breadcrumb";
import Button from "../lib/button";

const breadcrumbItems = [{ title: "add", link: "/add/scenario" }];

interface Field {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
  option?: { value: string; label: string }[];
}

interface FormData {
  [key: string]: string;
}

interface Props {
  pageTitle: string;
  fields: Field[];
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
}

const ScenarioForm: React.FC<Props> = ({
  pageTitle,
  fields,
  onSubmit,
  onCancel,
}) => {
  const initialFormData: FormData = {};
  const initialErrors: FormData = {};
  fields.forEach((field) => {
    initialFormData[field.name] = field.defaultValue || "";
    initialErrors[field.name] = field.defaultValue || "";
  });

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormData>(initialErrors);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Perform validation on change
    const error = !value
      ? `Please fill in ${fields
          .find((f) => f.name === name)
          ?.label.toLowerCase()}`
      : "";
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Clear previous errors
    setErrors(initialErrors);

    // Define an object to hold all validation errors
    const validationErrors: FormData = {};

    // Validate inputs
    for (const field of fields) {
      // Check if the field is empty
      if (!formData[field.name]) {
        validationErrors[
          field.name
        ] = `Please fill in ${field.label.toLowerCase()}`;
      }

      // Additional validation for initialPositionY
      if (field.name === "initialPositionX") {
        const positionX = parseInt(formData[field.name]);
        if (positionX > 800 || positionX < 0) {
          validationErrors[
            field.name
          ] = `${field.label} should not be > 800 and < 0 `;
        }
      }
      if (field.name === "initialPositionY") {
        const positionY = parseInt(formData[field.name]);
        if (positionY > 600 || positionY < 0) {
          validationErrors[
            field.name
          ] = `${field.label} should not be > 600 and < 0 `;
        }
      }
    }

    // If there are any validation errors, set the errors state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Call onSubmit prop function with scenario data
      await onSubmit(formData);

      // Reset form fields and error messages
      setFormData(initialFormData);
      setErrors(initialErrors);
    } catch (error) {
      console.error("Error creating scenario:", error);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors(initialErrors);
  };

  return (
    <div className="scenario-wrapper">
      <BreadCrumb
        path={"/all/scenario"}
        title="Scenario"
        items={breadcrumbItems}
      />
      <div className="scenario">
        <h2>{pageTitle}</h2>
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="scenario-form">
              {fields.map((field, index) => (
                <div key={index} className="field">
                  <label>{field.label}:</label>
                  {field.type === "select" ? (
                    <select
                      className="select"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    >
                      <option value="">Select {field.label}</option>
                      {field.option?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      defaultValue={field.defaultValue}
                      placeholder={field.placeholder}
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                    />
                  )}

                  {errors[field.name] && !field.defaultValue && (
                    <div className="error-message">{errors[field.name]}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="buttons">
              <Button backgroundColor="green" type="submit">
                Add
              </Button>
              <Button
                type="button"
                backgroundColor="orange"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="button"
                backgroundColor="rgb(112, 112, 241)"
                onClick={onCancel}
              >
                Go Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScenarioForm;
