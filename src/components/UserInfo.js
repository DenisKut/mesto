export default class UserInfo {
  constructor({selectorName, selectorProfession}) {
    this._fieldName = document.querySelector(selectorName);
    this._fieldProfession = document.querySelector(selectorProfession);
  }

  getUserInfo() {
    const info = {
      nameValue: this._fieldName.textContent,
      professionValue: this._fieldProfession.textContent
    };
    return info;
  }

  setUserInfo(inputName, inputProfession) {
    this._fieldName.textContent = inputName;
    this._fieldProfession.textContent = inputProfession;
  }
}
