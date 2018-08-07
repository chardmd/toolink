import passwordValidator from "password-validator";

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
