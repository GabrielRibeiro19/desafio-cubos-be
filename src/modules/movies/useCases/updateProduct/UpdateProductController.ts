import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProductUseCase } from "./UpdateProductUseCase";

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { amount_available, available, price, title, description } =
      request.body;
    const updateProductUseCase = container.resolve(UpdateProductUseCase);
    const { id } = request.params;

    const updateUserResponse = await updateProductUseCase.execute({
      id,
      amount_available,
      available,
      price,
      title,
      description,
    });

    return response.status(200).json(updateUserResponse);
  }
}

export { UpdateProductController };
