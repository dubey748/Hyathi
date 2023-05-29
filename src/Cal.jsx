import React, { useState } from "react";
import dataModels from "./dataModels.js";

const Cal = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [formData, setFormData] = useState({});
  const [calculationResult, setCalculationResult] = useState(null);

  const handleModelChange = (event) => {
    const modelName = event.target.value;
    const selectedDataModel = dataModels.find(
      (model) => model.name === modelName
    );
    setSelectedModel(selectedDataModel);
    setFormData({});
    setCalculationResult(null);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: parseFloat(value), 
    }));
    calculateValue(fieldName, parseFloat(value));
  };

  const calculateValue = (fieldName, value) => {
    const { fields } = selectedModel;
    const field = fields[fieldName];

    if (field.calculate) {
      const expression = field.calculate.replace(
        /\$(\w+)/g,
        (_, fieldName) => formData[fieldName]
      );
      const result = eval(expression);

      setCalculationResult((prevResult) => ({
        ...prevResult,
        [fieldName]: result,
      }));
    }
  };

  const renderFields = () => {
    if (selectedModel) {
      const { fields } = selectedModel;

      return Object.entries(fields).map(([fieldName, field]) => (
        <div key={fieldName}>
          <label htmlFor={fieldName}>{field.label}</label>
          <input
            type="number"
            id={fieldName}
            value={formData[fieldName] || ""}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
          />
        </div>
      ));
    }

    return null;
  };

  const renderCalculationResult = () => {
    if (calculationResult) {
      return Object.entries(calculationResult).map(([fieldName, result]) => (
        <div key={fieldName}>
          <label>{fieldName}</label> <br/>
          <span>{result}</span>
        </div>
      ));
    }

    return null;
  };

  return (
    <div>
      <label htmlFor="modelSelect">Select a Data Model:</label>
      <select id="modelSelect" onChange={handleModelChange}>
        <option value="">Select Model</option>
        {dataModels.map((model) => (
          <option key={model.name} value={model.name}>
            {model.name}
          </option>
        ))}
      </select>

      {selectedModel && (
        <div>
          <h2>{selectedModel.name}</h2>
          <form>
            {renderFields()}
           
          </form>
          <h3>Calculation Result:</h3>
          {renderCalculationResult()}
        </div>
      )}
    </div>
  );
};

export default Cal;
