/* eslint-disable import/no-cycle */
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany , CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { Category } from './categories.models';
import { Transaction } from './transactions.models';

@Table({
  tableName: 'sub_categories',
  timestamps: true,
  paranoid: true, 
})
export class SubCategory extends Model<SubCategory> {
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

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
  })
  category_id!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @HasMany(() => Transaction)
  transactions!: Transaction[];

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
}
