const amqp = require("amqplib");

class RabbitMQService {
  async connect() {
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel();
    console.log("Connected to RabbitMQ");
  }

  async sendToQueue(queue, message) {
    if (!this.channel) await this.connect();

    await this.channel.assertQueue(queue, { durable: true });

    this.channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message))
    );

    console.log("Message sent:", message);
  }
}

module.exports = new RabbitMQService();