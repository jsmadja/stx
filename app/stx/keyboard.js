var keyboard = {

    getKeyFromEvent: function (e) {
        var keyCode = e.keyCode;
        var char = String.fromCharCode(keyCode);
        if (keyCode === 187) {
            char = '+';
        }
        if (keyCode === 189) {
            char = '-';
        }
        if (char === 'À') {
            char = '@';
        }
        if (char === '¾') {
            char = '.';
        }
        return char;
    }

};