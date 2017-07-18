window.onload = function(){
    var emoji_path = "emojis/cheese.png";

    var emoji_height = 30;
    var emoji_width = 30;
    var spin_speed = 2.4 * Math.PI / 100.0;
    var fall_speed = 1.4;

    // Pick number of emojis based on screen size
    console.log($(window).width());
    console.log($(window).height());
    if ($(window).width() > 500 && $(window).height() > 500) {
        var num_horizontal = 10;
        var num_vertical = 8; 
    } else {
        var num_horizontal = 5;
        var num_vertical = 4; 
    }

    //image init
    var invisible = $("<div></div>", {"style": "display:none;"}); 
    var img = $("<img />", {"id": "emoji", "src": emoji_path});
    invisible.append(img);
    $("body").append(invisible);

	//canvas init
	var canvas = document.getElementById("canvas");
    var emoji = document.getElementById("emoji");
	var ctx = canvas.getContext("2d");
	
	//canvas dimensions
	var W = window.innerWidth;
	var H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;
    var grid_x = W / num_horizontal;
    var grid_y = H / num_vertical;
    var initial_offset = H + grid_y;

    // emojis
	var particles = [];
	for(var y = -1; y <= (num_vertical+1); y++) {
        for(var x = 0; x <= num_horizontal; x++) {
            if (Math.abs(y) % 2 != x % 2) {
                continue;
            }
            particles.push({
                "x": x * grid_x,
                "y": y * grid_y - initial_offset,
                "a": 0.0,
                "d": x % 2
            })
        }
	}
	
	//Lets draw the flakes
	function draw()
	{
		ctx.clearRect(0, 0, W, H);
		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
            ctx.translate(p.x, p.y);
            ctx.rotate(p.a);
            ctx.drawImage(emoji, -emoji_width / 2,  -emoji_height / 2, 
                                 emoji_width, emoji_height);
            ctx.rotate(-p.a);
            ctx.translate(-p.x, -p.y);
		}
		update();
	}
	
	//Function to move the snowflakes
	//angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
	function update()
	{

		for(var i = 0; i < particles.length; i++)
		{
			var p = particles[i];
            p.y += fall_speed;
            if (p.y > (H + grid_y)) {
                p.y = (-1 * grid_y);
            }

            if (p.d % 2) {
                p.a += spin_speed;
            } else {
                p.a -= spin_speed;
            }
		}
	}
	
	//animation loop
	setInterval(draw, 33);
}
