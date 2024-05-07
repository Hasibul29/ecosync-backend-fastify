import {initializeApp, applicationDefault } from 'firebase-admin/app';
import { FastifyPluginAsync } from "fastify";
import { getMessaging } from "firebase-admin/messaging";
// import prisma from "../utils/client";

// process.env.GOOGLE_APPLICATION_CREDENTIALS;

// initializeApp({
//     credential: applicationDefault(),
//     projectId: 'ecosync-notifier',
//   });

const notify: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    const message = {
        notification: {
          title: "Notif",
          body: 'This is a Test Notification'
        },
        token: "cKE2GphpTSWASEjPT0DLzV:APA91bHA8WlHBFhyHj0Ku7hNDsTXJp6m3hm3MoEemUeeCkFVZbi07-w6hnuqXWIue1XXrv5ZhO9VnO26fv4vZpBBEK2Lj_6oJKCEbcYgyOkNUj2iyftrcbMmNINTQ-mZBymuLXgtv8nW",
      };
      
      getMessaging()
        .send(message)
        .then((response) => {
          reply.status(200).send({
            message: "Successfully sent message",
            token: "",
          });
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          reply.status(400);
          reply.send(error);
          console.log("Error sending message:", error);
        });
    
    return { notify: "notify" };
  });
};

export default notify;

