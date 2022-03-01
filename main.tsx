import { serve } from "https://deno.land/std@0.120.0/http/server.ts";

const games = [
  {"name": "lazy hack", "description": "lazy hack"},
  {"name":"Dodgeball classic", "description":"Kids run about the floor, leaders throw the ball and if the kids are hit below the waist, then they are out"},
  {"name":"Ninja Strike", "description":"Kids stand in a circle. The starting player(designated by the leader in charge), attempts to hit the hand of the person next to them. if the hand is hit then the person puts that hand behind their back. Then it is the next players turn(whoever was dodging or was hit). We always play to the right hand side. It is very important to emphasise that we are not hitting with any force"},
  {"name":"Dodgeball Teams", "description":"Kids are split into 2 teams. Balls are put along the middle of the hall. All kids should be touching their respective walls. When the leader says 'Go' the kids go and collect the balls, before throwing they must again touch the back walls on their side. If the kids are below the waist, then they are out. If the ball is caught before the ball hits the floor then the person who threw the ball is out and a member of the team who caught the ball can come back in if they were out. This is first in, first out"},
  {"name":"Sector ball", "description":"Kids are split into 4 teams and each given a sector to stand in. An adult leader should face away from the game ensuring that they can't see what is going on. A ball is thrown and the main objective is to get the ball out of your sector. The leader who is facing away can yell 'STOP' at any point. Once this is done, the team with the ball in their sector will lose a team member."},
  {"name":"Pirates treasure", "description":"get everyone into a circle with a hole in it between 2 designated people(helpers, leaders or designated in some other way), pick someone to guard the treasure(keys or something that makes a sound). one by one a child is chosen to steal the trasure. This person takes the treasure as quietly as possible and has to get round the circle anti clockwise. if the runner is caught by the pirate then they also sit in the circle. The next runner now has to run round the circle twice(this continues if the next runner is caught. if there is 5 people in the circle then they are running 6 times). "}
]

function handler(req: Request): Response {
  
  const randomNumber = Math.floor(Math.random() * (games.length - 1) + 1);
  const randomGame = games[randomNumber];

  return new Response("Game: " + randomGame.name + ", description: " + randomGame.description);
}

console.log("Listening on http://localhost:8000");
await serve(handler);
