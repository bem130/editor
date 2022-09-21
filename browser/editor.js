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
    }
    initalui() {
        this.ui.classList.add("NEditor");
        // edit area
        this.editarea = document.createElement("div");
        this.editarea.classList.add("editarea");
        this.ui.appendChild(this.editarea);
        this.updatelines();
        // cursor
        this.addtext = document.createElement("input");
        this.addtext.classList.add("addtext");
        // under bar
        let infobar = document.createElement("div");
        infobar.classList.add("infobar");
        {
            // cursor info
            let infocursor = document.createElement("div");
            infocursor.innerHTML = this.editor.cursor;
            infobar.appendChild(infocursor);
        }
        this.ui.appendChild(infobar);
        this.moveselector();
    }
    updatelines() {
        this.editarea.innerHTML = "";
        for (let i=0;i<this.editor.lines.length;i++) {
            let lines = document.createElement("div");
            lines.classList.add("line");
            for (let j=0;j<this.editor.lines[i].length;j++) {
                let chars = document.createElement("span");
                chars.classList.add("char");
                chars.innerText = this.editor.lines[i][j];
                lines.appendChild(chars);
            }
            this.editarea.appendChild(lines);
        }
    }
    moveselector() {
        let char = document.querySelector(`.NEditor > div.editarea > div:nth-child(${this.editor.cursor[0]}) > span:nth-child(${this.editor.cursor[1]})`);
        char.after(this.addtext);
        this.addtext.focus();
    }
    setui() {}
}