/**
 * Container Generator
 */

const componentExists = require("../utils/componentExists");

module.exports = {
  description: "Add a container component",
  prompts: [
    {
      type: "list",
      name: "type",
      message: "Select the base component type:",
      default: "React.Component",
      choices: () => [
        "React.Component",
        "React.PureComponent",
        "Stateless Function"
      ]
    },
    {
      type: "input",
      name: "name",
      message: "What should it be called?",
      default: "Form",
      validate: value => {
        if (/.+/.test(value)) {
          return componentExists(value)
            ? "A component or container with this name already exists"
            : true;
        }

        return "The name is required";
      }
    },
    {
      type: "confirm",
      name: "wantHeaders",
      default: false,
      message: "Do you want headers?"
    },
    {
      type: "confirm",
      name: "wantActionsAndReducer",
      default: true,
      message: "Do you want an actions/constants/reducer for this container?"
    },
    {
      type: "confirm",
      name: "wantSaga",
      default: true,
      message: "Do you want sagas for asynchronous flows? (e.g. fetching data)"
    },
    {
      type: "confirm",
      name: "wantLoadable",
      default: true,
      message: "Do you want to load resources asynchronously?"
    }
  ],
  actions: data => {
    // Generate index.js and index.test.js
    var componentTemplate; // eslint-disable-line no-var

    switch (data.type) {
      case "Stateless Function": {
        componentTemplate = "./container/stateless.js.hbs";
        break;
      }
      default: {
        componentTemplate = "./container/class.js.hbs";
      }
    }

    const actions = [
      {
        type: "add",
        path: "../src/containers/{{properCase name}}/index.js",
        templateFile: componentTemplate,
        abortOnFail: true
      },
      {
        type: "add",
        path: "../src/containers/{{properCase name}}/{{properCase name}}.css",
        templateFile: "./container/style.js.hbs",
        abortOnFail: true
      }
    ];

    // If they want actions and a reducer, generate actions.js, constants.js,
    // reducer.js and the corresponding tests for actions and the reducer
    if (data.wantActionsAndReducer) {
      // Actions
      actions.push({
        type: "add",
        path: "../src/containers/{{properCase name}}/actions.js",
        templateFile: "./container/actions.js.hbs",
        abortOnFail: true
      });

      // Constants
      actions.push({
        type: "add",
        path: "../src/containers/{{properCase name}}/constants.js",
        templateFile: "./container/constants.js.hbs",
        abortOnFail: true
      });

      // Reducer
      actions.push({
        type: "add",
        path: "../src/containers/{{properCase name}}/reducer.js",
        templateFile: "./container/reducer.js.hbs",
        abortOnFail: true
      });
    }

    // Sagas
    if (data.wantSaga) {
      actions.push({
        type: "add",
        path: "../src/containers/{{properCase name}}/saga.js",
        templateFile: "./container/saga.js.hbs",
        abortOnFail: true
      });
    }

    if (data.wantLoadable) {
      actions.push({
        type: "add",
        path: "../src/containers/{{properCase name}}/Loadable.js",
        templateFile: "./component/loadable.js.hbs",
        abortOnFail: true
      });
    }

    return actions;
  }
};
