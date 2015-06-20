/*!
 * Translitify Tool
 * http://github.com/eisverticker/translitify
 *
 * Transliteration made simple for textareas
 * Try it out!
 *
 * Copyright Alexander Noack (anoack93@gmx.de)
 * Released under the MIT license
 */

/* Table of contents:
 * 1. translitifier (Constructor-Function)
 * 2. translitify (Function) -- uses 1.
 */

//Prototype of Transliteration-Objects
function translitifier(textarea, settings) {
    var me = this, //used for anon function in initTextArea..

		//vars for handling special key actions like shift and control
		locked = false, //no transliteration if locked
		writeUpperCase = false,

		//handling "shift + .." characters in chrome/opera?
		// with keypress-methode
		isCharMissed = false,

		temporaryLetterExists = false, //for letter-replacement

		SPECIAL_KEYS = [
        'Shift',
        'Backspace',
        'Control'];

    //
    this.input = {
        'SPECIAL_KEY': 0,
            'SINGLE_CHAR': 1,
            'MULTIPLE_CHAR': 2,
            'UNDEFINED': 3
    };


    /*
     * PUBLIC Functions
     * ----------------------------------------------------------------
     */

    this.setProfile = function (aFrom, aTo) {
      if(this.profiles[aFrom][aTo] === undefined){
        throw {
         "message": "profile "+aFrom+"."+aTo+" doesn't exist",
         "type": 'profile undefined'
        };
      }else{
        this.from = aFrom;
        this.to = aTo;
      }
    };

    this.addEventListener = function (eventType, listener) {
        //Dummy
    };

    this.removeEventListener = function (eventType, listener) {
        //Dummy
    };

    this.dispatchEvent = function (event) {
        //Dummy https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
    };

    /*
     * PRIVATE Functions
     * -----------------------------------------------------------------
     */
    function getProfile(){
      return me.profiles[me.from][me.to];
    }

    function insertAtCaret(letter) {

        //old IE 8 (hope it works - not tested)
        if (document.selection !== undefined) {
            document.selection.createRange().text = letter;
            //newer browsers
        } else if (textarea.selectionStart !== undefined) {
            var val = textarea.value;
            var start = textarea.selectionStart;
            textarea.value = val.substr(0, start) + letter + val.substr(textarea.selectionEnd);
            textarea.selectionStart = start + 1;
            textarea.selectionEnd = start + 1;
        } else { //fallback
            textarea.value += letter;
        }

    }

    //deletes one letter behind the caret
    function deleteAtCaret() {

        //old IE 8 and lower (hope it works - not tested)
        if (document.selection !== undefined) {

            //inserting some character to find the selection position
            insertAtCaret(String.fromCharCode(2622));
            var oldValue = textarea.value;
            var pos = oldValue.indexOf(String.fromCharCode(2622));
            textarea.value = oldValue.substr(0, pos) + oldValue.substr(pos + 1);

            //newer browsers
        } else if (textarea.selectionStart !== undefined) {

            var val = textarea.value,
				start;

            if (textarea.selectionStart === 0) {
                start = 0;
            } else {
                start = textarea.selectionStart - 1;
            }
            textarea.value = val.substr(0, start) + val.substr(textarea.selectionEnd);
            textarea.selectionStart = start;
            textarea.selectionEnd = start;

        } else { //fallback
            textarea.value += letter;
        }

    }

    //output the given letter to the textarea at caret position
    function writeLetter(letter) {

        if (!isNaN(parseInt(letter, 10))) {
            letter = String.fromCharCode(parseInt(letter, 10));
        }
        insertAtCaret(letter);

    }

    //Returns something like "Shift", "A",...
    function getKeyValue(event) {

        //Some browsers don't support event.key
        // so we have to take care about it
        if (event.key === undefined) {

            if (event.keyCode === undefined) {
                alert("Browser is too old!");
                return "?";
            }


            //Special chars while shift pressed are
            // problematic in browsers which do not
            // support event.key (e.g. chrome)
            var code;
            if (event.shiftKey === true && (event.keyCode < 65 || event.keyCode > 90)) {
                isCharMissed = true;
                writeUpperCase = true; //fail if not set
                return null;
            } else {
                code = event.keyCode;
            }

            switch (code) {
                case 17:
                    return 'Control';
                case 16:
                    return 'Shift';
                case 8:
                    return 'Backspace';
                default:
                    return String.fromCharCode(event.keyCode);
            }

        } else {
            //Firefox and IE support it
            return event.key;
        }

    }

    //categorize the input key
    function getInputType(input) {

        if (SPECIAL_KEYS.indexOf(input) !== -1) {
            return me.input.SPECIAL_KEY;
        } else if (input.length === 1) {
            return me.input.SINGLE_CHAR;
        } else if (input.length > 1) {
            return me.input.MULTIPLE_CHAR;
        } else {
            return me.input.UNDEFINED;
        }

    }

    function processLetter(newLetter, event) {
        var profile = getProfile();

        //case-sensitivity
        var size = writeUpperCase === true ? 'upper' : 'lower';

        //if the letter doesn't exist, exit
        if (currentNode[newLetter] === undefined) {
            temporaryLetterExists = false;
            if (profile[newLetter] === undefined) {
                return;
            } else {
                currentNode = profile;
            }
        }

        //output and replacement
        if (currentNode[newLetter][size] !== undefined) {
            if (temporaryLetterExists === true) {
                deleteAtCaret();
            }
            temporaryLetterExists = true;
            writeLetter(currentNode[newLetter][size]);
        }

        //prevent the event from being handled by the browser
        event.preventDefault();

        //prepare for the next letter
        if (currentNode[newLetter].children === undefined) {
            currentNode = profile;
            temporaryLetterExists = false;
        } else {
            currentNode = currentNode[newLetter].children;
        }

    }

    function initTextAreaEvents() {

        //keyup-event-listener for unlocking/case-sensitiy
        var keyup = function (event) {

            var key = getKeyValue(event);

            if (key === null) return;

            if (locked === true && key == "Control") {
                locked = false;
            }
            if (writeUpperCase === true && key == "Shift") {
                writeUpperCase = false;
            }

        };

        //chrome (and opera?) only
        textarea.onkeypress = function (event) {
            var profile = getProfile();

            if (isCharMissed === true) {
                if (textarea.isTranslitified === true && locked === false) {

                    var key = String.fromCharCode(event.which);
                    if (key === null) return;

                    switch (getInputType(key)) {
                        case me.input.SINGLE_CHAR:
                            processLetter(key.toLowerCase(), event);
                            return;
                        case me.input.MULTIPLE_CHAR:
                            return; //not supported
                        case me.input.SPECIAL_KEY:
                            if (key == "Backspace") {
                                currentNode = profile;
                                temporaryLetterExists = false;
                            } else if (key == "Control") {
                                locked = true;
                            } else if (key == "Shift") {
                                writeUpperCase = true;
                            }
                            return;
                        default:
                            return;
                    }

                }
                isCharMissed = false;
            }
        };

        //keydown-event-listener to replace letters
        var keydown = function (event) {
          var profile = getProfile();

            if (textarea.isTranslitified === true && locked === false) {

                var key = getKeyValue(event);
                if (key === null) return;

                switch (getInputType(key)) {
                    case me.input.SINGLE_CHAR:
                        processLetter(key.toLowerCase(), event);
                        return;
                    case me.input.MULTIPLE_CHAR:
                        return; //not supported
                    case me.input.SPECIAL_KEY:
                        if (key == "Backspace") {
                            currentNode = profile;
                            temporaryLetterExists = false;
                        } else if (key == "Control") {
                            locked = true;
                        } else if (key == "Shift") {
                            writeUpperCase = true;
                        }
                        return;
                    default:
                        return;
                }

            }
        };

        //observe events
        if (textarea.addEventListener) { //newer browsers
            textarea.addEventListener('keydown', keydown);
            textarea.addEventListener('keyup', keyup);
        } else { //old Browsers (IE8-)
            textarea.attachEvent('onkeydown', keydown);
            textarea.attachEvent('onkeyup', keyup);
        }

        //Activate transliteration by default
        textarea.isTranslitified = true;

        //reference object
        textarea.translitifier = me;
    }

    initTextAreaEvents();
    this.setProfile(settings.from, settings.to);
    var currentNode = getProfile();
}

/**
 * Statische Attribute
 */
translitifier.prototype = {
  "profiles": {}
};

/**
 * Adds a letter profile to all translitifiers
 * @param {String} aFrom
 * @param {String} aTo
 * @param {Profile-Object}
 */
translitifier.prototype.addProfile = function(aFrom, aTo, profile){
    if(this.profiles[aFrom] == undefined){
      this.profiles[aFrom] = {};
    }
    this.profiles[aFrom][aTo] = profile;
};

/**
 * Factory-Function
 * @param {HTML-Node-Textarea} textarea
 * @param {Settings-Objekt} settings
 */
function translitify(textarea, settings) {
    new translitifier(textarea, settings);
}
