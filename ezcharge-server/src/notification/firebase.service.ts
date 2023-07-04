import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FirebaseService {
  private readonly firebaseUrl: string = 'https://fcm.googleapis.com/fcm/send';
  private readonly serverKey: string =
    'AAAARmezrxM:APA91bE_sOzOWQ7KuatA_PAuU2ITqlwIsN9AKw9cgy6fx5ihdXHW6OZSYgGbkzkHI1A5CYrBcCcchPVkKsp588-aSS6p1fWy2wEUSAIZ-C6lyQ-89NFbxTUscd2Lv_7lCBstnZsrYBSq'; // You need to replace it with your actual server key

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
