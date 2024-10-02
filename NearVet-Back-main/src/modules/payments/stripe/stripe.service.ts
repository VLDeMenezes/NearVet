/* import { Injectable } from '@nestjs/common';
import { ClientProxyFactory, Transport, ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StripeService {
  private client: ClientProxy;
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'localhost', port: 3001 },
    });
  }

  public async callStripeMicroservice(data: any) {
    // Usar lastValueFrom para manejar el observable
    const result = await lastValueFrom(this.client.send('pattern-name', data));
    console.log('Respuesta recibida desde el microservicio:', result);
    return result;
  }
}

 */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StripeService {
  constructor(private readonly httpService: HttpService) {}

  public async callStripeMicroservice(data: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post('https://payment-microservice-ztse.onrender.com/payments/stripe/create-checkout-session', {
          priceId: data,
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error al comunicar con el microservicio:', error.message);
      throw error;
    }
    /* 
    // Usar lastValueFrom para manejar el observable
    const result = await lastValueFrom(this.client.send('pattern-name', data));
    console.log('Respuesta recibida desde el microservicio:', result);
    return result; */
  }
}
