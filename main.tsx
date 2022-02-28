import { serve } from "https://deno.land/std@0.120.0/http/server.ts";

const games = [
  {"name":"Dodgeball classic", "description":"Kids run about the floor, leaders throw the ball and if the kids are hit below the waist, then they are out"},
  {"name":"Ninja Strike", "description":"Kids stand in a circle. The starting player(designated by the leader in charge), attempts to hit the hand of the person next to them. if the hand is hit then the person puts that hand behind their back. Then it is the next players turn(whoever was dodging or was hit). We always play to the right hand side. It is very important to emphasise that we are not hitting with any force"},
  {"name":"Dodgeball Teams", "description":"Kids are split into 2 teams. Balls are put along the middle of the hall. All kids should be touching their respective walls. When the leader says 'Go' the kids go and collect the balls, before throwing they must again touch the back walls on their side. If the kids are below the waist, then they are out. If the ball is caught before the ball hits the floor then the person who threw the ball is out and a member of the team who caught the ball can come back in if they were out. This is first in, first out"}
]

function handler(req: Request): Response {
  
  const randomNumber = Math.random() * (games.length - 1) + 1;
  const randomGame = games[1];

  return new Response("Game: " + randomGame.name + ", description: " + randomGame.description);
}

console.log("Listening on http://localhost:8000");
await serve(handler);
