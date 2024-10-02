import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import preloadVeterinarian from '../../seeds/veterinarian.json';
import preloadServices from '../../seeds/services.json';
import preloadCatSer from '../../seeds/categoryService.json';
import preloadAvailabilityService from '../../seeds/availabilityService.json';
import preloadRepCondition from '../../seeds/repCondition.json';
import preloadSpecies from '../../seeds/species.json';
import preloadRaces from '../../seeds/races.json';
import preloadPets from '../../seeds/pets.json';
import preloadProducts from '../../seeds/products.json';
import preloadVet from '../../seeds/vet.json';
import preloadPending from '../../seeds/pending.json';
import preloadAppointment from '../../seeds/appointments.json';
import preloadExamination from '../../seeds/examination.json';
import preloadTreatment from '../../seeds/treatment.json';
import preloadPrescription from '../../seeds/prescription.json';
import preloadMethodPay from '../../seeds/methodPay.json';
import preloadCoupons from '../../seeds/coupones.json';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UserRole } from '../users/entities/userRole.entity';
import { Pet } from '../pets/entities/pet.entity';
import * as bcrypt from 'bcrypt';
import { Sex } from '../pets/entities/sex.entity';
import { Race } from '../races/entitites/race.entity';
import { StatesAppointment } from '../appointment/entities/statesAppointment.entity';
import { Specie } from '../species/entities/specie.entity';
import { Veterinarian } from '../veterinarian/entities/veterinarian.entity';
import { Service } from '../services/entities/service.entity';
import { CategoryService } from '../categoryServices/entities/categoryService.entity';
import { AvailabilityService } from '../availabilityService/entities/availability-service.entity';
import { Product } from '../products/entities/product.entity';
import { Vet } from '../vets/entities/vet.entity';
import { Pending } from '../pending/entities/pending.entity';
import { Appointment } from '../appointment/entities/appointment.entity';
import { ClinicalExamination } from '../clinical-examination/entities/clinicalExamination.entity';
import { Treatment } from '../treatment/entities/treatment.entity';
import { Prescription } from '../prescription/entities/prescription.entity';
import { ClinicalExaminationService } from '../clinical-examination/clinical-examination.service';
import { PrescriptionService } from '../prescription/prescription.service';
import { TreatmentService } from '../treatment/treatment.service';
import { MethodPay } from '../method-pay/entities/method-pay.entity';
import { Coupon } from '../coupons/entities/coupon.entity';
@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly rolesRepository: Repository<UserRole>,
    @InjectRepository(Pet)
    private readonly petsRepository: Repository<Pet>,
    @InjectRepository(Sex)
    private readonly sexRepository: Repository<Sex>,
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
    @InjectRepository(Specie)
    private readonly specieRepository: Repository<Specie>,
    @InjectRepository(StatesAppointment)
    private readonly statesAppointmentsRepository: Repository<StatesAppointment>,
    @InjectRepository(Veterinarian)
    private readonly veterinarianRepository: Repository<Veterinarian>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    @InjectRepository(CategoryService)
    private readonly categoryServiceRepository: Repository<CategoryService>,
    @InjectRepository(AvailabilityService)
    private readonly availabilityServiceRepository: Repository<AvailabilityService>, 
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>, 
    @InjectRepository(Vet)
    private readonly vetRepository: Repository<Vet>, 
    @InjectRepository(Pending)
    private readonly pendingRepository: Repository<Pending>, 
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>, 
    @InjectRepository(ClinicalExamination)
    private readonly examinationRepository: Repository<ClinicalExamination>, 
    private readonly examinationService: ClinicalExaminationService, 
    @InjectRepository(Treatment)
    private readonly treatmentRepository: Repository<Treatment>, 
    private readonly treatmentService: TreatmentService,
    @InjectRepository(Prescription)
    private readonly prescriptionRepository: Repository<Prescription>, 
    private readonly prescriptionService: PrescriptionService,
    @InjectRepository(MethodPay)
    private readonly methodPayRepository: Repository<MethodPay>, 
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>, 
  ) {}

  petsPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'pets.json');
  petsdata = JSON.parse(fs.readFileSync(this.petsPath, 'utf8'));

  sexPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'sex.json');
  sexdata = JSON.parse(fs.readFileSync(this.sexPath, 'utf8'));

  rolesPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'roles.json');
  rolesdata = JSON.parse(fs.readFileSync(this.rolesPath, 'utf8'));

  usersPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'users.json');
  usersdata = JSON.parse(fs.readFileSync(this.usersPath, 'utf8'));

  veterinariesPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'veterinaries.seed.json');
  veterinariesdata = JSON.parse(fs.readFileSync(this.veterinariesPath, 'utf8'));

  statesAppointmentsPath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'statesAppointments.json');
  statesAppointmentsdata = JSON.parse(fs.readFileSync(this.statesAppointmentsPath, 'utf8'));

  availabilityServicePath = path.join(__dirname, '..', '..', '..', 'src', 'seeds', 'availabilityService.json');
  availabilityServicedata = JSON.parse(fs.readFileSync(this.availabilityServicePath, 'utf8'));

  async resetData() {
    await this.userRepository.delete({});
    /* await this.rolesRepository.delete({});
    await this.veterinariesRepository.delete({}); */
    //await this.petsRepository.delete({});
    return { message: 'Datos reiniciados exitosamente' };
  }

  /* async loadVeterinariesData() {
    for (const item of this.veterinariesdata) {
      let veterinarie = await this.veterinariesRepository.findOne({
        where: { CUIT: item.CUIT },
      });
      if (!veterinarie) {
        veterinarie = this.veterinariesRepository.create(item);
        await this.veterinariesRepository.save(veterinarie);
      }
    }
    return { message: 'Seeder veterinarios agregados' };
  } */
  async loadUsersData() {
    for (const item of this.usersdata) {
      let user = await this.userRepository.findOne({
        where: { email: item.email },
      });
      if (!user) {
        const role = await this.rolesRepository.findOne({
          where: { role: item.role },
        });

        if (!role) {
          throw new Error(`Role with name ${item.role} not found`);
        }
        const passwordHash = await bcrypt.hash(item.password, 10);
        user = this.userRepository.create({
          name: item.name,
          lastName: item.lastName,
          email: item.email,
          imgProfile: item.imgProfile,
          dni: item.dni,
          password: passwordHash,
          birthDate: item.birthDate,
          startDate: item.startDate,
          phone: item.phone,
          address: item.address,
          city: item.city,
          role: role,
        });
        await this.userRepository.save(user);
      }
    }
    return { message: 'Seeder usuarios agregados' };
  }

  async loadRolesData() {
    for (const item of this.rolesdata) {
      let role = await this.rolesRepository.findOne({
        where: { role: item.role },
      });
      if (!role) {
        role = this.rolesRepository.create({ role: item.role });
        await this.rolesRepository.save(role);
      }
    }
    return { message: 'Seeder roles agregados' };
  }

  async loadPetsData() {
    for (const item of preloadPets) {
      const pet = await this.petsRepository.findOne({
        where: { name: item.name }, // CAMBIAR POR ALGO UNICO DE LA MASCOTA
      });
      if (!pet) {
        const user = await this.userRepository.findOne({ where: { email: item.emailOwner } });

        if (!user) {
          throw new Error(`Dueño de la mascota con email: ${item.emailOwner} no encontrado`);
        }

        const { sex, race, specie, repCondition, weightCurrent, ...petCreate } = item;
        const sexDB = await this.sexRepository.findOneBy({ sex });
        const specieDB: Specie = await this.specieRepository.findOneBy({ specie });
        const raceDB: Race = await this.raceRepository.findOneBy({ race });

        const date = new Date().toISOString();
        await this.petsRepository.save({
          ...petCreate,
          weightCurrent: +weightCurrent,
          startDate: date,
          userId: user.id,
          specieId: specieDB.id,
          raceId: raceDB.id,
          sexId: sexDB.id,
        });
      }
    }
    console.log("Seeder mascotas agregados");
    return { message: 'Seeder mascotas agregados' };
  }

  async loadSexData() {
    for (const item of this.sexdata) {
      let sex = await this.sexRepository.findOne({
        where: { sex: item.sex },
      });
      if (!sex) {
        sex = this.sexRepository.create({ sex: item.sex });
        await this.sexRepository.save(sex);
      }
    }
    console.log("Seeder sexos agregados")
    return { message: 'Seeder sexos agregados' };
  }

  async loadSpecieData() {
    for (const item of preloadSpecies) {
      let specie = await this.specieRepository.findOne({
        where: { specie: item.specie },
      });
      if (!specie) {
          await this.specieRepository.save({specie: item.specie});
      }
    }
    console.log("Seeder Especies agregados")
    return { message: 'Seeder Especies agregados' };
  }

  async loadRaceData() {
    for (const item of preloadRaces) {
      const race = await this.raceRepository.findOne({where: { race: item.race } });
      if (!race) {
        const specie = await this.specieRepository.findOne({where: { specie: item.specie } });
        if (specie) { await this.raceRepository.save({race: item.race, specieId: specie.id}) }
      }
    }
    console.log("Seeder Razas agregados")
    return { message: 'Seeder Razas agregados' };
  }

  async loadExamination() {
    for (const examination of preloadExamination) {
      const clinExam= await this.examinationRepository.findOne({where: { tllc: examination.tllc } });
      if (!clinExam) {
        const pets = await this.petsRepository.findOne({where: { name: examination.pet } });
        const vet = await this.veterinarianRepository.findOne({where: { licence: examination.veterinarian } });
        if (pets && vet) { 
          const {veterinarian, pet, date, ...examinationCreate} = examination
          await this.examinationService.createExamination({...examinationCreate, date: new Date(date), petId: pets.id, veterinarianId: vet.id}) 
        }
      }
    }
    console.log("Examinaciones Clinicas cargadas con exitos")
    return { message: 'Seeder Razas agregados' };
  }

  async loadStatesAppointments() {
    for (const item of this.statesAppointmentsdata) {
      let stateAppointment = await this.statesAppointmentsRepository.findOne({
        where: { state: item.state },
      });
      if (!stateAppointment) {
        stateAppointment = this.statesAppointmentsRepository.create({ state: item.state });
        await this.statesAppointmentsRepository.save(stateAppointment);
      }
    }
  }

  async loadVeterinarian(): Promise<void> {
    for (const vet of preloadVeterinarian) {
      const vetExist: Veterinarian = await this.veterinarianRepository.findOneBy({ licence: vet.licence });

      if (!vetExist) {
        const user: User = await this.userRepository.findOneBy({ dni: vet.dni });
        if (user) {
          const { dni, ...veterinarian } = vet;
          const vetUser = await this.veterinarianRepository.save({ ...veterinarian, user });
        }
      }
    }
    console.log('Veterinarios Cargados Con Exito');
  }

  async loadCategoryService(): Promise<void> {
    for (const category of preloadCatSer) {
      const { categoryService } = category;
      const categoryExist: CategoryService = await this.categoryServiceRepository.findOneBy({ categoryService });
      if (!categoryExist) {
        await this.categoryServiceRepository.save(category);
      }
    }
    console.log('Servicios Cargados Con Exito');
  }

  async loadProducts(): Promise<void> {
    for (const product of preloadProducts) {
      const productExist: Boolean = await this.productRepository.existsBy({name: product.name});
      if (!productExist) {
        await this.productRepository.save(product);
      }
    }
    console.log('Productos Cargados Con Exito');
  }

  async loadVet(): Promise<void> {
    for (const vet of preloadVet) {
      const productExist: Boolean = await this.vetRepository.existsBy({cuit: vet.cuit});
      if (!productExist) {
        const userBD: User = await this.userRepository.findOneBy({email: vet.user});
        const {user, ...vetCreate} = vet;
        if (userBD) await this.vetRepository.save({...vetCreate, userId: userBD.id});
      }
    }
    console.log('Veterinaria Cargada Con Exito');
  }

  async loadPending(): Promise<void> {
    for (const pending of preloadPending) {
      const pendingExist: Boolean = await this.pendingRepository.existsBy({description: pending.description});
      if (!pendingExist) {
        const petBD: Pet = await this.petsRepository.findOne({where: {name: pending.pet}});
        const serviceBD : Service = await this.serviceRepository.findOne({where: {service: pending.service}});
        const {pet, service, ...pendingCreate} = pending;
        if (petBD) await this.pendingRepository.save({...pendingCreate, serviceId: serviceBD.id, userId: petBD.userId, petId: petBD.id});
      }
    }
    console.log('Pendientes Cargada Con Exito');
  }

  async loadServices() {
    for (const service of preloadServices) {
      const serviceExist: Service = await this.serviceRepository.findOneBy({ service: service.service });
      if (!serviceExist) {
        const veterinarian: Veterinarian = await this.veterinarianRepository.findOneBy({ licence: service.licenceVet });
        const categoryService: CategoryService = await this.categoryServiceRepository.findOneBy({ categoryService: service.category });
        if (veterinarian && categoryService) {
          const { licenceVet, category, ...createService } = service;
          await this.serviceRepository.save({ ...createService, veterinarian, categoryService });
        }
      }
    }
    console.log('Servicios Cargados Con Exito');
  }

  async loadAppointment() {
    for (const appointment of preloadAppointment) {
      const appointmentFind: Appointment = await this.appointmentRepository.findOneBy({ messageUser: appointment.messageUser });
      if (!appointmentFind) {
        const serviceFind: Service = await this.serviceRepository.findOneBy({ service: appointment.service });
        const petFind: Pet = await this.petsRepository.findOne({where:{ name: appointment.pet }});
        const stateAppointmentFind: StatesAppointment = await this.statesAppointmentsRepository.findOneBy({state:"Pendiente"})
        if (serviceFind && petFind) {
          const { pet, service, ...createAppointment } = appointment;
          await this.appointmentRepository.save({ 
                  ...createAppointment, 
                  price: serviceFind.price, 
                  pet: petFind, 
                  service: serviceFind, 
                  state: stateAppointmentFind});
        }
      }
    }
    console.log('Turnos Cargados Con Exito');
  }

  async loadAvailabilityService() {
    for (const preloadAS of preloadAvailabilityService) {
      const veterinarianFind: Veterinarian = await this.veterinarianRepository.findOneBy({ licence: preloadAS.licence });
      if (veterinarianFind) {
          const availSer = await this.availabilityServiceRepository.findOneBy({day: preloadAS.day, veterinarianId:veterinarianFind.id})
          if (!availSer) {
            const {licence, ...avSerCreate} = preloadAS
            await this.availabilityServiceRepository.save({ ...avSerCreate, veterinarianId: veterinarianFind.id });
          }
        }
      }
    console.log('Dias y horarios de Servicios Cargados Con Exito');
  }

  async loadTreatment() {
    for (const treatment of preloadTreatment) {
      const treatmentFind: Treatment = await this.treatmentRepository.findOneBy({ observation: treatment.observation });
      if (!treatmentFind) {
          const ser = await this.serviceRepository.findOneBy({service:treatment.service})
          const examination = await this.examinationRepository.findOneBy({tllc: treatment.clinicalExamination})
          if (ser && examination) {
            const {clinicalExamination, service , ...treatmentCreate} = treatment
            await this.treatmentService.createTreatment({ ...treatmentCreate, clinicalExaminationId: examination.id, serviceId: ser.id });
          }
        }
      }
    console.log('Tratamientos Cargados Con Exito');
  }

  async loadPrescription() {
    for (const prescription of preloadPrescription) {
      const prescriptionFind: Prescription = await this.prescriptionRepository.findOneBy({ description: prescription.description });
      if (!prescriptionFind) {
          const prod = await this.productRepository.findOneBy({name:prescription.product})
          const examination = await this.examinationRepository.findOneBy({tllc: prescription.clinicalExamination})
          if (prod && examination) {
            await this.prescriptionService.createPrescription({ description: prescription.description, clinicalExaminationId: examination.id, productId: prod.id });
          }
        }
      }
    console.log('Recetas medicas Cargados Con Exito');
  }

  async loadMethodPay() {
    for (const method of preloadMethodPay) {
      const methodFind: MethodPay = await this.methodPayRepository.findOneBy({ method: method.method});
      if (!methodFind) {
             await this.methodPayRepository.save(method);
          }
        }
    console.log('Methodos de Pago Cargados Con Exito');
  }

  async loadCoupon() {
    for (const coupon of preloadCoupons) {
      const couponFind: Coupon = await this.couponRepository.findOneBy({ code: coupon.code});
      if (!couponFind) {
          const userFind = await this.userRepository.findOneBy({email: coupon.user})
          if (userFind) {
            const {user, ...couponCreate} = coupon
            await this.couponRepository.save({...couponCreate, userId: userFind.id});
          }
        }
        }
    console.log('Cupones de descuento Cargados Con Exito');
  }

  async preloadInitial() {
    await this.loadRolesData();
    await this.loadSexData();
    await this.loadUsersData();
    await this.loadSpecieData()
    await this.loadRaceData()
    await this.loadPetsData();
    await this.loadStatesAppointments();
    await this.loadVeterinarian();
    await this.loadCategoryService();
    await this.loadServices();
    await this.loadAvailabilityService();
    await this.loadProducts();
    await this.loadVet();
    await this.loadPending();
    await this.loadAppointment();
    await this.loadExamination();
    await this.loadTreatment();
    await this.loadPrescription();
    await this.loadMethodPay();
    await this.loadCoupon();
  }

  async onModuleInit() {
    await this.preloadInitial();
  }
}
