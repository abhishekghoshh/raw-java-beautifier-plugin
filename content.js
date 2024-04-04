const COMMENT_PATTERN_1=/\/\/(.*)/g
const COMMENT_PATTERN_2=/\/\*(.*?)\*\//g

const KEYWORD_PATTERN=/\b(public|private|protected|static|final|class|interface|extends|implements|void|int|float|double|char|boolean|if|else|for|while|do|switch|case|default|try|catch|finally|throw|throws|return|break|continue|new|this|super|null|true|false)\b/g

const LINK_PATTERN=/(https:\/\/[^\s]+)/g

document.querySelectorAll('pre').forEach((element) => {
    element.style.backgroundColor = '#f5f5f5';
    element.style.padding = '10px';
    element.innerHTML=beautifyCode(element.innerHTML);
    // console.log(element.innerHTML);
});

function beautifyCode(javaCode) {
    // Split the code into lines
    const lines = javaCode.split('\n');
    let beautifiedLines = [];

    // Beautify each line
    lines.forEach(line => {
        // Add indentation
        line = line.replace(/\t/g, '    ');

        // Highlight syntax
        if(COMMENT_PATTERN_1.test(line)){
            line = line.replace(COMMENT_PATTERN_1, '<span class="comment">//$1</span>');
        }else if(COMMENT_PATTERN_2.test(line)){
            line = line.replace(COMMENT_PATTERN_2, '<span class="comment">/*$1*/</span>');
        }else if(KEYWORD_PATTERN.test(line)){
            line = line.replace(KEYWORD_PATTERN, '<span class="keyword">$1</span>');
        }
        

        // line = line.replace(/(".*?")/g, '<span class="string">$1</span>');
        beautifiedLines.push(line);
    });

    // Join the lines back together
    return beautifiedLines.join('\n');
}