import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true; // enable sending cookies
const FormData = require("form-data");

export const sendMeta = createAsyncThunk<any, any>(
  "metamsg/post",
  async ({ messageInp, recipientId }, thunkAPI) => {
    try {
      let data = JSON.stringify({
        messageInp,
        recipientId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/meta/sendmsg`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const res = await axios.request(config);

      return await res.data;
    } catch (error: any) {
      // console.log("error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue("error");
    }
  }
);

export const sendgmail = createAsyncThunk<any, any>(
  "metamsg/post",
  async ({ to, subject, body, replyTo, mediaPath }, thunkAPI) => {
    try {
      let data = new FormData();
      data.append("to", to);
      data.append("subject", subject);
      data.append("body", body);
      data.append("replyTo", replyTo);
      data.append("image", mediaPath);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/gmail/sendmail`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
        withCredentials: true,
      };
      const res = await axios.request(config);
      // console.log(res.status);

      return await res.status;
    } catch (error: any) {
      // console.log("error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendOutlook = createAsyncThunk<any, any>(
  "metamsg/post",
  async ({ to, subject, body, replyTo, mediaPath }, thunkAPI) => {
    try {
      let data = new FormData();
      data.append("to", to);
      data.append("subject", subject);
      data.append("body", body);
      data.append("replyTo", replyTo);
      data.append("image", mediaPath);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/outlook/sendmail`,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
        withCredentials: true,
      };
      const res = await axios.request(config);

      return await res.status;
    } catch (error: any) {
      // console.log("error");
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
