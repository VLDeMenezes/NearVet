import { Controller, Get, Post, Put, Delete, Param, Body, ParseUUIDPipe, Query } from '@nestjs/common';
import { MethodPayService } from './method-pay.service';
import { CreateMethodPayDto } from './dto/create-method-pay.dto';
import { UpdateMethodPayDto } from './dto/update-method-pay.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('MethodPays')
@Controller('method-pays')
export class MethodPayController {
  constructor(private readonly methodPayService: MethodPayService) {}

  @Get()
  @ApiOperation({summary: "Obtiene todos los métodos de pago"})
  getAllMethodPays() {
    return this.methodPayService.getAllMethodPays();
  }

  @Get(':id')
  @ApiOperation({summary: "Obtiene un método de pago por ID"})
  getMethodPayById(@Param('id', ParseUUIDPipe) id: string) {
    return this.methodPayService.getMethodPayById(id);
  }

  @Post()
  @ApiOperation({summary: "Crea un nuevo método de pago"})
  createMethodPay(@Body() createMethodPayDto: CreateMethodPayDto) {
    return this.methodPayService.createMethodPay(createMethodPayDto);
  }

  @Put(':id')
  @ApiOperation({summary: "Actualiza un método de pago existente"})
  updateMethodPay(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMethodPayDto: UpdateMethodPayDto,
  ) {
    return this.methodPayService.updateMethodPay(id, updateMethodPayDto);
  }

  @Delete(':id')
  @ApiOperation({summary: "Elimina un método de pago"})
  deleteMethodPay(@Param('id', ParseUUIDPipe) id: string) {
    return this.methodPayService.deleteMethodPay(id);
  }
}
