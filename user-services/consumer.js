const amqp = require("amqplib");

async function startConsumer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "book_created";

  await channel.assertQueue(queue, { durable: true });

  console.log("User Service listening...");

  channel.consume(queue, (msg) => {
    const data = JSON.parse(msg.content.toString());

    console.log("Event diterima:", data);

    channel.ack(msg);
  });
}

startConsumer();