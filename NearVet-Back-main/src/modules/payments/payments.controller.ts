import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
//import { MercadopagoService } from './mercado-pago/mercado-pago.service';
//import { MercadoPagoDTO } from './mercado-pago/mercado-pago.dto';
import { StripeService } from './stripe/stripe.service';

@ApiTags('payments')
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
  /* @Get('/stripe/products')
  async getProducts() {
    return await this.stripeService.getProducts();
  }

  @Get('/stripe/customers')
  async getCustomers() {
    return await this.stripeService.getProducts();
  }

  @Post('/stripe/create-payment-intent')
  async createPaymentIntent(@Body('amount') amount: number) {
    const paymentIntent = await this.stripeService.createPaymentIntent(amount, 'usd');
    return {
      clientSecret: paymentIntent.client_secret,
    };
  } */
  @Post('/stripe/create-checkout-session')
  @ApiBody({
    description: 'Solo se ingresa el ID del producto cargado en el dashboard/products de stripe',
    //{"priceId":"price_1PxepLG7LObgRzJ9FJDUYGxW"}
    required: true,
})
  async callStripeMicroservice(@Body('priceId') priceId: string) {
    const response = await this.stripeService.callStripeMicroservice(priceId);
    return response;
  }
}
