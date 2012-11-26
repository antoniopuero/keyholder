Helpers = {
	shifted_symbols: {
        59: 58,     // ; -> :
        61: 43,     // + -> =
        44: 60,     // , -> <
        45: 95,     // - -> _
        46: 62,     // . -> >
        47: 63,     // / -> ?
        192: 96,    // ` -> ~
        92: 124,    // \ -> |
        39: 34,    // ' -> "
        49: 33,     // 1 -> !
        50: 64,     // 2 -> @
        51: 35,     // 3 -> #
        52: 36,     // 4 -> $
        53: 37,     // 5 -> %
        54: 94,     // 6 -> ^
        55: 38,     // 7 -> &
        56: 42,     // 8 -> *
        57: 40,     // 9 -> (
        58: 41,     // 0 -> )
        91: 123,    // [ -> {
        93: 125     // [ -> }
    },
	key_names: {
	    'SPACE': 32,
	    'ENTER': 13,
	    'TAB': 9,
	    'BACKSPACE': 8,
	    //'SHIFT': 16,
	    'CTRL': 17,
	    'ALT': 18,
	    'CAPS_LOCK': 20,
	    'NUM_LOCK': 144,
	    'SCROLL_LOCK': 145,
	    'LEFT': 37,
	    'UP': 38,
	    'RIGHT': 39,
	    'DOWN': 40,
	    'PAGE_UP': 33,
	    'PAGE_DOWN': 34,
	    'HOME': 36,
	    'END': 35,
	    'INSERT': 45,
	    'DELETE': 46,
	    'ESCAPE': 27,
	    'PAUSE': 19
	},
	assign: function(array) { //return keyCode of key name
		for(var i = 0, max=array.length; i<max; i++){
			if(Helpers.key_names[array[i].toUpperCase()]) {
				return Helpers.key_names[array[i].toUpperCase()];
			} else {
				return false;
			}
		}
	},
	split: function(string){//string of keys(such as 'shift+a' is spliting to array['shift','a'])
		return string.split('+');
	},
	filter_letter: function(array){ //find the letter, because length of letter is 1
		var letter = array.filter(function(key){
			 return key.toString().length === 1;
		})
		if(letter.length>1){// now letter is array and we accept only array with 1 elements 
			console.log('only one letter accepted!');
		}
		return letter[0];//return first and single element, which is our letter
	},
	isLower: function (code) { // checks for lower letter 
    	return code >= 97 && code <= 122; 
	},
	isUpper: function (code) { //checks for upper letter
		return code >= 65 && code <= 90;
	},
	shifted: function (code) {// return code of char when shiftKey==true
		return code-32;
	},
	take: function(selector){//for keyhandler
		var new_obj = document.querySelector(selector);
			new_obj.mass = [];
			new_obj.kbhit = function(letter,callback){//main function
				var arr = Helpers.split(letter),
					shift = arr.some(function(key){//if some of array's elements equals shift returns true
							return key == 'shift';
					}),
					letter_for_anti=letter,
					code;// we use it later
				if(Helpers.assign(arr)){
					code = Helpers.assign(arr);//we're using it now
					console.log(code);
				}
				if (arr.length>1){//if we have a combination of keys such as 'shift+o' we filtering our array and recieve only 'o' as letter
					letter = Helpers.filter_letter(arr);
				}
				this.mass.push(//adding information to main array, which consists of handlers
					{
					letter: letter_for_anti, //for correct removing handler 
					callback: function(event){//our handlers factory
						if(code){
							//console.log('code');
							if ((event.which == code)||(event.keyCode == code)){
					 			callback.call(this,event);
					 		}
						} else {
						//console.log('else');
					 //для того чтобы корректно скидать хендлер в анти(), по-другому никак
					 	if(shift){
							//console.log('shift');
					 		code = (shift&&Helpers.isLower(letter.charCodeAt(0)))?
					 		 Helpers.shifted(letter.charCodeAt(0)) : //transform to shifted key
					 		 Helpers.shifted_symbols[letter.charCodeAt(0)];//for other symbols
					 		if (event.which == code){
					 			callback.call(this,event);
					 		}
					 	}
						else if(/*(event.shiftKey == Helpers.isUpper(letter.charCodeAt(0)))&&*/(letter.length === 1)&&(event.which === letter.charCodeAt(0))){
							//console.log('else if');
							callback.call(this,event);
						}
						}
					}});
				if(this.nodeName){
					this.addEventListener('keypress', this.mass[this.mass.length-1].callback, true);
				}
			}
			new_obj.anti = function(letter){//remove handler only by passing letter or combination
				for(var i =0, max = this.mass.length;i<max; i++){
					if(this.mass[i].letter === letter){
						this.removeEventListener('keypress',this.mass[i].callback, true);
						delete this.mass[i];//create undefined cell in array
					}
				}
				this.mass = this.mass.filter(function(key){
			 		return key!==undefined;//clear undefined cell
				})
			}
		return new_obj;
	}
}