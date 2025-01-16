import UserModel from '../../../models/user/index';

async function findExistingUser(email: string): Promise<any | null> {
     return await UserModel.findOne({ email }).lean();
}

export default findExistingUser