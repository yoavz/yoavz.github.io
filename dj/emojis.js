window.onload = function(){
    // yoavz favorite emojis
    var emoji_map = {
        "cash": "emojis/Emoji_Objects/Emoji_Objects-80.png",
        "dice": "emojis/Emoji_Objects/Emoji_Objects-151.png",
        "books": "emojis/Emoji_Objects/Emoji_Objects-127.png",
        "horns": "emojis/Emoji_Objects/Emoji_Objects-143.png",
        "sushi": "emojis/Emoji_Objects/Emoji_Objects-191.png",
        "aubergine": "emojis/Emoji_Objects/Emoji_Objects-228.png",
        "trees": "emojis/Emoji_Nature/Emoji_Natur-72.png",
        "moon": "emojis/Emoji_Nature/Emoji_Natur-97.png",
        "prayer": "emojis/Emoji_Smiley/Emoji_Smiley-120.png",
        "flames": "emojis/Emoji_Smiley/Emoji_Smiley-91.png",
        "egg": "emojis/Emoji_Objects/Emoji_Objects-200.png",
        "donut": "emojis/Emoji_Objects/Emoji_Objects-202.png",
    };
    var emoji_list = Object.keys(emoji_map).map(key => emoji_map[key]);

    var emoji_height = 30;
    var emoji_width = 30;
    var emoji_path = emoji_list[Math.floor(Math.random()*emoji_list.length)];
    var num_horizontal = 8;
    var num_vertical = 6; 
    var fall_speed = 1; 
    var spin_speed = Math.PI / 100.0;

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
            p.y += 1;
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
