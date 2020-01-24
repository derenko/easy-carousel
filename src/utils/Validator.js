export default class Validator {
  static isEnabled(element, callback) {
    if (element == null) return false;

    callback();
  }
};