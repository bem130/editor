class NEditor {
    constructor() {
        this.lines = [""];
        this.cursor = [1,0];
        this.composing = "";
        this.composingcursor = 0;
    }
    setText(text) {}
    composingText(text) {
        this.composingtext = text;
        this.composingcursor = text.length;
    }
    addText(text) {
        this.lines[this.cursor[0]-1] = this.lines[this.cursor[0]-1].slice(0,this.cursor[1])+text+this.lines[this.cursor[0]-1].slice(this.cursor[1]);
        this.cursor[1]++;
    }
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
        this.editarea.onclick = function() {this.addtextarea.focus()}.bind(this);
        this.ui.appendChild(this.editarea);
        this.updatelines();
        // cursor
        this.addtextarea = document.createElement("textarea");
        this.addtextarea.classList.add("addtext");
        //this.addtextarea.onchange = this.addtext.bind(this);
        this.addtextarea.oninput = this.addtext.bind(this);
        // under bar
        let infobar = document.createElement("div");
        infobar.classList.add("infobar");
        {
            // cursor info
            let infocursor = document.createElement("div");
            infocursor.innerHTML = [this.editor.cursor[0],this.editor.cursor[1]];
            infobar.appendChild(infocursor);
        }
        this.ui.appendChild(infobar);
        this.moveselector();
    }
    addtext(e) {
        if( e.isComposing ) {
          console.log("未確定",e.target.value);
          this.editor.composingText(e.target.value);
          return
        }
        else {
            console.log("確定");
            for (let i=0;i<e.target.value.length;i++) {
                this.editor.addText(e.target.value[i]);
            }
            e.target.value = "";
        }
        this.updatelines();
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
        console.log(this.editor.cursor)
        let chars = document.querySelector(`.NEditor > div.editarea > div:nth-child(${this.editor.cursor[0]}) > span:nth-child(${this.editor.cursor[1]})`);
        if (chars==null) {
            chars = document.querySelector(`.NEditor > div.editarea > div:nth-child(${this.editor.cursor[0]})`);
        }
        chars.after(this.addtextarea);
        this.addtextarea.focus();
    }
    setui() {}
}