import { listenAndServe } from "https://deno.land/std@0.110.0/http/server.ts";
import { validPaths } from "./validPaths.ts";

const addr = ":8081";
const ERROR_HTML = await Deno.readFile("./error.html");

const games = JSON.parse(await Deno.readTextFile("./games.json"));

async function handleRequest(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);

    const validPath = validatePathAndReturnPathToServe(pathname);

    if ("" === validPath.urlPath) {
      return new Response(ERROR_HTML, {
        headers: {
          "content-type": "text/html",
        },
      });
    }
     
    if ("json" === validPath.extention) {
      const contentType = validPath.contentType + validPath.extention;
      if("getRandomGame" === validPath.urlPath) {
        const randomNumber = Math.floor(Math.random() * games.length + 1);
        const randomGame = games[randomNumber];
        return new Response(JSON.stringify(randomGame), {headers: {"content-type": contentType}});
      }

      if("getAllGames" === validPath.urlPath) {
        return new Response(JSON.stringify(games), {headers: {"content-type": contentType}});
      }
    }

    let fileToRead = "./" + validPath.urlPath + "." + validPath.extention;

    if ("manifest+json" === validPath.extention) {
      fileToRead = "./assets/favicon/" + validPath.urlPath;
    } else if ("png" === validPath.extention) {
      let path = "Scouts_Logo_Marque_Purple" === validPath.urlPath ? "images/" : "favicon/";
      fileToRead = "./assets/" + path +  validPath.urlPath + "." + validPath.extention
    }

    const file = await Deno.readFile(fileToRead);
    return new Response(file, {
      headers: {
        "content-type": validPath.contentType + "/" + validPath.extention,
      },
    });
}

function validatePathAndReturnPathToServe(pathname: string): { urlPath: string, contentType: string, extention: string }  {
  let pathObject: { urlPath: string, contentType: string, extention: string }  = {"urlPath": "", "contentType": "", "extention": ""};
  validPaths.forEach(validPath => {
    if (pathname.includes(validPath.urlPath)) {
      pathObject = validPath;
    }
  })
 return pathObject;
}


await listenAndServe(addr, handleRequest);