function compile() {
    var html = document.getElementById("html-part");
    var css = document.getElementById("css-part");
    var js = document.getElementById("js-part");
    var output = document.getElementById("output").contentWindow.document;

    document.body.onkeyup = function () {
        output.open();
        output.writeln(html.value + "<style>" + css.value + "</style>" + "<script>" + js.value + "</script>");
        output.close();
    };
}

compile();

const sizeIcons = document.querySelectorAll('.size-icon');

// Download files Function
var downloadBtn = document.getElementById("download");

function downloadFiles() {
    var htmlCode = htmlStart + document.getElementById("html-part").value + htmlEnd;
    var cssCode = document.getElementById("css-part").value;
    var jsCode = document.getElementById("js-part").value;

    downloadAll([
        ['index.html', 'data:text/html,' + encodeURIComponent(htmlCode)],
        ['style.css', 'data:text/css,' + encodeURIComponent(cssCode)],
        ['script.js', 'data:text/javascript,' + encodeURIComponent(jsCode)]
    ])
}

function downloadAll(files) {
    if (files.length == 0) {
        return;
    }

    let file = files.pop();

    var anchor = document.createElement('a');
    anchor.setAttribute("href", file[1]);
    anchor.setAttribute("download", file[0]);
    document.body.appendChild(anchor);

    anchor.click();

    downloadAll(files);
}

const htmlStart = `<!DOCTYPE html>\n<html lang="en">\n\n<head>\n\t<meta charset="UTF-8">\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>ASC Editor Project</title>\n\t<link rel="stylesheet" href="style.css">\n\t<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">\n</head>\n\n<body>\n\t`;

const htmlEnd = `\n\t<script src="script.js"></script>\n</body>\n\n</html>`;

downloadBtn.addEventListener('click', downloadFiles);

document.getElementById("close").addEventListener("click", () => {
    document.getElementById("info").setAttribute("style", "display:none");
});

sizeIcons.forEach(sizeIcon => {
    sizeIcon.addEventListener('click', () => {
        let elem = sizeIcon.id.replace('I', '');
        if(sizeIcon.src.includes('collapse')) {
            document.getElementById(elem).style.flexGrow = 0;
            sizeIcon.src = 'images/expand.svg'
        } else {
            document.getElementById(elem).style.flexGrow = 1;
            sizeIcon.src = 'images/collapse.svg'
        }
    })
})