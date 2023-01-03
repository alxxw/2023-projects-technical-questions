import express from "express";

// location is the simple (x, y) coordinates of an entity within the system
// spaceCowboy models a cowboy in our super amazing system
// spaceAnimal models a single animal in our amazing system
type location = { x: number; y: number };
type spaceCowboy = { name: string; lassoLength: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

// spaceEntity models an entity in the super amazing (ROUND UPPER 100) system
type spaceEntity =
  | { type: "space_cowboy"; metadata: spaceCowboy; location: location }
  | { type: "space_animal"; metadata: spaceAnimal; location: location };

// === ADD YOUR CODE BELOW :D ===

// === ExpressJS setup + Server setup ===
const spaceDatabase = [] as spaceEntity[];
const app = express();

// Express will not read body by default without this
app.use(express.json());

// the POST /entity endpoint adds an entity to your global space database
app.post("/entity", (req, res) => {
  for (let entity of req.body.entities) {
    var pushing = {} as spaceEntity;
    const location = {
      x: entity.location.x,
      y: entity.location.y,
    } as location;
    if (entity.type == "space_cowboy") {
      const cowboy = {
        name: entity.metadata.name,
        lassoLength: entity.metadata.lassoSize,
      } as spaceCowboy;
      pushing = { type: "space_cowboy", metadata: cowboy, location: location };
    } else {
      const animal = { type: entity.metadata.type } as spaceAnimal;
      pushing = { type: "space_animal", metadata: animal, location: location };
    }
    spaceDatabase.push(pushing);
  }
  res.end();
});

// lasooable returns all the space animals a space cowboy can lasso given their name
app.get("/lassoable", (req, res) => {
  const name: string = req.body.cowboy_name;
  var space_animals = [] as any[];
  for (let cowboy of spaceDatabase) {
    if (cowboy.type == "space_cowboy" && cowboy.metadata.name == name) {
      const length = cowboy.metadata.lassoLength;
      const location = cowboy.location;
      for (let animal of spaceDatabase) {
        if (animal.type == "space_animal") {
          if (distance(location, animal.location) <= length) {
            space_animals.push({
              type: animal.metadata.type,
              location: animal.location,
            });
          }
        }
      }
    }
  }
  res.json({ space_animals });
});

app.listen(8080);

function distance(a: location, b: location): number {
  var x = a.x - b.x;
  var y = a.y - b.y;
  return Math.sqrt(x * x + y * y);
}
