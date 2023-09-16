import express from "express";
import { getPosts, getPost, postComment } from "../controllers/controllers.js";
import { auth } from "express-oauth2-jwt-bearer";

const router = express.Router()

const checkJwt = auth({
  audience: 'http://localhost:5001',
  issuerBaseURL: `https://dev-q036a1lkecpa2kx0.us.auth0.com/`,
  tokenSigningAlg: 'RS256'
});


router.get("/", getPosts)

router.get("/:id", getPost)

router.post("/:id/comments", checkJwt, postComment)


export {router}