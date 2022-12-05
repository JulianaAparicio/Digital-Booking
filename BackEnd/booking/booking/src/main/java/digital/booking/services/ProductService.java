package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import digital.booking.DTO.ImageDTO;
import digital.booking.DTO.ProductDTO;
import digital.booking.entities.*;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.ProductRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ProductService implements IService<ProductDTO> {

    @PersistenceContext
    EntityManager entityManager;
    private final Logger logger = Logger.getLogger(ProductService.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private ItemService itemService;

    @Autowired
    private ObjectMapper mapper;

    public List<ProductDTO> searchByQuery(Map<String,String> query) {

        JPAQuery<Product> queryProduct = new JPAQuery<>(entityManager);
        JPAQuery<Booking> subQueryBooking = new JPAQuery<>(entityManager);
        QProduct productQ  = QProduct.product;
        QBooking bookingQ  = QBooking.booking;

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
                case "date":
                    DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.US);
                    String[] dates = query.get("date").split(",");
                    LocalDate initialDate = LocalDate.parse(dates[0], dateFormat);
                    LocalDate finalDate = LocalDate.parse(dates[1], dateFormat);
                    queries.and(subQueryBooking.from(bookingQ).where(bookingQ.product.id.eq(productQ.id).and(bookingQ.initial_date.between(initialDate, finalDate).or(bookingQ.final_date.between(initialDate, finalDate)))).notExists());
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
            List<ImageDTO> images = product.getImages();
            Location locationCreated = locationService.create(product.getLocation());
            List<Item> itemsCreated = saveProductItems(product.getItems());
            product.setLocation(locationCreated);
            product.setImages(new ArrayList<>());
            product.setItems(itemsCreated);
            Product productCreated = mapper.convertValue(product, Product.class);
            Product productSaved = productRepository.save(productCreated);
            logger.info("The product was created successfully.");
            System.out.println(productSaved);

            if (images.size() > 0 ) {
                List<Image> productImages = saveProductImages(images, productSaved);
            }

            return  mapper.convertValue(productSaved, ProductDTO.class);
        }
    }

    @Override
    public ProductDTO update(ProductDTO product, Long id) throws NotFoundException {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("The product with id " + id +
                        " was not found."));

        logger.debug("Updating product...");

        List<Rating> ratings = new ArrayList<>();
        product.getRatings().stream().map((rating) -> ratings.add(mapper.convertValue(rating, Rating.class)));

        List<Image> images = new ArrayList<>();
        product.getImages().stream().forEach((image) -> images.add(mapper.convertValue(image, Image.class)));

        existingProduct.setTitle(product.getTitle());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setAmenities(product.getAmenities());
        existingProduct.setLocation(product.getLocation());
        existingProduct.setImages(images);
        existingProduct.setItems(product.getItems());
        existingProduct.setRatings(ratings);

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

    private List<Image> saveProductImages(List<ImageDTO> productImages, Product product) {
        List<Image> images = new ArrayList<>();
        productImages.stream().forEach((image) -> {
            try {
                Image imageMapper = mapper.convertValue(image, Image.class);
                imageMapper.setProduct(product);
                Image imageCreated = imageService.create(imageMapper);
                images.add(imageCreated);
            } catch (BadRequestException e) {
                throw new RuntimeException(e);
            }
        });
        return images;
    }

    private List<Item> saveProductItems(List<Item> productItems) {
        List<Item> items = new ArrayList<>();

        productItems.stream().forEach((item) -> {
            try {
                Item itemCreated = itemService.create(item);
                items.add(itemCreated);
            } catch (BadRequestException e) {
                throw new RuntimeException(e);
            }
        });

        return  items;
    }

}
