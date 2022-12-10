import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './modules/categories/categories.model';
import { CategoriesModule } from './modules/categories/categories.module';
import { OfficeModule } from './modules/office/office.module';
import { Product } from './modules/products/products.model';
import { ProductsModule } from './modules/products/products.module';
import { Role } from './modules/roles/roles.model';
import { RolesModule } from './modules/roles/roles.module';
import { Town } from './modules/town/town.model';
import { TownModule } from './modules/town/town.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { AuthModule } from './modules/auth/auth.module';
import { Office } from './modules/office/office.model';
import { Employee } from './modules/employee/employee.model';
import { EmployeeRoles } from './modules/employee-roles/employee-role.model';
import { ProductCategory } from './modules/product-categories/product-category.model';
import { SalesModule } from './modules/sales/sales.module';
import { Sale } from './modules/sales/sales.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Town,
        Role,
        Category,
        Product,
        Office,
        Employee,
        EmployeeRoles,
        ProductCategory,
        Sale,
      ],
      autoLoadModels: true,
    }),
    TownModule,
    RolesModule,
    CategoriesModule,
    ProductsModule,
    OfficeModule,
    EmployeeModule,
    AuthModule,
    SalesModule,
  ],
})
export class AppModule {}
