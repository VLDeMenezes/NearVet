import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { CouponsRepository } from './coupons.repository';
import { EmailService } from '../email/email.service';

@Injectable()
export class CouponsService {
  constructor(private readonly couponRepository: CouponsRepository,
    private readonly emailService: EmailService,
  ) {}

  async getAllCouponsService(page: number, limit:number) {
    return await this.couponRepository.getAllCouponsRepository(page, limit);
  }

  async getCouponByCodeService(code: string) {
    const coupon = await this.couponRepository.getCouponByCodeRepository(code)
    if (!coupon) return {message: "No existe el coupon"}
    return await this.couponRepository.getCouponByCodeRepository(code);
  }

  async getCouponByIdService(id: string) {
    return await this.couponRepository.getCouponByIdRepository(id);
  }

  async createCouponService(createCoupon: Partial<Coupon>) {
    const createdCoupon = await this.couponRepository.createCouponRepository(createCoupon);
    await this.emailService.sendCouponToUser(createdCoupon.id);
    return createCoupon;
  }

  async updateCouponLess(id: string) {
    return await this.couponRepository.updateCouponLess(id);
  }

  async updateCouponService(id: string, updateCouponDto: UpdateCouponDto) {
    const coupon = await this.couponRepository.updateCouponRepository(id, updateCouponDto);
    if (!coupon) {
      throw new NotFoundException(`Cupón para modificar con el ID ${id} no encontrado`);
    }
    return coupon;
  }

  async deleteCouponService(id: string) {
    const coupon = await this.couponRepository.getCouponByIdRepository(id);
    if (!coupon) {
      throw new NotFoundException(`Cupón para eliminar con el ID ${id} no encontrado`);
    }
    await this.couponRepository.deleteCouponRepository(id);
    return coupon;
  }
}
