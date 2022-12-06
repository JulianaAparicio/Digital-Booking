package digital.booking.services;

import digital.booking.entities.Product;
import digital.booking.entities.User;
import digital.booking.exceptions.BadRequestException;
import digital.booking.repositories.ProductRepository;
import digital.booking.repositories.UserRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService  {

    private final Logger logger = Logger.getLogger(FavoriteService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ProductRepository productRepository;

    public List<Product> toggleFavorite(Long userId, Long productId) throws BadRequestException {
        if (userId == null || productId == null ){
            logger.error("The user o product entered is null.");
            throw new BadRequestException("The user o product is null.");
        } else{
            logger.debug("Finding user and product favorite...");
            User currentUser = userRepository.findById(userId).orElseThrow(() -> new BadRequestException("The user id not exists"));
            Product currentProduct = productRepository.findById(productId).orElseThrow(() -> new BadRequestException("The product id not exists"));

            List<Product> currentUserProducts = currentUser.getProducts();
            if (!currentUserProducts.contains(currentProduct)) {
                currentUserProducts.add(currentProduct);
                logger.info("The favorite was created successfully.");

            } else {
                currentUserProducts.remove(currentProduct);
                logger.info("The favorite was removed successfully.");
            }

            userRepository.save(currentUser);

            return currentUserProducts;
        }

    }

    public List<Product> getFavoritesByUserId(Long id) throws BadRequestException {
        User currentUser = userRepository.findById(id).orElseThrow(() -> new BadRequestException("The user id not exists"));
        return  currentUser.getProducts();
    }

}
