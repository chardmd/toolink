import passwordValidator from "password-validator";
import { css } from "styled-components";

export const validatePassword = password => {
  // Create a schema
  var schema = new passwordValidator();
  schema
    .is()
    .min(6)
    .is()
    .max(20)
    .has()
    .not()
    .spaces();

  return schema.validate(password);
};

//validate email
export const validateEmail = email => {
  var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  return tester.test(String(email).toLowerCase());
};

export function fbAPI(path) {
  return new Promise((resolve, reject) => {
    try {
      const fb = window.FB;
      fb.api(path, response => {
        resolve(response);
      });
    } catch (ex) {
      reject(ex);
    }
  });
}

export const getUrlPath = data =>
  data && typeof data === "object" ? data.url : data;

export const someProp = (data, props) =>
  data[props.find(prop => data[prop] !== null && data[prop] !== undefined)];

export const media = {
  mobile: (...args) => css`
    @media (max-width: 48em) {
      ${css(...args)};
    }
  `,
  desktop: (...args) => css`
    @media (min-width: 48em) {
      ${css(...args)};
    }
  `
};

export const createApiUrl = props => {
  const { apiKey, url: targetUrl } = props;
  const alias = apiKey ? "pro" : "api";

  let url = `https://micro-open-graph-ksguljmysl.now.sh/?url=${targetUrl}`;
  return url;
};

export const isLarge = cardSize => cardSize === "large";
