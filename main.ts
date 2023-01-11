import { listenAndServe } from "https://deno.land/std@0.110.0/http/server.ts";

const addr = ":8081";
const ERROR_HTML = await Deno.readFile("./error.html");

const games = JSON.parse(await Deno.readTextFile("./games.json"));

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

    if (pathname.startsWith("/favicon-16x16.png")) {
      const file = await Deno.readFile("./assets/favicon/favicon-16x16.png");
      return new Response(file, {
        headers: {
          "content-type": "image/png",
        },
      });
    }

    if (pathname.startsWith("/favicon-32x32.png")) {
      const file = await Deno.readFile("./assets/favicon/favicon-32x32.png");
      return new Response(file, {
        headers: {
          "content-type": "image/png",
        },
      });
    }

    if (pathname.startsWith("site.manifest")) {
      const file = await Deno.readFile("./assets/favicon/site.manifest");
      return new Response(file, {
        headers: {
          "content-type": "application/manifest+json",
        },
      });
    }
    

    if(pathname.includes("Scouts_Logo_Marque_Purple.png")) {
        const file = await Deno.readFile("./assets/images/Scouts_Logo_Marque_Purple.png");
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

    if(pathname.startsWith("/homepage")) {
      const file = await Deno.readFile("./index.html");
        return new Response(file, {
        headers: {
            "content-type": "text/html",
        },
        })
    }

    if(pathname.includes("/morseCode.js")) {
      const file = await Deno.readFile("./js/morseCode.js");
        return new Response(file, {
        headers: {
            "content-type": "application/js",
        },
        })
    }
    if(pathname.startsWith("/getRandomGame")) {
        const randomNumber = Math.floor(Math.random() * games.length + 1);
      const randomGame = games[randomNumber];
    
      return new Response(JSON.stringify(randomGame), {headers: {"content-type": "application/json"}});
    }
    if(pathname.startsWith("/getAllGames")) {
      return new Response(JSON.stringify(games), {headers: {"content-type": "application/json"}});
    }
    
  return new Response(ERROR_HTML, {
    headers: {
      "content-type": "text/html",
    },
  });
}
await listenAndServe(addr, handleRequest);