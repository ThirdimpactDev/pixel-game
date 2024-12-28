import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketService {
  constructor() {
    this.client = null;
    this.subscriptions = new Map();
    this.isConnecting = false;
    this.connectionPromise = null;
    this.maxRetries = 3;
    this.retryCount = 0;
  }

  connect() {
    // Si ya hay una conexión en proceso, retornar la promesa existente
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // Si ya está conectado, retornar la conexión existente
    if (this.client?.connected) {
      return Promise.resolve(this.client);
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        this.client = new Client({
          webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
          connectHeaders: this.getConnectHeaders(),
          debug: message => {
            if (process.env.NODE_ENV === 'development') {
              console.debug(message);
            }
          },
          reconnectDelay: 5000,
          heartbeatIncoming: 4000,
          heartbeatOutgoing: 4000,
          onConnect: () => {
            console.log('WebSocket connection established');
            this.retryCount = 0;
            this.connectionPromise = null;
            resolve(this.client);
          },
          onStompError: frame => {
            console.error('Broker reported error:', frame.headers['message']);
            this.handleConnectionError(frame, reject);
          },
          onWebSocketError: event => {
            console.error('WebSocket error:', event);
            this.handleConnectionError(event, reject);
          }
        });

        this.client.activate();
      } catch (error) {
        this.handleConnectionError(error, reject);
      }
    });

    return this.connectionPromise;
  }

  handleConnectionError(error, reject) {
    this.retryCount++;
    if (this.retryCount >= this.maxRetries) {
      this.connectionPromise = null;
      this.client?.deactivate();
      this.client = null;
      reject(error);
      return;
    }

    console.log(`Connection attempt ${this.retryCount} of ${this.maxRetries}`);
    setTimeout(() => {
      this.connectionPromise = null;
      this.connect().catch(reject);
    }, 2000 * this.retryCount);
  }

  getConnectHeaders() {
    const token = localStorage.getItem('jwt_token');
    return token ? {
      Authorization: `Bearer ${token}`,
      'X-Requested-With': 'XMLHttpRequest'
    } : {};
  }

  subscribe(topic, callback) {
    if (!topic || typeof callback !== 'function') {
      return Promise.reject(new Error('Invalid subscription parameters'));
    }

    // Si ya existe una suscripción para este topic, retornarla
    const existingSubscription = this.subscriptions.get(topic);
    if (existingSubscription) {
      return Promise.resolve(existingSubscription);
    }

    return this.connect()
      .then(() => {
        const subscription = this.client.subscribe(topic, message => {
          try {
            callback(JSON.parse(message.body));
          } catch (error) {
            console.error('Error processing message:', error);
          }
        });

        this.subscriptions.set(topic, subscription);
        return subscription;
      });
  }

  send(destination, body) {
    if (!destination) {
      return Promise.reject(new Error('Destination is required'));
    }

    return this.connect()
      .then(() => {
        this.client.publish({
          destination,
          headers: this.getConnectHeaders(),
          body: JSON.stringify(body)
        });
      });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.client?.connected) {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.subscriptions.clear();
        this.client.deactivate()
          .then(() => {
            this.client = null;
            this.connectionPromise = null;
            this.retryCount = 0;
            console.log('Disconnected from WebSocket');
            resolve();
          });
      } else {
        this.client = null;
        this.connectionPromise = null;
        this.retryCount = 0;
        resolve();
      }
    });
  }
}

export default new WebSocketService();