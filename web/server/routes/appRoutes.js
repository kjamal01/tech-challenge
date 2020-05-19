const requireLogin = require("../middleware/requireLogin");
const { user } = require("../models/user");
const { album } = require("../models/album");
const { photo } = require("../models/photo");

module.exports = (app) => {
  app.get("/users", async (req, res) => {
    try {
      const users = await user.find();
      res.send(users);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/addAlbum", requireLogin, async (req, res) => {
    try {
      var albumName = req.query.name;
      var createdAlbum = await new album({
        userID: req.user.id,
        name: albumName,
      }).save();
      res.send(createdAlbum);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/album/:id", requireLogin, async (req, res) => {
    try {
      var albumID = req.params.id;
      var foundAlbum = await album.find({ _id: albumID, userID: req.user.id });
      res.send(foundAlbum);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/albums", requireLogin, async (req, res) => {
    try {
      var foundAlbums = await album.find({ userID: req.user.id });
      res.send(foundAlbums);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/addPhoto", requireLogin, async (req, res) => {
    try {
      var albumID = req.query.albumID;
      var name = req.query.name;
      var link = req.query.link;

      var createdPhoto = await new photo({
        userID: req.user.id,
        albumID: albumID,
        name: name,
        urlLink: link,
      }).save();
      res.send(createdPhoto);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/photos", requireLogin, async (req, res) => {
    try {
      var photos = await photo.find({ userID: req.user.id });
      res.send(photos);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/photo/:id", requireLogin, async (req, res) => {
    try {
      var photoID = req.params.id;
      var foundPhoto = await photo.find({ _id: photoID, userID: req.user.id });
      res.send(foundPhoto);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  app.get("/photosInAlbum/:id", requireLogin, async (req, res) => {
    try {
      var albumID = req.params.id;
      var foundPhoto = await photo.find({
        albumID: albumID,
        userID: req.user.id,
      });
      res.send(foundPhoto);
    } catch (error) {
      res.status(400).send(error);
    }
  });
};
