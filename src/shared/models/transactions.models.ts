/* eslint-disable import/no-cycle */
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.models';
import { Category } from './categories.models';
import { SubCategory } from './sub_categories.models';

@Table({
  tableName: 'transactions',
  timestamps: true,
  paranoid: true, 
})
export class Transaction extends Model<Transaction> {
 
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.ENUM('income', 'expense'),
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.DATE,
    allowNull: true,
  })
  date!: Date;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  description?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: true,
  })
  category_id!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @ForeignKey(() => SubCategory)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: true,
  })
  sub_category_id?: number;

  @BelongsTo(() => SubCategory)
  subCategory!: SubCategory;
}
