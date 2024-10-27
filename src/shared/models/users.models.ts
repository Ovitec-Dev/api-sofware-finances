/* eslint-disable import/no-cycle */
import { Table, Column, Model, DataType, HasMany, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Transaction } from './transactions.models';
import { Budget } from './budgets.models';
import { Category } from './categories.models';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true, 
})
export class User extends Model<User> {
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(555),
    allowNull: true, 
  })
  google_id?: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  user_name!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  profile_picture?: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  birthday?: Date;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  phone?: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  address?: string;

  @Column({
    type: DataType.ENUM('local', 'google'),
    allowNull: false,
    defaultValue: 'local',
  })
  auth_provider!: string;

  @Column({
    type: DataType.STRING(255),
    defaultValue: '',
  })
  reset_token?: string;

  @Column({
    type: DataType.DATE,
  })
  reset_token_expiration?: Date;

  @Column({
    type: DataType.TINYINT,
    allowNull: false,
    defaultValue: 0,
  })
  email_verified!: boolean;

  @Column({
    type: DataType.STRING(100),
  })
  email_verification_token?: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    field: 'created_at',
  })
  created_at!: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    field: 'updated_at',
  })
  updated_at!: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    field: 'deleted_at', 
  })
  deleted_at!: Date;

  @HasMany(() => Transaction)
  transactions!: Transaction[];

  @HasMany(() => Budget)
  budgets!: Budget[];

  @HasMany(() => Category)
  categories!: Category[];
}
