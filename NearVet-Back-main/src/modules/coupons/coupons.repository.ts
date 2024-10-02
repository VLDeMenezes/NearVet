import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Coupon } from "./entities/coupon.entity";

@Injectable()
export class CouponsRepository {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {}

  async getAllCouponsRepository(page:number, limit:number) {
    return await this.couponRepository.find({skip: (page-1)*limit, take: limit});
  }

  async getCouponByIdRepository(id: string) {
    return await this.couponRepository.findOneBy({ id });
  }

  async getCouponByCodeRepository(code: string): Promise<Coupon> {
    return await this.couponRepository.findOne({ where: {code, used:false} });
  }

  async createCouponRepository(createCoupon: Partial<Coupon>) {
    const coupon: Coupon = await this.couponRepository.create(createCoupon);
    return await this.couponRepository.save(coupon);
  }

  async updateCouponLess(id: string) {
    return await this.couponRepository.update(id, {used:true});
  }

  async updateCouponRepository(id: string, updateCouponDto) {
    await this.couponRepository.update(id, updateCouponDto);
    return await this.couponRepository.findOneBy({ id });
  }

  async deleteCouponRepository(id: string): Promise<void> {
    await this.couponRepository.delete(id);
  }
}
