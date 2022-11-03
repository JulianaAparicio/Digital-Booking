package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.DTO.ProductDTO;
import digital.booking.entities.Product;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class ProductService implements IService<ProductDTO> {

    private final Logger logger = Logger.getLogger(CategoryService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public List<ProductDTO> searchAll() {
        List<Product> products = productRepository.findAll();
        logger.debug("Searching all products...");

        List<ProductDTO> productsDTO = new ArrayList<>();
        for (Product product : products){
            productsDTO.add(mapper.convertValue(product,ProductDTO.class));
        }

        logger.info("Listing all products...");
        return productsDTO;
    }

    @Override
    public ProductDTO searchById(Long id) throws NotFoundException {
        logger.debug("Searching product with id: " + id);
        Product productFounded = productRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "product with id: " + id + " was not found."));
        return mapper.convertValue(productFounded, ProductDTO.class);
    }

    @Override
    public ProductDTO create(ProductDTO product) throws BadRequestException {
        if (product==null){
            logger.error("The product entered is null.");
            throw new BadRequestException("The product is null.");
        } else{
            logger.debug("Creating new product...");
            Product productCreated = mapper.convertValue(product, Product.class);
            productRepository.save(productCreated);
            logger.info("The product was created successfully.");
            return mapper.convertValue(productCreated, ProductDTO.class);
        }
    }

    @Override
    public ProductDTO update(ProductDTO product, Long id) throws NotFoundException {
        Product existingProduct = productRepository.findById(product.getId())
                .orElseThrow(() -> new NotFoundException("The product with id " + product.getId() +
                        "was not found."));

        logger.debug("Updating product...");
        existingProduct.setTitle(product.getTitle());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setAmenities(product.getAmenities());
        existingProduct.setImages(product.getImages());

        productRepository.save(existingProduct);
        logger.info("The product was updated successfully.");
        return mapper.convertValue(existingProduct, ProductDTO.class);
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        Product product = productRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "product with the id: " + id + " was not found."));
        logger.debug("Deleting product...");
        productRepository.delete(product);

    }
}
