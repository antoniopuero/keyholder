$(document).ready(function(){
	var one = $('#1')
		two = $('#2'),
		three = $('#3'),
		info = $('#info'),
		study = $('#study'),
		contact = $('#contact'),
		footer = $('#footer')
		delta = 0,
		steps = {
			step_1: function(){
				one.slideDown(500);
				info.slideDown(500);
				two.slideUp(500);
				study.slideUp(500);
				three.slideUp(500);
				contact.slideUp(500);
				footer.slideUp(500);
			},
			step_2: function(){
				two.slideDown(500);
				study.slideDown(500);
				one.slideUp(500);
				info.slideUp(500);
				three.slideUp(500);
				contact.slideUp(500);
				footer.slideUp(500);
			},
			step_3: function(){
				three.slideDown(500);
				contact.slideDown(500);
				footer.slideDown(500);
				one.slideUp(500);
				info.slideUp(500);
				two.slideUp(500);
				study.slideUp(500);
			}
		};
	two.slideUp();
	three.slideUp();
	study.slideUp();
	contact.slideUp();
	footer.slideUp();

	document.onmousewheel = function(event){
		if((delta>=0)&&(delta<=2)){
			if(event.wheelDeltaY<0) {
				delta+=1;
			} else {
				delta-=1;
			}
			if(delta==0){
				steps.step_1();
			}
			else if(delta==1){
				steps.step_2();
			}
			else if(delta==2){
				steps.step_3();
			}

		} else if(delta>2) {
			delta = 2;
		} else if(delta<0) {
			delta = 0;
		}
	}
});