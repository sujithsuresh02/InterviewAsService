import express, { Application, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser, { OptionsJson } from "body-parser";

// import configKeys from "../../config";

const expressConfig = (app: Application) => {
  // Development logging

  // Set up CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
  });

  app.use(
    cors({
      origin: ['https://www.interviewxperts.online', 'https://interviewxperts.online'],
      methods: "GET, POST, PUT, PATCH, DELETE",
      exposedHeaders: ["Authorization", "X-My-Custom-Header"],
    })
  );

  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

};

export default expressConfig;
