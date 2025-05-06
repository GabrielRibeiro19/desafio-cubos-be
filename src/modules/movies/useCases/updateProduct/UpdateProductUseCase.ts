import { inject, injectable } from "tsyringe";

import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    id,
    amount_available,
    available,
    price,
    title,
    description,
  }: ICreateProductDTO): Promise<Product> {
    const productExists = await this.productsRepository.findById(id);

    if (!productExists) {
      throw new AppError("Produto não existe");
    }

    const productTitleExists = await this.productsRepository.findByTitle(title);

    if (productTitleExists && productTitleExists.id !== id) {
      throw new AppError("Título já existe");
    }

    const product = await this.productsRepository.create({
      id,
      amount_available,
      available,
      price,
      title,
      description,
    });

    return product;
  }
}

export { UpdateProductUseCase };
