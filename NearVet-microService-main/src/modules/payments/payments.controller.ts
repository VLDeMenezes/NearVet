import { Controller, Get, Post, Body } from '@nestjs/common';
//import { ApiBody, ApiTags } from '@nestjs/swagger';
//import { MercadopagoService } from './mercado-pago/mercado-pago.service';
//import { MercadoPagoDTO } from './mercado-pago/mercado-pago.dto';
import { StripeService } from './stripe/stripe.service';
@Controller('payments')
export class PaymentsController {
  constructor(
    //private readonly mercadopagoService: MercadopagoService,
    private readonly stripeService: StripeService,
  ) {}
  /* 
  @Post('/mercado-pago')
  @ApiBody({
    description: 'Se deben agregar los campos de titulo, cantidad y precio',
    required: true,
    type: MercadoPagoDTO,
  })
  async createPayment(@Body() body: MercadoPagoDTO) {
    const { title, quantity, price } = body;

    try {
      const preference = await this.mercadopagoService.createPreference(title, quantity, price);
      return { preferenceId: preference.id };
    } catch (error) {
      console.error('Error en la creación de la preferencia:', error);
      throw error;
    }
  } */
  @Get('/stripe/products')
  async getProducts() {
    return await this.stripeService.getProducts();
  }

  @Get('/stripe/customers')
  async getCustomers() {
    return await this.stripeService.getCustomers();
  }
  /* 
  @Post('/stripe/create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, 'usd');
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } */
  /* @ApiBody({
    description: 'Solo se ingresa el ID del producto cargado en el dashboard/products de stripe',
    required: true,
  }) */
  @Post('/stripe/create-checkout-session')
  async createCheckoutSession(@Body('priceId') priceId: string) {
    return await this.stripeService.createCheckoutSessionService(priceId);
  }
}
