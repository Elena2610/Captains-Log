const express = require("express");
const jsxEngine = require("jsx-view-engine");
const connectDB = require('./utils/initDB');
const Logs = require("./controllers/logs");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working");
});

app.get("/logs/new", (req, res) => {
  res.render("New");
});

app.post("/logs", async (req, res) => {
  if (req.body.shipIsBroken === "on") {
    req.body.shipIsBroken = true;
  } else {
    req.body.shipIsBroken = false;
  }
  
  try {
    const createdLog = await Logs.create(req.body);
    console.log(createdLog);
    res.redirect("/logs");
  } catch (error) {
    console.log(error);
  }
});

app.get("/logs", async (req, res) => {
  try {
    const logs = await Logs.find({});
    res.render("Index", { logs });
  } catch (e) {
    console.log(e);
  }
});

app.get("/logs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const log = await Logs.findById(id);
    res.render("Show", { log });
  } catch (e) {
    console.log(e);
  }
});

app.delete("/logs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Logs.findByIdAndDelete(id);
    res.redirect("/logs");
  } catch (e) {
    console.log(e);
  }
});

app.get("/logs/:id/edit", async (req, res) => {
    const { id } = req.params;
    try {
        const log = await Logs.findById(id);
        res.render("Edit", { log });
    } catch (error) {
        console.log(error);
    }
})

app.put("/logs/:id", async (req, res) => {
    const { id } = req.params;
    if (req.body.shipIsBroken === "on") {
      req.body.shipIsBroken = true;
    } else {
      req.body.shipIsBroken = false;
    }
    try {
      await Logs.findByIdAndUpdate(id, req.body, {
        new: true, 
      });
      res.redirect(`/logs/${id}`);
    } catch (e) {
      console.log(e);
    }
  });

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});