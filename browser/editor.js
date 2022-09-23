class NEditor {
    constructor() {
        this.lines = [""];
        this.cursor = [1,0];
    }
    setText(text) {}
    addText(text) {
        this.lines[this.cursor[0]-1] = this.lines[this.cursor[0]-1].slice(0,this.cursor[1])+text+this.lines[this.cursor[0]-1].slice(this.cursor[1]);
        this.cursor[1]++;
    }
    deleteText() {
        if (this.cursor[1]>0) {
            this.lines[this.cursor[0]-1] = this.lines[this.cursor[0]-1].slice(0,this.cursor[1]-1)+this.lines[this.cursor[0]-1].slice(this.cursor[1]);
            this.cursor[1]--;
        }
    }
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
        // cursor
        this.composingtext = document.createElement("span");
        this.composingtext.classList.add("composing");
        this.addtextarea = document.createElement("textarea");
        this.addtextarea.classList.add("addtext");
        //this.addtextarea.onchange = this.addtext.bind(this);
        this.addtextarea.oninput = this.addtext.bind(this);
        this.addtextarea.onkeydown = this.keyevent.bind(this);
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
        this.updatelines();
    }
    addtext(e) {
        if( e.isComposing ) {
            this.composingtext.innerText = e.target.value;
            return;
        }
        else {
            for (let i=0;i<e.target.value.length;i++) {
                this.editor.addText(e.target.value[i]);
            }
            e.target.value = "";
            this.composingtext.innerText = "";
        }
        this.updatelines();
    }
    keyevent(e) {
        if (e.keyCode==8) {
            this.editor.deleteText();
            this.updatelines();
        }
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
        this.moveselector();
    }
    moveselector() {
        console.log(this.editor.cursor)
        let chars = document.querySelector(`.NEditor > div.editarea > div:nth-child(${this.editor.cursor[0]}) > span:nth-child(${this.editor.cursor[1]})`);
        if (chars==null) {
            chars = document.querySelector(`.NEditor > div.editarea > div:nth-child(${this.editor.cursor[0]})`);
        }
        chars.after(this.addtextarea);
        chars.after(this.composingtext);
        this.addtextarea.focus();
    }
    setui() {}
}