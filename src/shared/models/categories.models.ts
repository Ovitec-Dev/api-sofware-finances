/* eslint-disable import/no-cycle */
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { SubCategory } from './sub_categories.models';
import { Transaction } from './transactions.models';

@Table({
  tableName: 'categories',
  timestamps: true,
  paranoid: true, 
})
export class Category extends Model<Category> {
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
  })
  name!: string;

  @HasMany(() => SubCategory)
  sub_categories!: SubCategory[];

  @HasMany(() => Transaction)
  transactions!: Transaction[];
}
