/* eslint-disable import/no-cycle */
import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript';
import { User } from './users.models';
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

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: true,
  })
  user_id?: number;

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => SubCategory)
  sub_categories!: SubCategory[];

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
