
import { IRepository } from "@finance/models";
import { User } from "@shared/models";
import logger from '@shared/utils/logger';

export class Repository implements IRepository {
    constructor() {
        this.verify_user = this.verify_user.bind(this);
    }

    async verify_user(userId: number): Promise<boolean> {
        try {
            const user = await User.findByPk(userId);
            if(!user) throw new Error('User not found');
            return true;

        } catch (error) {
            logger.error('Error verifying user:', error);
            throw error;
        }
    }
};