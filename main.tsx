import { listenAndServe } from "https://deno.land/std@0.110.0/http/server.ts";

const addr = ":8080";
const HTML = await Deno.readFile("./index.html");

const games = [
  {"name":"", "description":""},
  {"name":"Dodgeball classic", "description":"Kids run about the floor, leaders throw the ball and if the kids are hit below the waist, then they are out"},
  {"name":"Ninja Strike", "description":"Kids stand in a circle. The starting player(designated by the leader in charge), attempts to hit the hand of the person next to them. if the hand is hit then the person puts that hand behind their back. Then it is the next players turn(whoever was dodging or was hit). We always play to the right hand side. It is very important to emphasise that we are not hitting with any force"},
  {"name":"Dodgeball Teams", "description":"Kids are split into 2 teams. Balls are put along the middle of the hall. All kids should be touching their respective walls. When the leader says 'Go' the kids go and collect the balls, before throwing they must again touch the back walls on their side. If the kids are below the waist, then they are out. If the ball is caught before the ball hits the floor then the person who threw the ball is out and a member of the team who caught the ball can come back in if they were out. This is first in, first out"},
  {"name":"Sector ball", "description":"Kids are split into 4 teams and each given a sector to stand in. An adult leader should face away from the game ensuring that they can't see what is going on. A ball is thrown and the main objective is to get the ball out of your sector. The leader who is facing away can yell 'STOP' at any point. Once this is done, the team with the ball in their sector will lose a team member."},
  {"name":"Pirates treasure", "description":"get everyone into a circle with a hole in it between 2 designated people(helpers, leaders or designated in some other way), pick someone to guard the treasure(keys or something that makes a sound). one by one a child is chosen to steal the trasure. This person takes the treasure as quietly as possible and has to get round the circle anti clockwise. if the runner is caught by the pirate then they also sit in the circle. The next runner now has to run round the circle twice(this continues if the next runner is caught. if there is 5 people in the circle then they are running 6 times). "},
  {"name":"Wink Murderer", "description":"All	scouts	are	in	a	circle	,	a	detective	is	outside	(	1	scout).	A	murderer	is	chosen	and	then	the detective	comes	back	in	and	has	to	figure	out	who	the	murderer	is.	The	murderer	kills	people	by	winking	at	them	or	sticking	their	tongue	out	until	the	detective	figures out	who	the	murderer	is."},
  {"name":"Ladders", "description":"Everyone	sits	down	in	two	lines	opposite	some	one	else.	Every	pair	should	have	their	feet	touching.	Each	pair	is	given	a	number;	when	their	u=number	is	called	the pair	stand	up	and	run	up	between	everyone’s	legs	(like	a	ladder)	until	they	reach	to	the	top,	they	then	run	on	the	outside	to	the	end	and	up	the	middle	again	until	they	reach	their	place.	The	first	of	the	pair	who	sits	down	gets	a	point	for	their	side.	"},
  {"name":"1,2,3	Go", "description":"The group is split in four and each one stands in a corner. When one is called everyone runs width ways across the hall, then two is called everyone runs length ways and when three is called everyone runs diagonally. There should be plenty of confusion, it can be run as a knockout game."},
  {"name":"Bench Ball", "description":"This game involves patrol-sized teams. The object of the game is to score a goal by throwing the ball to your own goalie who is standing on a bench at the end of the hall. Each team has a goalie at either end of the hall. When they have the ball, players cannot move from the spot they are on, they must throw it to a team mate"},
  {"name":"Scotch", "description":"The players run around the hall and when they are running a tennis ball is introduced into the mix. When a player catches the ball in their hands they shout ‘Scotch’. At this point all other players must freeze. The player with the ball in their hands can turn by pivoting on one foot but cannot move otherwise. They must throw the ball at someone and try and hit them to get them out. Once the ball has left the players hands all the other players can move again and dodge the ball being thrown at them. If a player is hit by the ball they are out."},
  {"name":"Lightning", "description":"This room is a big open field. This chair in the centre of the room (place chair in centre of room) is a tall tree. Your patrol is hiking across the field. The sky has just darkened and there is the sound of thunder. You have just seen flashes of lightning. Correct action is to move from the tree and be low to the ground"},
  {"name":"Nosebleed", "description":"Each	of	you	has	a	nosebleed.	Demonstrate	how	you	handle	this	situation. Correct Action is to sit down and lean slightly forward. Breathing through the mouth, each Scout should press his nostrils firmly together."},
  {"name":"Nose Ball", "description":"Staying with the tennis ball same set up but this time nose it across the line blowing it means you're out."},
  {"name":"It’s	under	a	cup", "description":"Place a row of about 20 paper cups down the middle of the hall turned upside down. Under each cup place an object (such as key, whistle, spool of thread etc). Divide the troop into two teams and line them up on either side of the hall. Number them off from 1 to whatever. The leader calls a number and an object. The Scouts may only use their right hand to lift cups up and place them back down. The first one to find the object and bring it back to their team wins a point. Don’t allow the Scouts to fling the cups all over the place as all the objects will be revealed. The rest of the teams should be looking on trying to memorise where all the other items are."},
  {"name":"Bucket Ball", "description":"Participants are separated into two teams and a member of each team stands on a chair at the opposing end of the hall to their team with a bucket in their hands. The object of the game is to throw the ball into their teams bucket to score a point. It’s a non contact game and the only way the ball can be intercepted by the other team is when its flying through the air. Also they can’t travel with the ball!"}

]

async function handleRequest(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);
    console.log(pathname);

 
    if (pathname.startsWith("/main.css")) {
      const file = await Deno.readFile("./main.css");
      return new Response(file, {
        headers: {
          "content-type": "text/css",
        },
      });
    }

    if(pathname.startsWith("/Scouts_Logo_Marque_Purple.png")) {
        const file = await Deno.readFile("./Scouts_Logo_Marque_Purple.png");
        return new Response(file, {
        headers: {
            "content-type": "image/png",
        },
        });
    }
    if(pathname.startsWith("/listOfGames")) {
      const file = await Deno.readFile("./listOfGames.html");
        return new Response(file, {
        headers: {
            "content-type": "text/html",
        },
        })
    }
    if(pathname.startsWith("/randomGame")) {
      const file = await Deno.readFile("./randomGame.html");
        return new Response(file, {
        headers: {
            "content-type": "text/html",
        },
        })
    }
    if(pathname.startsWith("/getRandomGame")) {
        const randomNumber = Math.floor(Math.random() * (games.length - 1) + 1);
      const randomGame = games[randomNumber];
    
      return new Response(JSON.stringify(randomGame), {headers: {"content-type": "application/json"}});
    }
    if(pathname.startsWith("/getAllGames")) {
      return new Response(JSON.stringify(games), {headers: {"content-type": "application/json"}});
    }
  return new Response(HTML, {
    headers: {
      "content-type": "text/html",
    },
  });
};

console.log(`HTTP webserver running. Access it at: http://localhost:8080/`);
await listenAndServe(addr, handleRequest);