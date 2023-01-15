import { listenAndServe } from "https://deno.land/std@0.110.0/http/server.ts";
import { validPaths } from "./validPaths.ts";

const addr = ":8081";

async function handleRequest(request: Request): Promise<Response> {
    const { pathname } = new URL(request.url);

    const validPath = validatePathAndReturnPathToServe(pathname);

    if ("No Valid Path" === validPath.urlPath) {
      const errorhtml = await Deno.readFile("./pages/error.html");
      return new Response(errorhtml, {
        headers: {
          "content-type": "text/html",
        },
      });
    }
     
    if ("json" === validPath.extention) {
      const contentType = validPath.contentType + validPath.extention;
      const games = JSON.parse(await Deno.readTextFile("./data/games.json"));
      if("getRandomGame" === validPath.urlPath) {
        const randomNumber = Math.floor(Math.random() * games.length + 1);
        const randomGame = games[randomNumber];
        return new Response(JSON.stringify(randomGame), {headers: {"content-type": contentType}});
      }

      if("getAllGames" === validPath.urlPath) {
        return new Response(JSON.stringify(games), {headers: {"content-type": contentType}});
      }
    }

    const useFileExtention = "javascript" !== validPath.extention;
    const fileExtention = useFileExtention ?  "." + validPath.extention : "";
    let fileToRead = "./" + validPath.resourcePath + validPath.urlPath + fileExtention;
    
    if ("manifest+json" === validPath.extention) {
      fileToRead = "./assets/favicon/" + validPath.urlPath;
    } else if ("png" === validPath.extention) {
      const path = "Scouts_Logo_Marque_Purple" === validPath.urlPath ? "images/" : "favicon/";
      fileToRead = "./assets/" + path +  validPath.urlPath + "." + validPath.extention
    }

    const file = await Deno.readFile(fileToRead);
    return new Response(file, {
      headers: {
        "content-type": validPath.contentType + "/" + validPath.extention,
      },
    });
}

function validatePathAndReturnPathToServe(pathname: string): { urlPath: string, resourcePath: string, contentType: string, extention: string }  {
  let pathObject: { urlPath: string, resourcePath: string, contentType: string, extention: string }  = {urlPath: "No Valid Path", resourcePath: "", contentType: "", extention: ""};
  validPaths.forEach(validPath => {
    if (pathname.includes(validPath.urlPath)) {
      pathObject = validPath;
    }
  })
 return pathObject;
}


await listenAndServe(addr, handleRequest);