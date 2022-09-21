class NEditor {
    constructor() {
        this.lines = ["Hello World!","This is a editor for web-apps"];
        this.cursor = [1,5];
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
        this.selector();
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
                lines.classList.add("line");
                for (let j=0;j<this.editor.lines[i].length;j++) {
                    let chars = document.createElement("span");
                    chars.classList.add("char");
                    chars.innerText = this.editor.lines[i][j];
                    lines.appendChild(chars);
                }
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
    selector() {
        let char = document.querySelector(`.NEditor > div.editarea > div:nth-child(${this.editor.cursor[0]}) > span:nth-child(${this.editor.cursor[1]})`);
        {
            let cursor = document.createElement("div");
            cursor.classList.add("cursor");
            char.after(cursor);
        }
        console.log(char);
    }
    setui() {}
}