/* eslint-disable camelcase */
interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }): Promise<void> {
    
  }
}

export default UpdateUserAvatarService;
