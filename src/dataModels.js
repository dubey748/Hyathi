const dataModels = [
  {
    "name": "SOLUTION",
    "fields": {
      "x": {
        "label": "X",
        "type": "int",
        "defaultValue": 10,
        "readOnly": false,
        "calculate": null
      },
      "y": {
        "label": "Y",
        "type": "int",
        "defaultValue": 15,
        "readOnly": false,
        "calculate": null
      },
      "sum": {
        "label": "Sum",
        "type": "int",
        "readOnly": true,
        "calculate": "$x + $y"
      }

    }
  }
];

export default dataModels;
