class Editor {
    constructor() {
        this.text = "";
        this.cursor = [0,0];
    }
    setText(text) {}
    addText(text) {}
    deleteText(text) {}
    moveCursor(x,y) {}
    selectText(text) {}
}
class EditorUI {
    constructor(editorarea) {
        this.editor = new Editor();
        this.ui = editorarea;
        console.log(this.ui)
    }
    setui() {}
}