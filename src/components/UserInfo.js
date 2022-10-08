export default class UserInfo {
  constructor({selectorName, selectorProfession, avatarSelector}) {
    this._fieldName = document.querySelector(selectorName);
    this._fieldProfession = document.querySelector(selectorProfession);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const info = {
      nameValue: this._fieldName.textContent,
      professionValue: this._fieldProfession.textContent
    };
    return info;
  }

  setUserInfo(inputs) {
    this._fieldName.textContent = inputs.name;
    this._fieldProfession.textContent = inputs.about;
    this._avatar.style.backgroundImage = `url(${inputs.avatar})`;
  }
}
