import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20', // Use whatever API latest version
    });
  }

  async getProducts(): Promise<Stripe.Product[]> {
    const products = await this.stripe.products.list();
    return products.data;
  }

  async getCustomers() {
    const customers = await this.stripe.customers.list({});
    return customers.data;
  }

  async createPaymentIntent(amount: number, currency: string) {
    return await this.stripe.paymentIntents.create({
      amount,
      currency,
    });
  }

  async createCheckoutSessionService(priceId: string) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // ID del precio del producto en Stripe
          quantity: 1, // La cantidad de productos
        },
      ],
      mode: 'payment',
      success_url: `https://near-vet-front-git-main-teamhvets-projects.vercel.app/appointment/success`, // URL de éxito
      cancel_url: `https://near-vet-front-git-main-teamhvets-projects.vercel.app/appointment/reject`, // URL de cancelación
    });
    return { url: session.url };
  }
  /*   

@Injectable()
export class SomeService {
  private client: ClientProxy;

  constructor() {
    
  }

  public async callMicroservice(data: any) {
    return this.client.send('pattern-name', data).toPromise();
  }
}
 */
}
