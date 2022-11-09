package digital.booking.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import digital.booking.entities.City;
import digital.booking.exceptions.BadRequestException;
import digital.booking.exceptions.NotFoundException;
import digital.booking.interfaces.IService;
import digital.booking.repositories.CityRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService implements IService<City> {
    private final Logger logger = Logger.getLogger(CityService.class);

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public List<City> searchAll() {
        logger.debug("Searching all cities...");
        return cityRepository.findAll();
    }

    @Override
    public City searchById(Long id) throws NotFoundException {
        logger.debug("Searching city with id: " + id);
        return cityRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                "city with id: " + id + " was not found."));
    }

    @Override
    public City create(City city) throws BadRequestException {
        if (city==null){
            logger.error("The city entered is null.");
            throw new BadRequestException("The city is null.");
        } else{
            logger.debug("Creating new city...");
            cityRepository.save(city);
            logger.info("The city was created successfully.");
        }
        return city;
    }

    @Override
    public City update(City city, Long id) throws NotFoundException {
        City existingCity = cityRepository.findById(city.getId())
                .orElseThrow(() -> new NotFoundException("The city with id " + city.getId() +
                        "was not found."));

        logger.debug("Updating city...");
        existingCity.setName(city.getName());
        existingCity.setState(city.getState());
        existingCity.setCountry(city.getCountry());

        cityRepository.save(existingCity);
        logger.info("The city was updated successfully.");
        return existingCity;
    }

    @Override
    public void delete(Long id) throws NotFoundException {
        City city = cityRepository.findById(id).orElseThrow(() -> new NotFoundException("The " +
                    "city with the id: " + id + " was not found."));
        logger.debug("Deleting city...");
        cityRepository.delete(city);
    }
}
