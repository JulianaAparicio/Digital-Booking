package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import digital.booking.DTO.ProductDTO;
import digital.booking.entities.Product;
import digital.booking.entities.QProduct;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class ProductService implements IService<ProductDTO> {

    @PersistenceContext
    EntityManager entityManager;
    private final Logger logger = Logger.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ObjectMapper mapper;

    public List<ProductDTO> searchByQuery(Map<String,String> query) {


        JPAQuery<Product> queryProduct = new JPAQuery<>(entityManager);
        QProduct productQ  = QProduct.product;

        BooleanBuilder queries = new BooleanBuilder();
        PathBuilder<Product> pathBuilder = new PathBuilder<>(Product.class, "Product");

        for (Map.Entry<String, String> entry : query.entrySet()) {
            switch (entry.getKey()) {
                case "category":
                    queries.and(productQ.category.id.eq(Long.valueOf(entry.getValue())));
                    break;
                case "city":
                    queries.and(productQ.location.city.id.eq(Long.valueOf(entry.getValue())));
                    break;
                default:
                    queries.and(pathBuilder.getString(entry.getKey()).eq(entry.getValue()));
                    break;
            }
        }

        List<Product> products = queryProduct.from(productQ).where(queries).stream().toList();
        logger.debug("Searching all products...");

        List<ProductDTO> productsDTO = new ArrayList<>();
        for (Product product : products){
            productsDTO.add(mapper.convertValue(product,ProductDTO.class));
        }

        logger.info("Listing all products...");
        return productsDTO;
    }

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
        existingProduct.setCategory(product.getCategory());
        existingProduct.setAmenities(product.getAmenities());
        existingProduct.setLocation(product.getLocation());
        existingProduct.setImages(product.getImages());
        existingProduct.setItems(product.getItems());
        existingProduct.setRatings(product.getRatings());


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

    public List<ProductDTO> searchRandom() {
        logger.debug("Searching all products...");
        List<ProductDTO> allProducts = searchAll();

        List<ProductDTO> randomProducts = new ArrayList<>();

        for (int i = 0; i < 6; i++){
            Random random = new Random();
            int nxt = random.nextInt(allProducts.size());
            randomProducts.add(allProducts.get(nxt));
        }

        logger.info("Listing 6 random products...");
        return randomProducts;
    }

}
