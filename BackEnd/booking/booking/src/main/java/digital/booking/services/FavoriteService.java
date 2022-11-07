package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.entities.Favorite;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.FavoriteRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService implements IService<Favorite> {

    private final Logger logger = Logger.getLogger(FavoriteService.class);

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public List<Favorite> searchAll() {
        logger.debug("Searching all favorites...");
        return favoriteRepository.findAll();
    }

    @Override
    public Favorite searchById(Long id) throws NotFoundException {
        logger.debug("Searching favorite with id: " + id);
        return favoriteRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "favorite with id: " + id + " was not found."));
    }

    @Override
    public Favorite create(Favorite favorite) throws BadRequestException {
        if (favorite==null){
            logger.error("The favorite entered is null.");
            throw new BadRequestException("The favorite is null.");
        } else{
            logger.debug("Creating new favorite...");
            favoriteRepository.save(favorite);
            logger.info("The favorite was created successfully.");
        }
        return favorite;

    }

    @Override
    public Favorite update(Favorite favorite, Long id) throws NotFoundException {
        Favorite existingFavorite = favoriteRepository.findById(favorite.getId())
                .orElseThrow(() -> new NotFoundException("The favorite with id " + favorite.getId() +
                        "was not found."));

        logger.debug("Updating favorite...");
        existingFavorite.setProduct(favorite.getProduct());

        favoriteRepository.save(existingFavorite);
        logger.info("The favorite was updated successfully.");
        return existingFavorite;    }

    @Override
    public void delete(Long id) throws NotFoundException {
        Favorite favorite = favoriteRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "favorite with the id: " + id + " was not found."));
        logger.debug("Deleting favorite...");
        favoriteRepository.delete(favorite);

    }
}
