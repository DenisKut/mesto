export default class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(objectCards) {
    objectCards.cards.forEach(item => {
      const objItem = {card: item, userId: objectCards.userId};
      this._renderer(objItem);
    });

  }

  addItem(element) {
    this._container.prepend(element);
  }
}
