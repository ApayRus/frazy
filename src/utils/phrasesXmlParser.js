function fullTagToObject(inputTag) {
    // clear tag text
    let inputText = inputTag.replace(/<(.+)\/*\s*>/, "$1");
    // extract tag and remove it from text
    let [, tag = ""] = inputText.match(/\s*(.+?)\s+/) || [];
    tag = tag.toLowerCase();
    const allowedTags = ["img", "actor", "comment"];
    if (!allowedTags.includes(tag)) return null;
    inputText = inputText.replace(/^\s*.+?\s+/, ""); // removed tag - first word in text

    if (!inputText) return null; // <actor     /> - tag exists but text - not

    const attsArray = inputText.match(/\s*.+?=\s*?".+?"/g);

    const attributes = attsArray ?
        attsArray.reduce((obj, elem) => {
            const attributeArray = elem.trim().split("=");
            const [key, value] = attributeArray;
            obj[key.trim()] = value.replace(/['"]/g, "").trim();
            return obj;
        }, {}) : {
            [getDefaultAttribute(tag)]: inputText
        }; // <actor Neil /> , <img http://domain.com/file.png />

    return {
        [tag]: {...attributes }
    };
}

/**
<http://domain.com/file-path.jpg> => <img src="http://domain.com/file-path.jpg" /> 
<Nail> - at the beginning => <actor name="Nail" /> 
<Nail> - at the end => <comment text="Nail" /> 
 */
function shortTagToObject(shortXml, phraseLine) {
    const addTagToShortXml = (shortXml, tag) => {
        return tag ? shortXml.replace(/^\s*</, `<${tag} `) : null;
    };
    let fullTag = "";
    if (shortXml.match(/https*/)) {
        fullTag = addTagToShortXml(shortXml, "img");
    } else {
        const positionOfMatch = getPositionOfSubstringInString(
            shortXml,
            phraseLine
        );
        const tag = getDefaultTag(positionOfMatch);
        fullTag = addTagToShortXml(shortXml, tag);
    }
    return fullTag ? fullTagToObject(fullTag) : null;
}

export function phraseTextToObject(phraseLine) {
    const xmlPattern = /<.+?\/*>/g;
    // 1) we find all xml-like patterns in the string

    const match = phraseLine.match(xmlPattern) || [];
    // console.log("match", match);

    // 2) if xml tag is with props like name="", src="", we do:
    const phraseObject = match.reduce((obj, elem) => {
        // console.log(phraseLine.find(elem))
        const tagObject = tagToObject(elem, phraseLine);
        return {...obj, ...tagObject };
    }, {});
    // after we have extracted all xml-tags, we remove them and save the rest like "text"
    phraseObject["text"] = phraseLine.replace(xmlPattern, "");

    return phraseObject;
}

function tagToObject(tag, phraseLine) {
    return fullTagToObject(tag) ?
        fullTagToObject(tag) :
        shortTagToObject(tag, phraseLine);
}

function getDefaultAttribute(tag) {
    const mapTagAttr = {
        actor: "name", // <actor Neil / >
        img: "src", // <img http://domain.com/file-path.jpg / >
        comment: "text" // <comment text bla bla bla / >
    };
    return mapTagAttr[tag];
}

function getDefaultTag(xmlPositionInLine) {
    const mapPositionTag = {
        start: "actor", // <actor Neil / >
        end: "comment", // <comment text bla bla bla / >
        middle: ""
    };
    return mapPositionTag[xmlPositionInLine];
}

// start , middle , end
function getPositionOfSubstringInString(substring, string) {
    const startPattern = new RegExp("^\\s*" + substring);
    const endPattern = new RegExp(substring + "\\s*$");
    if (string.match(startPattern)) return "start";
    if (string.match(endPattern)) return "end";
    return "middle";
}