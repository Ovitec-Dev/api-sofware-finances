/* eslint-disable import/no-cycle */

import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.models';

@Table({
  tableName: 'budgets',
  timestamps: true,
  paranoid: true, 
})
export class Budget extends Model<Budget> {
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  total_amount!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  category!: string;

  @Column({
    type: DataType.ENUM('weekly','monthly', 'annual'),
    allowNull: false,
  })
  period!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    allowNull: false,
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;
}

