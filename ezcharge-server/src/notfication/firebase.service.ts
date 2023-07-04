import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FirebaseService {
  private readonly firebaseUrl: string = 'https://fcm.googleapis.com/fcm/send';
  private readonly serverKey: string = 'XXXTOKENXXX'; // You need to replace it with your actual server key

  async sendNotification(
    token: string,
    title: string,
    body: string,
  ): Promise<void> {
    const payload = {
      to: token,
      notification: {
        body: body,
        title: title,
      },
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `key=${this.serverKey}`,
    };

    try {
      const response = await axios.post(this.firebaseUrl, payload, {
        headers: headers,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}
