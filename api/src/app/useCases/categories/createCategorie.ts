import { Response, Request } from 'express';
import { Category } from '../../models/Category';

export async function createCategorie(req: Request, res: Response) {
  try {
    const { icon, name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required!',
      });
    }

    const category = await Category.create({ icon, name });

    res.json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
