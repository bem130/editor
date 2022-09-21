class NEditor {
    constructor() {
        this.lines = ["Hello World!","This is a editor for web-apps"];
        this.cursor = [0,0];
    }
    setText(text) {}
    addText(text) {}
    deleteText(text) {}
    moveCursor(x,y) {}
    selectText(text) {}
}
class NEditorUI {
    constructor(editorarea) {
        this.editor = new NEditor();
        this.ui = editorarea;
        this.initalui();
    }
    initalui() {
        this.ui.classList.add("NEditor");
        // edit area
        let editarea = document.createElement("div");
        editarea.classList.add("editarea");
        this.ui.appendChild(editarea);
        {
            for (let i=0;i<this.editor.lines.length;i++) {
                let lines = document.createElement("div");
                lines.innerText = this.editor.lines[i];
                editarea.appendChild(lines);
                console.log(this.editor.lines[i]);
            }
        }
        // under bar
        let infobar = document.createElement("div");
        infobar.classList.add("infobar");
        {
            // cursor
            let infocursor = document.createElement("div");
            infocursor.innerHTML = this.editor.cursor;
            infobar.appendChild(infocursor);
        }
        this.ui.appendChild(infobar);
    }
    setui() {}
}